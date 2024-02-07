const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

let sendMail = async (language, emailSender, emailRecipient, namePatient, timeBooking, nameDoctor, link) => {
    // let sendMail = async (emailRecipient) => {

    console.log("email is being sent")
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.PASSWORD_APP
        }
    });

    if (language === 'vi') {
        let mailOptions = {
            from: emailSender,
            to: emailRecipient,
            subject: 'Tiêu đề email',
            html: `
            <h2>Xin chào ${namePatient}</h2>
            <p>Bạn đã đặt lịch khám online trên Bookingcare.com</p>
            <p>Thông tin đặt lịch khám bệnh</p>
            <p><strong>${timeBooking}</strong></p>
            <p><strong>Bác Sĩ: ${nameDoctor}</strong></p>
            <p><em>Nếu các thông tin trên chính xác vui lòng click vào link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</em></p>
            <p>Click here</p>
            <p>Xin chân thành cảm ơn.</p>   
        `
        };
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error.message);
            }
            console.log('success');
        });
    } else {
        let mailOptions = {
            from: emailSender,
            to: emailRecipient,
            subject: 'Email confirmation of appointment',
            html: `
            <h2>Hello ${namePatient}</h2>
            <p>You have booked an online examination appointment on Bookingcare.com</p>
            <p>Information for scheduling medical examination</p>
            <p><strong>${timeBooking}</strong></p>
            <p><strong>Bác Sĩ: ${nameDoctor}</strong></p>
            <p><em>If the above information is correct, please click on the link below to confirm and complete the medical appointment procedure</em></p>            <p>Click here</p>
            <p>Thanks.</p>   
        `
        }
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error.message);
            }
            console.log('success');
        });
    }


}

module.exports = {
    sendMail: sendMail,
}