import db from "../models"
require('dotenv').config()
// import { sendMail } from "./emailService"
import emailService from './emailService'
import doctorService from './doctorService'



let postBookAppointment = (data) => {
    // console.log("data: ", data)
    return new Promise(async (resolve, reject) => {
        try {

            console.log("Data: ", data)
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

                // let data = await this.getInforDoctor(this.props.doctorId)
                let inforDoctor = await doctorService.getDetailDoctorById(data.doctorId)
                // console.log("Name doctor: ", inforDoctor.data.lastName + inforDoctor.data.firstName)
                data.fullNameDoctor = inforDoctor.data.lastName + inforDoctor.data.firstName
                emailService.sendMail(data)
                console.log("Data: ", data)

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