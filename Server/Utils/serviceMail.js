const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "astarxxx676@gmail.com",
    pass: "xdlg vojx iblt jzqq",
  },
});

const sendBookingNotification = (booking) => {
  if (!booking) {
    throw new Error("No booking details provided");
  }

  const mailOptions = {
    from: "astarxxx676@gmail.com",
    to: "gursewxk69@gmail.com",
    subject: `📅 Booking ${booking.status || "Updated"}!`,
    text: `
Hello Service Provider,

${
  booking.status === "accepted"
    ? "🎉 A booking has been accepted!"
    : "ℹ️ A booking status has changed"
}

📌 Booking Details:
---------------------------
📍 Customer ID:     ${booking.customerId || "Not specified"}
🛠️  Service ID:      ${booking.serviceId || "Not specified"}
📅 Date:             ${booking.date || "Not specified"}
⏰ Time:             ${booking.time || "Not specified"}
🏠 Address:          ${booking.address || "Not specified"}
📝 Status:           ${booking.status || "Pending"}

Best regards,  
UrbanAssist Team 🚀
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendBookingNotification };
