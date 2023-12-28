import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';

class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: {},
            currentDoctorId: this.props.match.params.id
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            // this.setState({
            //     currentDoctorId: id
            // })
            let res = await getDetailInforDoctor(id)
            // console.log("check res: ", res)
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {

    };


    render() {
        // console.log(this.props.match.params.id)
        // console.log("this.state: ", this.state)
        let { detailDoctor } = this.state
        let { language } = this.props
        let nameVi = '', nameEn = ''

        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }

        return (
            <React.Fragment>
                <HomeHeader />
                <div className='detail-doctor-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'>
                            <div className='image-doctor'
                                style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}>
                            </div>
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {
                                    language === LANGUAGES.VI ? nameVi : nameEn
                                }
                            </div>
                            <div className='down'>
                                {detailDoctor && detailDoctor.Markdown &&
                                    detailDoctor.Markdown.description &&
                                    <span>
                                        {detailDoctor.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            {/* <DoctorSchedule doctorId={detailDoctor && detailDoctor.id ? detailDoctor.id : -1} /> */}
                            <DoctorSchedule doctorId={this.state.currentDoctorId} />
                            {/* currentDoctorId */}
                        </div>
                        <div className='content-right'>
                            <DoctorExtraInfor doctorId={this.state.currentDoctorId}/>
                        </div>
                    </div>
                    <div className='detail-infor-doctor'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>
                            </div>
                        }
                    </div>
                    <div className='comment-doctor'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
