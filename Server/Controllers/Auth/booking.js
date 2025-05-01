const Booking = require("../../Models/booking_model");
const ServiceProvider = require("../../Models/service_model");
const User = require("../../Models/user_model");
const { bookingValidation } = require("../../Services/bookingValidation");
const { sendBookingNotification } = require("../../Utils/serviceMail"); // Import your email service

const createBooking = async (req, res) => {
  const { error } = bookingValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { serviceId, serviceProviderId, customerId, date, time, address } =
    req.body;

  try {
    // Fetch the service provider and customer emails
    const serviceProvider = await ServiceProvider.findById(serviceProviderId);
    if (!serviceProvider) {
      return res.status(404).json({ error: "Service provider not found!" });
    }

    const customer = await User.find(); // Fetch customer details
    if (!customer) {
      return res.status(404).json({ error: "Customer not found!" });
    }

    // Create a new booking
    const newBooking = new Booking({
      serviceId,
      serviceProviderId,
      customerId,
      date,
      time,
      address, // Ensure this is part of the booking data
      status: "pending",
    });

    await newBooking.save();

    // Send notification email to the service provider
    await sendBookingNotification(serviceProvider.email, {
      customerId: customer.id,
      serviceId,
      date,
      time,
      address,
    });

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
