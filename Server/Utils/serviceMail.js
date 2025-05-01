const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'astarxxx676@gmail.com',
    pass: 'xdlg vojx iblt jzqq', // Use env var in production!
  },
});

const sendBookingNotification = (serviceProvider, bookingDetails) => {
  const mailOptions = {
    from: 'astarxxx676@gmail.com', 
    to: 'gursewxk69@gmail.com',    
    subject: "📅 New Booking Received!",
    text: `
Hello ${serviceProvider.name},

🎉 You have a new booking on UrbanAssist!

📌 Booking Details:
---------------------------
📍 Customer ID:     ${bookingDetails.customerId}
🛠️  Service ID:      ${bookingDetails.serviceId}
📅 Date:             ${bookingDetails.date}
⏰ Time:             ${bookingDetails.time}
🏠 Address:          ${bookingDetails.address}

📨 This booking has been marked as *${bookingDetails.status}*.

Best regards,  
UrbanAssist Team 🚀
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendBookingNotification };
