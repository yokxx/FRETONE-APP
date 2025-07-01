const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: function() {
      // Password is required unless the user is using OAuth
      return !this.googleId && !this.appleId;
    }
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  artistName: {
    type: String,
    trim: true
  },
  artistNameHe: {
    type: String,
    trim: true
  },
  profilePicture: {
    type: String
  },
  googleId: {
    type: String
  },
  appleId: {
    type: String
  },
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String,
    tiktok: String,
    website: String
  },
  streamingLinks: {
    spotify: String,
    appleMusic: String,
    soundcloud: String,
    deezer: String,
    bandcamp: String,
    youtube: String
  },
  cloudStorage: {
    provider: {
      type: String,
      enum: ['none', 'dropbox', 'google_drive'],
      default: 'none'
    },
    connected: {
      type: Boolean,
      default: false
    },
    folderUrl: String,
    accessToken: String,
    refreshToken: String,
    tokenExpiry: Date
  },
  emailConnection: {
    provider: {
      type: String,
      enum: ['none', 'gmail', 'outlook'],
      default: 'none'
    },
    connected: {
      type: Boolean,
      default: false
    },
    email: String,
    accessToken: String,
    refreshToken: String,
    tokenExpiry: Date
  },
  musicStyle: {
    primaryGenre: String,
    subGenres: [String],
    influences: [String],
    mood: [String]
  },
  stats: {
    totalStreams: {
      type: Number,
      default: 0
    },
    monthlyListeners: {
      type: Number,
      default: 0
    },
    followers: {
      type: Number,
      default: 0
    },
    topCountries: [{
      country: String,
      listeners: Number
    }]
  },
  recentActivity: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  const user = this;

  // Only hash the password if it has been modified or is new
  if (!user.isModified('password') || !user.password) return next();

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash password
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;