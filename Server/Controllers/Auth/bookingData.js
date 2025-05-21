const Booking = require("../../Models/booking_model");

const bookingData = async (req, res, next) => {
  try {
    const { id } = req.params; 
    
    if (id) {
      const booking = await Booking.findById(id);
      
      if (!booking) {
        return res.status(404).json({ 
          message: "Booking not found" 
        });
      }
      
      return res.status(200).json(booking);
    } else {
      const bookings = await Booking.find();
      return res.status(200).json(bookings);
    }
  } catch (error) {
    console.error(error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid booking ID format" });
    }
    
    res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
};

module.exports = bookingData;