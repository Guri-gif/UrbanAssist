const Booking = require("../../Models/booking_model");
const Service = require("../../Models/service_model");
const User = require("../../Models/user_model");
const { bookingValidation } = require("../../Services/bookingValidation");
const { sendBookingNotification } = require("../../Utils/serviceMail");

const createBooking = async (req, res) => {
  const { error } = bookingValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  let { serviceId, customerId, date, time, address, customerName, serviceName } = req.body;

  customerId = String(customerId); 

  if (!customerName || !serviceName) {
    return res.status(400).json({ error: "Customer name and service name are required!" });
  }

  try {
    const service = await Service.findById(serviceId);
    if (!service || !service.serviceProviderEmail) {
      return res
        .status(404)
        .json({ error: "Service or provider email not found!" });
    }

    const customer = await User.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found!" });
    }

    const newBooking = new Booking({
      serviceId,
      customerName,
      serviceName, 
      customerId,
      date,
      time,
      address,
      status: "pending",
    });

    await newBooking.save();

    try {
      await sendBookingNotification(
        {
          name: service.serviceProviderName,
          email: service.serviceProviderEmail,
        },
        {
          customerId: customer._id,
          serviceId,
          date,
          time,
          address,
          status: "pending",
        }
      );
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
      // Optional: Rollback the booking if email fails
      await newBooking.deleteOne(); // This is one option to undo the booking
      return res.status(500).json({ error: "Failed to send email notification" });
    }

    // Respond with success message
    res.status(201).json({
      message: "Booking created successfully!",
      data: newBooking,
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = createBooking;
