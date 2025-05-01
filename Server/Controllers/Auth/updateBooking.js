const Booking = require("../../Models/booking_model");
const { sendBookingNotification } = require("../../Utils/serviceMail");

const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status, serviceProviderId } = req.body;
  
  console.log('Request received to update booking status');
  
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

    // Update the booking status
    booking.status = status;
    await booking.save();

    console.log('Booking status updated:', booking);

    // Send the email notification
    try {
      const service = await booking.populate("serviceId"); // Populate the service details (for service provider email)
      const customer = await booking.populate("customerId"); // Populate the customer details (for customer email)
      
      await sendBookingNotification(
        {
          name: service.serviceProviderName,
          email: service.serviceProviderEmail,
        },
        {
          customerId: customer._id,
          serviceId: service._id,
          date: booking.date,
          time: booking.time,
          address: booking.address,
          status: booking.status,
        }
      );

    } catch (emailError) {
      console.error("Email notification failed:", emailError);
      return res.status(500).json({ error: "Failed to send email notification" });
    }

    // Respond with success message
    return res.status(200).json({
      message: `Booking has been ${status}`,
      data: booking,
    });
  } catch (error) {
    console.error('Error updating booking:', error);  // Log the error here
    return res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = updateBookingStatus;
