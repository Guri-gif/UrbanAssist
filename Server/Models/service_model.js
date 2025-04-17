const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location_type: {
      type: String,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    serviceProviderName: {
      type: String,
      required: true,
    },
    serviceProviderEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ServiceProvider = mongoose.model("Service", serviceSchema);

module.exports = ServiceProvider;
