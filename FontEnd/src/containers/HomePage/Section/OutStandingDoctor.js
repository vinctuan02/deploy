import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../store/actions'
import { LANGUAGES } from '../../../utils/constant';
import { withRouter } from 'react-router';

// import { FormattedMessage } from 'react-intl';

import Slider from "react-slick"
import { FormattedMessage } from 'react-intl';



// import specialtyImg from '../../../assets/specialty/co-xuong-khop.jpeg'

class OutStandingDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: []
        }
    }

    componentDidUpdate(preProps, preState, snapshot) {
        if (preProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctor: this.props.topDoctorsRedux
            })
        }


    }

    componentDidMount() {
        this.props.loadTopDoctor()
    }


    handleViewDetailDoctor(doctor) {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
    render() {
        let arrDoctor = this.state.arrDoctor
        let { language } = this.props
        console.log("test language: ", language)
        console.log(LANGUAGES.VI, LANGUAGES.EN)
        // arrDoctor = arrDoctor.concat(arrDoctor).concat(arrDoctor)
        console.log('arrDoctor: ', arrDoctor)
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.oustanding-doctor" /></span>
                        <button className='button-section'><FormattedMessage id="homepage.more-infor" /></button>
                    </div>

                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {
                                arrDoctor.map((item, index) => {
                                    let imageBase64 = ''
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                                    let nameEn = `${item.positionData.valueEn},  ${item.firstName} ${item.lastName}`
                                    // let email = item.email
                                    console.log(item)
                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                            <div className='customize-boder'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-outstanding-doctor'
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    >
                                                    </div>
                                                </div>
                                                <div className='position text-center'>
                                                    <div>
                                                        {
                                                            language === LANGUAGES.VI ? nameVi : nameEn
                                                        }
                                                    </div>
                                                    <div>Cơ xương khớp</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
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
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(action.fetchTopDoctor()),
        changeLanguage: () => dispatch(action.changeLanguageApp())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
