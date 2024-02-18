import db from "../models"
const dotenv = require('dotenv');
dotenv.config();
// import { sendMail } from "./emailService"
import emailService from './emailService'
import doctorService from './doctorService'
import { v4 as uuidv4 } from 'uuid';

let postBookAppointment = (data) => {
    // console.log("data: ", data)
    return new Promise(async (resolve, reject) => {
        try {

            let buildUrl = (doctorId, token) => {
                let result = `${process.env.REACT_APP_FONTEND_URL}/verify-booking?token=${token}&doctorId=${doctorId}`
                return result
            }

            // console.log("Data: ", data)
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
                let token = uuidv4()
                // let data = await this.getInforDoctor(this.props.doctorId)
                let inforDoctor = await doctorService.getDetailDoctorById(data.doctorId)
                // console.log("Name doctor: ", inforDoctor.data.lastName + inforDoctor.data.firstName)
                data.fullNameDoctor = inforDoctor.data.lastName + inforDoctor.data.firstName
                data.linkdirect = buildUrl(data.doctorId, token)
                // console.log("data.linkdirectLink: ", data.linkdirectLink)
                emailService.sendMail(data)
                // console.log("Data: ", data)

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
                            timeType: data.timeType,
                            token: token
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

let postVerifyBookAppointment = (data) => {
    console.log("data: ", data)
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.token) {
                reject({
                    errCode: 1,
                    errMessage: "Missing parameter!"
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })

                console.log(appointment)

                if (appointment) {
                    appointment.statusId = 'S2'
                    await appointment.save()
                    resolve({
                        errCode: 0,
                        errMessage: "Successful appointment confirmation!"
                    })
                } else {
                    resolve({
                        errCode: -2,
                        errMessage: "Appointment has been confirmed or does not exist!"
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}