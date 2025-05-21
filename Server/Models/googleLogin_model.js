const mongoose = require('mongoose');

const googleUserSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true, // Ensures that each Google account is only registered once
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null, // Can be null if no image is provided
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: null, // Optional, only needed if you want to store refresh token
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // This will automatically create createdAt and updatedAt fields
);

// Create and export the GoogleUser model
const GoogleUser = mongoose.model('GoogleUser', googleUserSchema);

module.exports = GoogleUser;
