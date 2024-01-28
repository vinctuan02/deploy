import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap'
import './BookingModal.scss'
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';

class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState) {

    };


    render() {
        let { isOpenModal, closeModalBooking, dataTimeSchedule } = this.props
        // console.log("this.props: ", this.props)
        let doctorId = dataTimeSchedule && !_.isEmpty(dataTimeSchedule) ? dataTimeSchedule.doctorId : ''
        // console.log("doctorId: ", doctorId)
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
                                <span className='left'>Thông tin đặt lịch khám bệnh</span>
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
                                    />
                                </div>
                                <div className='price'>
                                    Giá khám 500.000đ
                                </div>
                                <div className='row'>
                                    <div className='col-6 form-group'>
                                        <label>Họ tên</label>
                                        <input className='form-control'></input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>Số điện thoại</label>
                                        <input className='form-control'></input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>Email</label>
                                        <input className='form-control'></input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>Địa chỉ</label>
                                        <input className='form-control'></input>
                                    </div>
                                    <div className='col-12 form-group'>
                                        <label>Lý do khám</label>
                                        <input className='form-control'></input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>Đặt cho ai</label>
                                        <input className='form-control'></input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>Giới tính</label>
                                        <input className='form-control'></input>
                                    </div>
                                </div>
                            </div>
                            <div className='booking-modal-footer'>
                                <button
                                    className='btn-booking-confirm'
                                    onClick={closeModalBooking}
                                >
                                    Xác nhận
                                </button>
                                <button className='btn-booking-cancel'
                                    onClick={closeModalBooking}
                                >
                                    Huỷ
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
