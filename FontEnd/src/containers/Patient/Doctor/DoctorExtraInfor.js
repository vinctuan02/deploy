import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss'
import { getExtraInforDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';

import { LANGUAGES } from '../../../utils/constant';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfor: true,
            extraInfor: {}
        }
    }

    async componentDidMount() {
        // console.log("did mount")
        // let data = await getExtraInforDoctorById(this.props.doctorId)
        // console.log('data by id: ', data)
        let res = await getExtraInforDoctorById(this.props.doctorId)
        // console.log('res didupdate: ', res)
        if (res && res.errCode === 0) {
            this.setState({
                extraInfor: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        // console.log("did update")
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {

        }
    };

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props
        // // console.log(this.props)
        // console.log("extraInfor: ", extraInfor)
        // console.log("this.prevProps: ", this.props)

        return (
            <React.Fragment>
                <div className='doctor-extra-infor-container'>
                    <div className='content-up'>
                        <div className='text-address'>
                            <FormattedMessage id={'patient.extra-infor-doctor.text-address'} />
                            {/* {extraInfor.addressClinic ? extraInfor.addressClinic : ''} */}
                        </div>
                        <div>
                            <div className='name-clinic'>
                                {extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                            </div>
                            <div className='detail-address'>
                                {extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                            </div>
                        </div>
                    </div>
                    <div className='content-down'>
                        <div>
                            {isShowDetailInfor === false &&
                                <div className='short-infor'>
                                    <FormattedMessage id={'patient.extra-infor-doctor.price'} />
                                    :
                                    {
                                        extraInfor && extraInfor.priceData && language === LANGUAGES.VI &&
                                        <NumberFormat
                                            value={extraInfor.priceData.valueVi}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VNĐ'}
                                            className='currency'
                                        />
                                    }
                                    {
                                        extraInfor && extraInfor.priceData && language === LANGUAGES.EN &&
                                        <NumberFormat
                                            value={extraInfor.priceData.valueEn}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'$'}
                                            className='currency'
                                        />
                                    }
                                    {/* <NumberFormat
                                        value={24444}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VNĐ'}
                                    />
                                    {
                                        extraInfor.priceData.valueVi ? extraInfor.priceData.valueVi : ''
                                    } */}
                                    <span className='detail' onClick={() => this.showHideDetailInfor(true)}>
                                        <FormattedMessage id={'patient.extra-infor-doctor.detail'} />
                                    </span>
                                </div>
                            }
                            {isShowDetailInfor === true &&
                                <>
                                    <div className='title-price'>
                                        <FormattedMessage id={'patient.extra-infor-doctor.price'} />:
                                    </div>
                                    <div className='detail-infor'>
                                        <div className='price'>
                                            <span className='left'>
                                                <FormattedMessage id={'patient.extra-infor-doctor.price'} />:
                                            </span>
                                            <span className='right'>
                                                {
                                                    extraInfor && extraInfor.priceData && language === LANGUAGES.VI &&
                                                    <NumberFormat
                                                        value={extraInfor.priceData.valueVi}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={'VNĐ'}
                                                        className='currency'
                                                    />
                                                }
                                                {
                                                    extraInfor && extraInfor.priceData && language === LANGUAGES.EN &&
                                                    <NumberFormat
                                                        value={extraInfor.priceData.valueEn}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={'$'}
                                                        className='currency'
                                                    />
                                                }
                                            </span>
                                        </div>
                                        <div className='note'>
                                            {extraInfor.note ? extraInfor.note : ''}
                                        </div>
                                    </div>
                                    <div className='payment'>
                                        <FormattedMessage id={'patient.extra-infor-doctor.payment'} />
                                        {extraInfor.paymentData && language === LANGUAGES.VI ? extraInfor.paymentData.valueVi : ''}
                                        {extraInfor.paymentData && language === LANGUAGES.EN ? extraInfor.paymentData.valueEn : ''}
                                    </div>
                                    <div className='hide-price'>
                                        <span onClick={() => this.showHideDetailInfor(false)}>
                                            <FormattedMessage id={'patient.extra-infor-doctor.hide-price'} />
                                        </span>
                                    </div>
                                </>
                            }
                        </div>
                    </div>

                </div>
            </React.Fragment >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
