import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import Select from 'react-select'
import * as action from '../../../store/actions'
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';

class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: new Date(),
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux()
        this.props.fetchAllScheduleTimeRedux()
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log("did update")
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInput(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            // console.log("this.props.allScheduleTime: ", this.props.allScheduleTime)
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data = data.map((item) => {
                    item.isSelected = false
                    return item
                })
            }

            // console.log("check data time: ", data)

            this.setState({
                rangeTime: data
            })
        }

        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInput(this.props.allDoctors)
        //     this.setState({
        //         listDoctors: dataSelect
        //     })
        // }
    }

    buildDataInput = (dataInput) => {
        let result = []
        let { language } = this.props
        dataInput.map((item, index) => {
            let object = {}
            let labelVi = `${item.lastName} ${item.firstName}`
            let labelEn = `${item.firstName} ${item.lastName}`

            object.label = language === LANGUAGES.VI ? labelVi : labelEn
            object.value = item.id
            result.push(object)
            return ''
        })
        return result
    }

    handleChangeSelect = async (selectedOption) => {
        console.log("selectOption: ", selectedOption)
        this.setState({ selectedDoctor: selectedOption })
    }

    handleChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        // console.log("Check tesst")
        // console.log("time: ", time)
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id)
                    item.isSelected = !item.isSelected
                return item
            })
        }
        this.setState({
            rangeTime: rangeTime
        })
    }

    handleClickBtnSave = async () => {
        let result = []
        let { rangeTime, selectedDoctor, currentDate } = this.state
        // console.log("this.state.rangeTime: ", this.state.rangeTime)
        // console.log("current date: ", moment(currentDate).format('DD/MM/YYYY'))
        // console.log("this.state: ", this.state)
        if (!currentDate) {
            toast.error("Invalid date")
            return
        }

        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalidate selected Doctor")
            return
        }

        console.log("currentDate: ", currentDate)

        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        let formatedDate = new Date(currentDate).getTime()
        // console.log("formatedDate: ", formatedDate)
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter((item) => item.isSelected === true)

            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule) => {
                    let object = {}
                    object.doctorId = selectedDoctor.value
                    object.date = formatedDate
                    object.timeType = schedule.keyMap
                    result.push(object)
                    return ''
                })
            } else {
                toast.error("Invalid selected time ! ")
                return
            }
        }
        console.log("result: ", result)

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result
        })
        // console.log("res: ", res)
        // console.log('check result: ', result)
        if (res && res.errCode === 0) {
            toast.success('Save scheduel success')
        } else {
            toast.error("Save scheduel failed ")
        }
    }

    render() {
        // console.log("this.state: ", this.state)
        // const { isLoggedIn } = this.props
        // console.log("this.props", this.props)
        let { rangeTime } = this.state
        let { language } = this.props
        // console.log("this.state.rangeTime: ", this.state.rangeTime)
        return (
            <React.Fragment>
                <div className='manage-schedule-container'>
                    <div className='m-s-title'>
                        <FormattedMessage id='manage-schedule.title' />
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='manage-schedule.choose-doctor' /></label>
                                <Select
                                    value={this.state.selectedOption}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='manage-schedule.choose-date' /></label>
                                <DatePicker
                                    className='form-control'
                                    onChange={this.handleChangeDatePicker}
                                    value={this.state.currentDate}
                                    minDate={new Date()}
                                />
                            </div>
                            <div className='col-12 pick-hour-container'>
                                {rangeTime && rangeTime.length > 0 &&
                                    rangeTime.map((item, index) => {
                                        return (
                                            <button
                                                className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                                key={index} onClick={() => this.handleClickBtnTime(item)}
                                            >
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            <button className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleClickBtnSave()}
                            >
                                <FormattedMessage id='manage-schedule.save' />
                            </button>
                        </div>
                        <div></div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        // systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(action.fetchAllDoctor()),
        fetchAllScheduleTimeRedux: () => dispatch(action.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
