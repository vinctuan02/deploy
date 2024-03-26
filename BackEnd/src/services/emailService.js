const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

let sendMail = async (data) => {
    // let sendMail = async (emailRecipient) => {
    // console.log(process.env.REACT_APP_FONTEND_URL)
    let language = data.language
    let emailSender = 'vinctuan02@gmail.com'
    let emailRecipient = data.email
    let namePatient = data.fullName
    let timeBooking = data.timeString
    let reason = data.reason
    let nameDoctor = data.fullNameDoctor
    let linkdirect = data.linkdirect

    console.log("email is being sent")
    console.log(process.env.EMAIL_APP)
    console.log(process.env.PASSWORD_APP)

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.PASSWORD_APP
        },
        tls: {
            rejectUnauthorized: false
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
            <p><strong> Thời gian khám: ${timeBooking}</strong></p>
            <p><strong>Lý do khám: ${reason}</strong></p>
            <p><strong>Bác Sĩ: ${nameDoctor}</strong></p>
            <p><em>Nếu các thông tin trên chính xác vui lòng click vào link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</em></p>
            <a href="${linkdirect}">Xác nhận lịch hẹn</a>
            <p>Xin chân thành cảm ơn.</p>   
        `
        };
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error")
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
            <p><strong>Doctor: ${nameDoctor}</strong></p>
            <p><em>If the above information is correct, please click on the link below to confirm and complete the medical appointment procedure</em></p>            <p>Click here</p>
            <a href="${linkdirect}">Confirm appointment</a>
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