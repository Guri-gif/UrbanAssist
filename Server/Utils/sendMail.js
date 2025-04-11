const nodemailer = require('nodemailer');

const sendMail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'astarxxx676@gmail.com',
                pass: 'xdlg vojx iblt jzqq'
            }
        })

        await transporter.sendMail({
            from: "UrbanAssist",
            to,
            subject,
            html,
        })
    } catch (error) {
        
    }
}

module.exports = sendMail;