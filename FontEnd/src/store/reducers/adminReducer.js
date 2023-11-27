import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],

    allRequiredDoctorInfor: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            // console.log("adminReducer, case FETCH_GENDER_START: ", action)
            state.isLoadingGender = true
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            // console.log("adminReducer, case FETCH_GENDER_SUCCESS: ", action)
            state.genders = action.data
            state.isLoadingGender = false
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_FAILED:
            // console.log("adminReducer, case FETCH_GENDER_FAILED: ", action)
            state.isLoadingGender = false
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_START:
            // console.log("adminReducer, case FETCH_ROLE_START: ", action)
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            // console.log("adminReducer, FETCH_ROLE_SUCCESS: ", action)
            state.positions = action.data
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_FAILED:
            // console.log("adminReducer, case FETCH_ROLE_FAILED: ", action)

            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_START:
            // console.log("adminReducer, case FETCH_ROLE_START: ", action)
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            // console.log("adminReducer, FETCH_ROLE_SUCCESS: ", action)
            state.roles = action.data
            // console.log("state fetch role success", state)
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_FAILED:
            // console.log("adminReducer, case FETCH_ROLE_FAILED: ", action)

            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            // console.log("adminReducer, case FETCH_ROLE_FAILED: ", action)
            // console.log("actiontypes action: ", action)
            state.users = action.users
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USER_FAILED:
            // console.log("adminReducer, case FETCH_ROLE_FAILED: ", action)
            state.users = []
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            // console.log("adminReducer, case FETCH_ROLE_FAILED: ", action)
            // console.log("actiontypes action: ", action)
            state.topDoctors = action.dataDoctors
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            // console.log("adminReducer, case FETCH_ROLE_FAILED: ", action)
            // console.log("actiontypes action: ", action)
            state.topDoctors = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            // console.log("adminReducer, case FETCH_ROLE_FAILED: ", action)
            // console.log("fetch all doctor success: ", action)
            state.allDoctors = action.dataDoctors
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            console.log("fetch all user fail")
            // console.log("adminReducer, case FETCH_ROLE_FAILED: ", action)
            // console.log("actiontypes action: ", action)
            state.topDoctors = []
            return {
                ...state,
            }


        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            // console.log("adminReducer, case FETCH_ROLE_FAILED: ", action)
            // console.log("fetch all doctor success: ", action)
            state.allScheduleTime = action.dataTime
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            console.log("fetch all user fail")
            // console.log("adminReducer, case FETCH_ROLE_FAILED: ", action)
            // console.log("actiontypes action: ", action)
            state.topDoctors = []
            return {
                ...state,
            }

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START:
            // console.log("fetch required doctor infor start : ")
            return {
                ...state,
            }

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            // console.log("adminReducer, case FETCH_ROLE_FAILED: ", action)
            // console.log("fetch all doctor success: ", action)
            state.allRequiredDoctorInfor = action.allRequiredData
            // console.log("fetch required doctor data action: ", action)
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            // console.log("fetch all user fail")
            // console.log("adminReducer, case FETCH_ROLE_FAILED: ", action)
            // console.log("actiontypes action: ", action)
            state.allRequiredDoctorInfor = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;