const Booking = require("../../Models/booking_model");
const { sendBookingNotification } = require("../../Utils/serviceMail");

const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status, serviceProviderId } = req.body;

  try {
    // Validate status
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Only 'accepted' or 'rejected' allowed.",
      });
    }

    // Find and update in single operation with proper conditions
    const updatedBooking = await Booking.findOneAndUpdate(
      {
        _id: id,
        $or: [
          { serviceProviderId: null }, // Unassigned bookings
          { serviceProviderId: serviceProviderId }, // Or assigned to this provider
        ],
      },
      {
        status,
        serviceProviderId, // Will set or keep existing
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(403).json({
        success: false,
        message: "Booking not found or already assigned to another provider",
      });
    }

    // Send notification (now works with single parameter)
    try {
      await sendBookingNotification(updatedBooking);
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
      // Don't fail the whole operation if email fails
    }

    return res.status(200).json({
      success: true,
      message: `Booking ${status} successfully`,
      data: updatedBooking,
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error updating booking",
      error: error.message,
    });
  }
};

module.exports = updateBookingStatus;