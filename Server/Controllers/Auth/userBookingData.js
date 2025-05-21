const Booking = require("../../Models/booking_model");

const userBookingData = async (req, res, next) => {
  try {
    const { id } = req.params;

    const bookingData = await Booking.find({ customerId: id });

    if (!bookingData || bookingData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookings found for this user",
      });
    }

    res.status(200).json({
      success: true,
      data: bookingData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = userBookingData;
