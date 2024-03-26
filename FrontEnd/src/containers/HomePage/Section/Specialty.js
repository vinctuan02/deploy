import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'

// import { FormattedMessage } from 'react-intl';

import Slider from "react-slick"

// import specialtyImg from '../../../assets/specialty/co-xuong-khop.jpeg'

class Specialty extends Component {

    render() {
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='button-section'>Xem thêm</button>
                    </div>

                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'></div>
                                <div>Cơ xương khớp</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty2'></div>
                                <div>Cơ xương thần kinh</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty3'></div>
                                <div>Cơ xương tiêu hoá</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty4'></div>
                                <div>Cơ xương tim mạch</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty2'></div>
                                <div>Cơ xương tai mũi họng</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty3'></div>
                                <div>Cơ xương khớp 1</div>
                            </div>
                        </Slider>
                    </div>

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
