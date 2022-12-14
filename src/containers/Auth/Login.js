import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowpass: false,
            errMessage: ''
        }

    }


    handleOnChangeUsername = (event) => {

        this.setState({
            username: event.target.value
        })
    }
    handleOnChangePassword = (event) => {

        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('login succeeds')
            }
        } catch (error) {
            if (error) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }


        }

    }
    handleShowpass = (event) => {
        this.setState({
            isShowpass: !this.state.isShowpass
        })
    }
    render() {


        return (
            <div>
                <div className='login-background'>
                    <div className='login-container'>
                        <div className='login-content row'>
                            <div className='col-12 text-login'>Login</div>
                            <div className='col-12 form-group login-input'>
                                <label>Username</label>
                                <input type='text'
                                    className='form-control'
                                    placeholder='Enter your username'
                                    value={this.state.username}
                                    onChange={(event) => this.handleOnChangeUsername(event)}
                                />
                            </div>

                            <div className='col-12 form-group login-input'>
                                <label>Password</label>
                                <div className='custom'>
                                    <input type={this.state.isShowpass ? 'text' : 'password'}
                                        className='form-control'
                                        placeholder='Enter your password'
                                        onChange={(event) => this.handleOnChangePassword(event)}
                                    />
                                    <span onClick={(event) => this.handleShowpass(event)}>
                                        <i class={this.state.isShowpass ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                    </span>

                                </div>
                                <div className='col-12' style={{ color: 'red' }}>
                                    {this.state.errMessage}
                                </div>

                            </div>
                            <div className='col-12 '>
                                <button className='btn-login' onClick={(event) => this.handleLogin(event)}>Login</button>
                            </div>

                            <div className='col-12'>
                                <span className='forgot-password'>Forgot your password?</span>
                            </div>
                            <div className='col-12 text-center mt-3'>
                                <span>Or login with:</span>
                            </div>
                            <div className='col-12 social-login'>
                                <i class="fab fa-google"></i>
                                <i class="fab fa-facebook"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
