import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant';
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService'
import NumberFormat from 'react-number-format';
import moment from 'moment'
import _ from 'lodash';

class DefaultClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctorId !== prevProps.doctorId) {
            // this.getInforDoctor(this.props.doctorId)
        }
    };

    getInforDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }

    renderTimeBooking = (dataTime, language) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            return (
                <>
                    <div>{time} / {date}</div>
                </>
            )
        }
    }

    render() {
        // console.log("this.state: ", this.state)
        // console.log("this.props: ", this.props)

        let { dataProfile } = this.state
        // if (dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceData) {
        //     console.log("dataProfile.Doctor_Infor.priceData: ", dataProfile.Doctor_Infor.priceData)
        // }

        // console.log("dataProfile.Doctor_Infor.priceData: ", dataProfile.Doctor_Infor.priceData.valueVi)
        // console.log("dataProfile.Doctor_Infor.priceData: ", dataProfile.Doctor_Infor.priceData.valueEn)

        let { language, isShowDescriptionDoctor, dataTimeSchedule } = this.props
        // console.log("language: ", language)

        let nameVi = '', nameEn = ''

        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`
        }

        return (
            <React.Fragment>
                <div className='profile-doctor-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'>
                            <div className='image-doctor'
                                style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}>
                            </div>
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {
                                    language === LANGUAGES.VI ? nameVi : nameEn
                                }
                            </div>
                            <div className='down'>
                                {isShowDescriptionDoctor &&
                                    <>
                                        {dataProfile && dataProfile.Markdown &&
                                            dataProfile.Markdown.description &&
                                            <span>
                                                {dataProfile.Markdown.description}
                                            </span>
                                        }
                                    </>
                                }

                                {this.renderTimeBooking(dataTimeSchedule, language)}

                                <div className='price'>
                                    Giá khám:
                                    {dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceData &&
                                        <span>
                                            {language === LANGUAGES.VI ?
                                                <NumberFormat
                                                    value={dataProfile.Doctor_Infor.priceData.valueVi}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VNĐ'}
                                                    className='currency'
                                                />
                                                :
                                                <NumberFormat
                                                    value={dataProfile.Doctor_Infor.priceData.valueEn}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'USD'}
                                                    className='currency'
                                                />
                                            }
                                        </span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
