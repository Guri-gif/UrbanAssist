const Booking = require("../../Models/booking_model");
const ServiceProvider = require("../../Models/service_model");
const { bookingValidation } = require("../../Services/bookingValidation");

const createBooking = async (req, res) => {
  const { error } = bookingValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { serviceId, serviceProviderId, customerId, date, time } = req.body;

  try {
    const serviceProvider = await ServiceProvider.findById(serviceProviderId);
    if (!serviceProvider) {
      return res.status(404).json({ error: "Service provider not found!" });
    }

    const newBooking = new Booking({
      serviceId,
      serviceProviderId,
      customerId,
      date,
      time,
      status: "pending",
    });

    await newBooking.save();

    res.status(201).json({
      message: "Booking created successfully!",
      data: newBooking,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = createBooking;
