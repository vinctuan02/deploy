import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from '../../services/userService'
import './VerifyEmail.scss'
import HomeHeader from '../HomePage/HomeHeader';
class VerifyEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusVerify: '',
            errCode: 0
        }
    }

    async componentDidMount() {
        let urlParams = new URLSearchParams(this.props.location.search)
        let token = urlParams.get('token')
        let doctorId = urlParams.get('doctorId')
        // console.log("token: ", token, doctorId)
        let res = await postVerifyBookAppointment({
            token: token,
            doctorId: doctorId
        })
        console.log("res: ", res)

        if (res) {
            this.setState({
                statusVerify: res.errMessage,
                errCode: res.errCode
            })
        }
    }

    async componentDidUpdate(prevProps, prevState) {

    };


    render() {
        // console.log("this.props: ", this.props)
        let { statusVerify, errCode } = this.state
        return (
            <React.Fragment>
                <HomeHeader />
                <div className='container-verify-email'>
                    {statusVerify}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
