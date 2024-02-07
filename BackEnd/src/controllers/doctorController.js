import doctorService from '../services/doctorService'

let getTopDoctorHome = async (req, res) => {
    // console.log("test getTOpDoctorHome", req.query)
    let limit = req.query.limit
    if (!limit) {
        limit = 10
    }
    try {
        let doctors = await doctorService.getTopDoctorHomeService(+limit)
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server.'
        })
    }
}

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors()
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'get All Doctor Fail'
        })
    }
}

let postInforDoctor = async (req, res) => {
    try {
        // console.log("test req: ", req.body)
        // let response = await doctorService.getAllDoctors()
        let response = await doctorService.saveInforDoctor(req.body)
        // console.log("Test respone: ", response)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Post infor doctor fail"
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    // console.log("req.query: ", req.query)
    try {
        let infor = await doctorService.getDetailDoctorById(req.query.id)
        // console.log("infor by id: ", infor)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        // console.log("hi")
        // console.log("req.body: ", req.body)
        let infor = await doctorService.bulkCreateSchedule(req.body)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getScheduleByDate = async (req, res) => {
    // console.log("hi: ")
    // console.log("req.query.doctorId", req.query.doctorId)
    // console.log("req.query.date: ", req.query.date)

    try {
        // console.log("hi")
        let scheduleByDate = await doctorService.getScheduleByDate(req.query.doctorId, req.query.date)
        // // console.log("infor: ", infor)
        return res.status(200).json(scheduleByDate)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getExtraInforDoctorById = async (req, res) => {
    // console.log("getExtraInforDoctor")
    try {
        // console.log(req.query.id)
        let infor = await doctorService.getExtraInforDoctorById(req.query.id)
        // console.log("infor by id: ", infor)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getProfileDoctorById = async (req, res) => {
    try {
        let Profile = await doctorService.getProfileDoctorById(req.query.id)
        return res.status(200).json(Profile)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctor: postInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById
}