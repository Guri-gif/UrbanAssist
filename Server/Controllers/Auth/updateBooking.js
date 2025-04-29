const Booking = require("../../Models/booking_model");

const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status, serviceProviderId } = req.body;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status. Use 'accepted' or 'rejected'." });
  }

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (booking.serviceProviderId.toString() !== serviceProviderId) {
      return res.status(403).json({ error: "You are not authorized to update this booking." });
    }

    booking.status = status;
    await booking.save();

    return res.status(200).json({
      message: `Booking has been ${status}`,
      data: booking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = updateBookingStatus;
