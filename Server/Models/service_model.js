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
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceProvider",
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
