import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss'
import { getExtraInforDoctorById } from '../../../services/userService';


import { LANGUAGES } from '../../../utils/constant';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfor: true
        }
    }

    async componentDidMount() {
        // console.log("did mount")
        let data = await getExtraInforDoctorById(this.props.doctorId)
        console.log(data)
    }

    async componentDidUpdate(prevProps, prevState) {
        console.log("did update")
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await getExtraInforDoctorById(this.props.doctorId)
            console.log(data)
        }
    };

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor } = this.state;
        // console.log(this.props)

        return (
            <React.Fragment>
                <div className='doctor-extra-infor-container'>
                    <div className='content-up'>
                        <div className='text-address'>Địa chỉ khám</div>
                        <div>
                            <div className='name-clinic'>Phòng khám Chuyên khoa Da Liễu</div>
                            <div className='detail-address'>207 Phố Huế - Hai Bà Trưng - Hà Nội</div>
                        </div>
                    </div>
                    <div className='content-down'>
                        <div>
                            {isShowDetailInfor === false &&
                                <div className='short-infor'>GIÁ KHÁM: 250.000đ.
                                    <span onClick={() => this.showHideDetailInfor(true)}>
                                        Xem chi tiết
                                    </span>
                                </div>
                            }
                            {isShowDetailInfor === true &&
                                <>
                                    <div className='title-price'>GIÁ KHÁM:</div>
                                    <div className='detail-infor'>
                                        <div className='price'>
                                            <span className='left'>Giá khám</span>
                                            <span className='right'>250.000đ</span>
                                        </div>
                                        <div className='note'>Được ưu tiên khám trước khi đặt qua BookingCare. Giá khám cho người nước ngoài </div>
                                    </div>
                                    <div className='payment'>Người bệnh có thể thanh toán bằng tiền mặt và quẹt thẻ</div>
                                    <div className='hide-price'>
                                        <span onClick={() => this.showHideDetailInfor(false)}>
                                            Ẩn bảng giá
                                        </span>
                                    </div>
                                </>
                            }
                        </div>
                    </div>

                </div>
            </React.Fragment>
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
