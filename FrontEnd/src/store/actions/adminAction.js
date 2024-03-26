import { escape, reject } from 'lodash';
import {
    getAllUsers, getAllCodeService, createNewUserService,
    deleteUserService, editUserService, getTopDoctorService,
    getAllDoctors, saveDetailInforDoctor
} from '../../services/userService';
import actionTypes from './actionTypes';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.ADD_USER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService('gender')
            if (res && res.errCode === 0) {
                // console.log(res)
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            console.log(e)
        }

    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})




export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START })
            let res = await getAllCodeService('position')
            if (res && res.errCode === 0) {
                // console.log(res)
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            console.log(e)
        }

    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})




export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })
            let res = await getAllCodeService('role')
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            console.log(e)
        }

    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            // dispatch({ type: actionTypes.FETCH_ROLE_START })
            let res = await createNewUserService(data)
            if (res && res.errCode === 0) {
                console.log("Create user success")
                toast.success("Create user successed")
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                console.log("Create user failed")
                toast.warn("Create user failed")
                dispatch(saveUserFailed())
            }
            reject()
        } catch (e) {
            console.log(e)
        }

    }
}


export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCES
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})



export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            // dispatch({ type: actionTypes.FETCH_ALL_USER_SUCCESS })
            let res = await getAllUsers('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUserFailed())
            }
        } catch (e) {
            console.log(e)
        }

    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})
export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})

export const deleteUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(data)
            if (res && res.errCode === 0) {
                toast.success("Delete user success")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.success("Delete user failed")
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            console.log(e)
        }

    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCES
})


export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            // console.log("data: ", data)
            let res = await editUserService(data)
            if (res && res.errCode === 0) {
                toast.success("Edit user success")
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.success("Edit user failed")
                dispatch(editUserFailed())
            }
        } catch (e) {
            console.log(e)
        }

    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCES
})


export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})


export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            // dispatch({ type: actionTypes.FETCH_ALL_USER_SUCCESS })
            let res = await getTopDoctorService(5)
            // console.log('check res fetch doctor: ', res)
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data))
            } else {
                dispatch(fetchTopDoctorFailed())
            }
        } catch (e) {
            console.log(e)
        }

    }
}

export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    dataDoctors: data
})
export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
})


export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors()
            // console.log("fetch all user: ", res)
            if (res && res.errCode === 0) {
                // console.log("rest === 0", res.data)
                dispatch(fetchAllDoctorSuccess(res.data))
            } else {
                dispatch(fetchAllDoctorFailed())
            }
        } catch (e) {
            console.log(e)
        }

    }
}

export const fetchAllDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    dataDoctors: data,
})
export const fetchAllDoctorFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
})

export const saveDetailUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailInforDoctor(data)
            // console.log("fetch all user: ", res)
            if (res && res.errCode === 0) {
                // console.log("rest === 0", res.data)
                toast.success("Save detail doctor success")
                dispatch(saveDetailUserSuccess())
            } else {
                toast.error("Save detail doctor failed")
                dispatch(saveDetailUserFail())
            }
        } catch (e) {
            toast.error("Save detail doctor failed")
            console.log(e)
        }

    }
}

export const saveDetailUserSuccess = () => ({
    type: actionTypes.SAVE_DETAIL_INFOR_DOCTOR_SUCCESS
})
export const saveDetailUserFail = () => ({
    type: actionTypes.SAVE_DETAIL_INFOR_DOCTOR_FAILED
})


export const fetchAllScheduleTime = (type) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME')
            // console.log("fetch all user: ", res)
            if (res && res.errCode === 0) {
                // console.log("rest === 0", res.data)
                dispatch(fetchAllScheduleTimeSuccess(res.data))
            } else {
                dispatch(fetchAllScheduleTimeFailed())
            }
        } catch (e) {
            console.log(e)
        }

    }
}

export const fetchAllScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
    dataTime: data,
})
export const fetchAllScheduleTimeFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
})

export const getRequiredDoctorInfor = (type) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })
            let resPrice = await getAllCodeService('PRICE')
            let resPayment = await getAllCodeService('PAYMENT')
            let resProvince = await getAllCodeService('PROVINCE')
            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                }
                dispatch(fetchRequiredDoctorInForSuccess(data))
            } else {
                dispatch(fetchRequiredDoctorInForFailed())
            }
        } catch (e) {
            console.log(e)
        }

    }
}

export const fetchRequiredDoctorInForSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    allRequiredData: allRequiredData
})
export const fetchRequiredDoctorInForFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
})