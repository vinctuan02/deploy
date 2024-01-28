import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant';
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService'

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

    render() {
        // console.log("this.state: ", this.state)
        let { dataProfile } = this.state
        let { language } = this.props

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
                                {dataProfile && dataProfile.Markdown &&
                                    dataProfile.Markdown.description &&
                                    <span>
                                        {dataProfile.Markdown.description}
                                    </span>
                                }
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
