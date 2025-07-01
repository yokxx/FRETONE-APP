const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  nameHe: {
    type: String
  },
  platforms: [{
    platform: {
      type: String,
      enum: ['spotify', 'apple_music', 'soundcloud', 'deezer', 'bandcamp', 'youtube'],
      required: true
    },
    platformId: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    connected: {
      type: Boolean,
      default: true
    },
    accessToken: String,
    refreshToken: String,
    tokenExpiry: Date,
    lastUpdated: {
      type: Date,
      default: Date.now
    },
    stats: {
      followers: Number,
      listeners: Number,
      streams: Number,
      tracks: Number,
      albums: Number,
      popularity: Number
    }
  }],
  totalStats: {
    totalStreams: {
      type: Number,
      default: 0
    },
    monthlyListeners: {
      type: Number,
      default: 0
    },
    topCountries: [{
      country: String,
      listeners: Number
    }],
    demographics: {
      ageGroups: {
        '0-17': Number,
        '18-24': Number,
        '25-34': Number,
        '35-44': Number,
        '45-59': Number,
        '60+': Number
      },
      gender: {
        male: Number,
        female: Number,
        nonBinary: Number,
        unknown: Number
      }
    }
  }
}, {
  timestamps: true
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;