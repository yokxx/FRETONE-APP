const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Configure Passport
module.exports = () => {
  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // JWT Strategy
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }, async (payload, done) => {
    try {
      // Find user by ID
      const user = await User.findById(payload.id);
      
      if (!user) {
        return done(null, false);
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }));

  // Local Strategy
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
      // Find user by email
      const user = await User.findOne({ email });
      
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }
      
      // Check password
      const isMatch = await user.comparePassword(password);
      
      if (!isMatch) {
        return done(null, false, { message: 'Invalid email or password' });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }));

  // Google Strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists
      let user = await User.findOne({ googleId: profile.id });
      
      if (user) {
        // Update access token
        user.googleAccessToken = accessToken;
        user.googleRefreshToken = refreshToken;
        await user.save();
        
        return done(null, user);
      }
      
      // Check if user exists with same email
      user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        // Update user with Google ID
        user.googleId = profile.id;
        user.googleAccessToken = accessToken;
        user.googleRefreshToken = refreshToken;
        
        // Update profile picture if not set
        if (!user.profilePicture && profile.photos && profile.photos.length > 0) {
          user.profilePicture = profile.photos[0].value;
        }
        
        await user.save();
        
        return done(null, user);
      }
      
      // Create new user
      const newUser = new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        fullName: profile.displayName,
        profilePicture: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : '',
        googleAccessToken: accessToken,
        googleRefreshToken: refreshToken
      });
      
      await newUser.save();
      
      return done(null, newUser);
    } catch (error) {
      return done(error, false);
    }
  }));
};