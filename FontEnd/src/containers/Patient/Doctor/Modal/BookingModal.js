import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap'
import './BookingModal.scss'
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as action from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select'
import { postBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment'



class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            timeType: '',
            genders: '',
        }
    }

    async componentDidMount() {
        this.props.fetchGenderStart()
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildGenders(this.props.gendersProps)
            })
        }
        if (this.props.gendersProps !== prevProps.gendersProps) {
            this.setState({
                genders: this.buildGenders(this.props.gendersProps)
            })
        }
        if (this.props.dataTimeSchedule !== prevProps.dataTimeSchedule) {
            if (this.props.dataTimeSchedule && !_.isEmpty(this.props.dataTimeSchedule)) {
                let doctorId = this.props.dataTimeSchedule.doctorId
                let timeType = this.props.dataTimeSchedule.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    };

    buildGenders = (data) => {
        let result = []
        let language = this.props.language
        data.map(item => {
            let object = {}
            object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
            object.value = item.keyMap
            result.push(object)
        })
        return result
    }

    handleOnChangeInput = (event, id) => {
        // console.log("event: ", event.target.value)
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }

    // handleChangeDatePicker = (date) => {
    //     this.setState({
    //         birthday: date[0]
    //     })
    // }

    handleDateSelect = (date) => {
        console.log("date select")
    }

    handleDateChange = (date) => {
        // console.log("handle date change", date[0])
        if (date[0]) {
            this.setState({
                birthday: date[0]
            })
        }
    }

    handleChangeSelectGender = (selected) => {
        this.setState({ selectedGender: selected })
    }

    handleConfirmBooking = async () => {
        // console.log("this.state: ", this.state)
        let date = new Date(this.state.birthday).getTime()
        let timeString = this.buildTimeBooking(this.props.dataTimeSchedule)
        
        let res = await postBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString
        })

        if (res && res.errCode === 0) {
            toast.success("Booking a new appointment succed!")
            this.props.closeModalBooking()
        } else {
            toast.error("Error!")
        }
    }


    buildTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            return `${time} - ${date}`
        }
        return ''
    }

    render() {

        // console.log("this.props.dataTimeSchedule: ", this.props.dataTimeSchedule)
        let { isOpenModal, closeModalBooking, dataTimeSchedule } = this.props
        // let timeBooking = this.buildTimeBooking(dataTimeSchedule)
        // console.log("this.props bookingmodal: ", this.props)
        // console.log("this.state bookingmodal: ", this.state)
        let doctorId = dataTimeSchedule && !_.isEmpty(dataTimeSchedule) ? dataTimeSchedule.doctorId : ''
        // console.log("doctorId: ", doctorId)

        // console.log("this.props: ", this.props)
        // console.log("this.state: ", this.state)
        // console.log("timeBookingx: ", timeBooking)
        return (
            <React.Fragment>
                <div>
                    <Modal
                        className={'booking-modal-contrainer'}
                        isOpen={isOpenModal}
                        size='lg'
                        centered
                        backdrop={true}
                    >
                        <div className='booking-modal-content'>
                            <div className='booking-modal-header'>
                                <span className='left'>
                                    <FormattedMessage id="patient.booking-modal.title" />
                                </span>
                                <span
                                    className='right'
                                    onClick={closeModalBooking}
                                >
                                    <i className='fas fa-times'></i>
                                </span>
                            </div>
                            <div className='booking-modal-body'>
                                <div className='doctor-infor'>
                                    <ProfileDoctor
                                        doctorId={doctorId}
                                        isShowDescriptionDoctor={false}
                                        dataTimeSchedule={dataTimeSchedule}
                                    />
                                </div>
                                <div className='row'>
                                    <div className='col-6 form-group'>
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.full-name" />
                                        </label>
                                        <input className='form-control'
                                            onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                            value={this.state.fullName}
                                        ></input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id="patient.booking-modal.phone-number" /></label>
                                        <input className='form-control'
                                            onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                            value={this.state.phoneNumber}
                                        ></input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                        <input className='form-control'
                                            onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                            value={this.state.email}
                                        ></input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                        <input className='form-control'
                                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                            value={this.state.address}
                                        ></input>
                                    </div>
                                    <div className='col-12 form-group'>
                                        <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                        <input className='form-control'
                                            onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                            value={this.state.reason}
                                        ></input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id="patient.booking-modal.birthday" /></label>
                                        {/* <DatePicker
                                            className='form-control'
                                            onChange={this.handleChangeDatePicker}
                                            value={this.state.birthday}
                                            minDate={new Date()}
                                        /> */}
                                        <DatePicker
                                            className='form-control'
                                            selected={new Date()}
                                            // onSelect={this.handleDateSelect} //when day is clicked
                                            onChange={this.handleDateChange} //only when value has changed
                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                        <Select
                                            value={this.state.selectedGender}
                                            onChange={this.handleChangeSelectGender}
                                            options={this.state.genders}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='booking-modal-footer'>
                                <button
                                    className='btn-booking-confirm'
                                    onClick={() => this.handleConfirmBooking()}
                                >
                                    <FormattedMessage id="patient.booking-modal.btnConfirm" />
                                </button>
                                <button className='btn-booking-cancel'
                                    onClick={closeModalBooking}
                                >
                                    <FormattedMessage id="patient.booking-modal.cancel" />
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </React.Fragment >
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        gendersProps: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(action.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
