import patientService from '../services/patientService'

let postBookAppointment = async (req, res) => {
    try {
        // console.log("req.body: ", req.body)
        let infor = await patientService.postBookAppointment(req.body)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}



module.exports = {
    postBookAppointment: postBookAppointment
}