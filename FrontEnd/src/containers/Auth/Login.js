import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';
// import { userLoginSuccess } from '../../store/actions/userActions'



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errMessage: ''
        }
    }

    handleOnChangeInputUserName = (event) => {
        this.setState({
            username: event.target.value
        })
        // console.log(event.target.value)
    }

    handleOnChangeInputPassWord = (event) => {
        this.setState({
            password: event.target.value
        })
        // console.log(event.target.value)
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            } else {
                this.props.userLoginSuccess(data.userData.user)
                console.log('Login sucsseeds....')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log(this.state.errMessage)
        }
    }

    handleKeyDown = (event) => {
        // console.log("event: ", event)
        if (event.keyCode === 13) {
            this.handleLogin()
        }
    }

    render() {
        return (
            <>
                <div className='login-background'>
                    <div className='login-container'>
                        <div className='login-content row'>
                            <div className='col-12 text-login'>Login</div>
                            <div className='col-12 form-group login-input'>
                                <label>User Name</label>
                                <input
                                    type='text' className='form-control' placeholder='Enter you User Name'
                                    value={this.state.username}
                                    onChange={(event) => this.handleOnChangeInputUserName(event)}
                                />
                            </div>
                            <div className='col-12 form-group login-input'>
                                <label>Password</label>
                                <input type='password' className='form-control' placeholder='Enter your Password'
                                    onChange={(event) => this.handleOnChangeInputPassWord(event)}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                            </div>
                            <div className='col-12' style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>
                            <div className='col-12' >
                                <button className='btn-login' onClick={() => this.handleLogin()}>Login</button>
                            </div>
                            <div className='col-12'>
                                <span className='forgot-password'>
                                    <a href='http://localhost:3000/create-user'>Create New User</a>
                                </span>
                            </div>
                            <div className='col-12'>
                                <span className='forgot-password'>
                                    <a href='http://localhost:3000/login'>Forgot your password</a>
                                </span>
                            </div>
                            <div className='col-12 text-center'>
                                <span className='text-other-login'>Or login with</span>
                            </div>
                            <div className='col-12 social-login'>
                                <i className="fab fa-google-plus-g"></i>
                                <i className="fab fa-facebook-f"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        // user: state.user.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
