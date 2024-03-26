import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import moment from 'moment'
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils/constant';
import { getScheduleDoctorByDate } from '../../../services/userService';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModal: false,
            dataTimeSchedule: {}
        }
    }

    async componentDidMount() {
        let { language } = this.props
        let allDays = this.getArrDays(language)
        // console.log("this.props: ", this.props)
        // console.log('this.props.doctorid: ', this.props.doctorId)
        if (allDays && allDays.length > 0) {
            let res = await getScheduleDoctorByDate(this.props.doctorId, allDays[0].value)
            this.setState({
                allDays: allDays,
                allAvailableTime: res.data ? res.data : []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language)
            this.setState({
                allDays: allDays
            })
        }

        let { language } = this.props
        let allDays = this.getArrDays(language)
        if (this.props.doctorId !== prevProps.doctorId) {
            if (allDays && allDays.length > 0) {
                let res = await getScheduleDoctorByDate(this.props.doctorId, allDays[0].value)
                this.setState({
                    allDays: allDays,
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }
    };

    getArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            allDays.push(object)
        }
        return allDays
        // console.log("Arr date: ", arrDate)
    }

    handleOnChangeSelect = async (event) => {
        // console.log("event.target: ", event.target.value)
        if (this.props.doctorId && this.props.doctorId !== -1) {
            let doctorId = this.props.doctorId
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            console.log("check res get schedule: ", res)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }

    }

    handleClickScheduleTime = (time) => {
        // console.log("time: ", time)
        this.setState({
            isOpenModal: true,
            dataTimeSchedule: time
        })
    }

    closeModalBooking = () => {
        this.setState({
            isOpenModal: false
        })
    }

    render() {
        let { allDays, allAvailableTime, isOpenModal, dataTimeSchedule } = this.state
        let { language } = this.props
        // console.log("dataTimeSchedule: ", dataTimeSchedule)
        // console.log("this.props doctorshedule: ", this.props)
        // console.log("allAvailableTime: ", allAvailableTime)
        // console.log("this.state: doctorschedule: ", do)
        return (
            <React.Fragment>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}>
                                            {item.label}
                                        </option>
                                    )
                                })

                            }
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'><span>Lịch khám</span></i>
                        </div>
                        <div className='time-content'>
                            {
                                allAvailableTime && allAvailableTime.length > 0 ?
                                    allAvailableTime.map((item, index) => {
                                        let timeDisplay =
                                            language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                        return (
                                            <button
                                                className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'} key={index}
                                                onClick={() => this.handleClickScheduleTime(item)}
                                            >
                                                {timeDisplay}
                                            </button>
                                        )
                                    })
                                    :
                                    <div className='no-schedule'>
                                        Không có lịch hẹn trong khoảng thời gian này, vui lòng chọn thời gian khác!
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModal}
                    closeModalBooking={this.closeModalBooking}
                    dataTimeSchedule={dataTimeSchedule}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
