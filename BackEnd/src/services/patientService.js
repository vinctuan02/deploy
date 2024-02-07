import db from "../models"
require('dotenv').config()
// import { sendMail } from "./emailService"
import emailService from './emailService'

let postBookAppointment = (data) => {
    console.log("data: ", data)
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.fullName || !data.phoneNumber ||
                !data.email || !data.address || !data.doctorId ||
                !data.date || !data.timeType || !data.selectedGender
            ) {
                // if (false) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let language = data.language
                let emailSender = 'vinctuan02@gmail.com'
                let emailRecipient = data.email
                let namePatient = data.fullName
                let timeBooking = data.timeString
                let nameDoctor = "Chu Huy Hoang"
                let link = 'hi'

                emailService.sendMail(language, emailSender, emailRecipient, namePatient, timeBooking, nameDoctor, link)

                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    }
                });

                // console.log("Check user: ", user[0])

                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }

                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save infor doctor succed!'
                })

                //create a booking record
            }
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment
}