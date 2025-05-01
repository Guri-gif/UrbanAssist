const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: 'astarxxx676@gmail.com',
    pass: 'xdlg vojx iblt jzqq'
  },
});


const sendBookingNotification = (serviceProviderEmail, bookingDetails) => {
  const mailOptions = {
    from: 'gursewxk69@gmail.com', 
    to: serviceProviderEmail, 
    subject: "New Booking Alert!", 
    text: `You have a new booking!\n\nDetails:\nCustomer ID: ${bookingDetails.customerId}\nService ID: ${bookingDetails.serviceId}\nDate: ${bookingDetails.date}\nTime: ${bookingDetails.time}\nAddress: ${bookingDetails.address}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendBookingNotification };
