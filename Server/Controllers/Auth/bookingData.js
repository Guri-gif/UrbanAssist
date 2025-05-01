const Booking = require("../../Models/booking_model");

const bookingData = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });

    next(error);
  }
};


module.exports = bookingData;
