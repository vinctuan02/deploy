import db from "../models"
require('dotenv').config()
import _, { some } from 'lodash'

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE || 10

let getTopDoctorHomeService = (limitInput) => {
    // console.log("limitInput service: ", limitInput)
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                oder: [['createAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            })

            // console.log("Test users: ", users)
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e)
        }
    }
    )
}

let getAllDoctors = () => {
    // console.log("Get all doctor service: ")
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                }
            })
            // console.log("check doctors: ", doctors)
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (e) {
            reject(e)
        }
    })
}

let saveInforDoctor = async (inputData) => {
    // console.log("inputData.action: ", inputData.action)
    // console.log("input Data: ", inputData)
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.contentHTML || !inputData.contentMarkdown ||
                !inputData.description || !inputData.action ||
                !inputData.selectedPrice || !inputData.selectedPayment ||
                !inputData.selectedProvince || !inputData.nameClinic ||
                !inputData.addressClinic || !inputData.note
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter.'
                })
            } else {
                //upsert Markdown
                if (inputData.action == 'CREATE') {
                    // console.log("CREATE")
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId,
                        // specialtyId: inputData.specialtyId
                    })
                } else if (inputData.action == 'EDIT') {
                    // console.log("EDIT")
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false
                    })
                    // console.log("doctorMarkdown: ", doctorMarkdown)
                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = inputData.contentHTML
                        doctorMarkdown.contentMarkdown = inputData.contentMarkdown
                        doctorMarkdown.description = inputData.description
                        await doctorMarkdown.save()
                    }
                }

                let doctorInfor = await db.Doctor_Infor.findOne({
                    where: { doctorId: inputData.doctorId },
                    raw: false
                })

                if (doctorInfor) {
                    // update
                    // console.log("doctorInfor from db: ", doctorInfor)
                    // console.log("update")
                    doctorInfor.doctorId = inputData.doctorId
                    doctorInfor.priceId = inputData.selectedPrice
                    doctorInfor.provinceId = inputData.selectedProvince
                    doctorInfor.paymentId = inputData.selectedPayment
                    doctorInfor.nameClinic = inputData.nameClinic
                    doctorInfor.addressClinic = inputData.addressClinic
                    doctorInfor.note = inputData.note
                    await doctorInfor.save()
                    // console.log("doctorInfor Update: ", doctorInfor)
                    // console.log("update success")
                } else {
                    // create
                    // console.log("create")
                    // console.log("doctorInfor from db: ", doctorInfor)
                    db.Doctor_Infor.create({
                        doctorId: inputData.doctorId,
                        priceId: inputData.selectedPrice,
                        provinceId: inputData.selectedProvince,
                        paymentId: inputData.selectedPayment,
                        nameClinic: inputData.nameClinic,
                        addressClinic: inputData.addressClinic,
                        note: inputData.note
                    })
                    // console.log("create success")
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save infor doctor success.'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getDetailDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['contentHTML', 'contentMarkdown', 'description']
                        },
                        {
                            model: db.Allcode, as: 'positionData',
                            attributes: ['valueEn', 'valueVi']
                        },
                        {
                            model: db.Doctor_Infor,
                            // attributes: ['valueEn', 'valueVi']
                            attributes: {
                                exclude: ['id', 'doctorId']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceData', attributes: ['valueVi', 'valueEn'] },
                                { model: db.Allcode, as: 'provinceData', attributes: ['valueVi', 'valueEn'] },
                                { model: db.Allcode, as: 'paymentData', attributes: ['valueVi', 'valueEn'] },
                            ]
                        },
                    ],
                    raw: true,
                    nest: true
                })

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary')
                }

                if (!data) data = {}
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}


let checkRecordIsExist = (data) => {
    return new Promise(async (resolve, reject) => {

        // let dataScheduleFromDB = 1
        // console.log("data: ", data.arrSchedule)
        // console.log("date string: ", '' + data.arrSchedule[0].date)
        for (let i = 0; i < data.arrSchedule.length; i++) {
            // console.log("data schedule for :", data.arrSchedule[i])
            let dataScheduleFromDB = await db.Schedule.findOne({
                where: {
                    doctorId: data.arrSchedule[i].doctorId,
                    date: data.arrSchedule[i].date + '',
                    timeType: data.arrSchedule[i].timeType
                }
            })
            if (_.isEmpty(dataScheduleFromDB)) {
                console.log("Record isn't exist: ", data.arrSchedule[i])
            } else {
                console.log("Record is exist: ", data.arrSchedule[i])
                resolve(true)
            }
        }

        // console.log("data from manage schedule: ", data.arrSchedule)
        // console.log("data from DB 22: ", dataScheduleFromDB)
        resolve(false)
    })
}

let bulkCreateSchedule = (data) => {
    // return ({
    //     errCode: 0,
    //     errMessage: "Check data"
    // })
    // console.log("data doctorService: ", data)
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required param !'
                })
            } else {
                let schedule = data.arrSchedule
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map((item) => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE
                        return item
                    })
                }
                // console.log('Check record is empty: ', await checkRecordIsExist(data))
                // console.log("data11: ", schedule)
                if (await checkRecordIsExist(data)) {
                    console.log("Record is exist, please try again!")
                    resolve({
                        errCode: -1,
                        errMessage: "Schedule is exist!"
                    })
                } else {
                    console.log("Record isn't exist")
                    await db.Schedule.bulkCreate(schedule)
                    resolve({
                        errCode: 0,
                        errMessage: 'Oke'
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: "Check data"
                })
            }
        } catch (e) {
            reject({
                errCode: -1,
                errMessage: "hihi "
            })
        }
    })
}

let getScheduleByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing parameters'
                })
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    },
                    include: [
                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: false,
                    net: true
                })

                if (!dataSchedule) dataSchedule = []
                resolve({
                    errCode: 0,
                    data: dataSchedule
                })
            }
        } catch (e) {
            console.log("e ")
            reject(e)
        }
    })
}

module.exports = {
    getTopDoctorHomeService,
    getAllDoctors,
    saveInforDoctor: saveInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate
}


// [
//     { doctorId: 74, date: 'Invalid date', timeType: 'T2', maxNumber: 10 },
//     { doctorId: 74, date: 'Invalid date', timeType: 'T3', maxNumber: 10 }
// ]

// [
//     { username: 'barfooz', isAdmin: true },
//     { username: 'foo', isAdmin: true },
//     { username: 'bar', isAdmin: false }
// ]