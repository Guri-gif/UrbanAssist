const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  serviceCategory: {
    type: String,
    required: true,
    enum: [
      "Plumber",
      "Electrician",
      "Carpenter",
      "Mechanic",
      "Painter",
      "Home Cleaner",
      "Others",
    ],
  },
  location: {
    city: String,
    state: String,
    pinCode: Number,
  },
  rating: {
    type: Number,
    default: 0,
  },
  document: {
    type: String,
    required: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const Partner = mongoose.model("Partner", partnerSchema);
module.exports = Partner;
