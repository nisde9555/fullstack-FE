import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './style.css';
import { translate } from '../../../utils/utils';
import {connect} from 'react-redux';
import { compose } from 'redux';

class ResetPassword extends Component {
  state = { 
    email: '',
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: ''
  }

  redirectToAuth = route => this.props.history.push("/auth/" + route);

  handleOnChange = (inputName, event) => this.setState({ [inputName]: event.target.value});

  resetPassword = async () => {
    try {
      const result = await axios.put('http://localhost:6060/auth/password/reset', {
        email: this.state.email,
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
        newPasswordConfirm: this.state.newPasswordConfirm
      })
      console.log('perica', result)
      if (+result.status === 200) {
        this.setState({
          email: '',
          oldPassword: '',
          newPassword: '',
          newPasswordConfirm: ''
        });
        this.props.history.push("/auth/login")
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { lang } = this.props;
    return (
      <div className="reset-password">
        <div className="wrapper">
          <h2>{ translate('reset password', lang) }</h2>
          <label htmlFor="email">{ translate('e-mail', lang) }</label>
          <input 
            id="email" 
            type="email" 
            onChange={this.handleOnChange.bind(this, 'email')}
            value={this.email}
          />
          <label htmlFor="oldPassword">{ translate('old password', lang) }</label>
          <input 
            id="oldPassword" 
            type="password" 
            onChange={this.handleOnChange.bind(this, 'oldPassword')}
            value={this.oldPassword}
          />
          <label htmlFor="newPassword">{ translate('new password', lang) }</label>
          <input 
            id="newPassword" 
            type="password" 
            onChange={this.handleOnChange.bind(this, 'newPassword')}
            value={this.newPassword}
          />
          <label htmlFor="newPasswordConfirm">{ translate('confirm new password', lang) }</label>
          <input 
            id="newPasswordConfirm" 
            type="password"
            onChange={this.handleOnChange.bind(this, 'newPasswordConfirm')}
            value={this.newPasswordConfirm}
          />
          <div className="links">
            <button onClick={() => this.redirectToAuth('login')}>{ translate('login', lang) }</button>
          </div>
          <button onClick={this.resetPassword}>{ translate('Reset Password', lang) }</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      lang: state.lang
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ResetPassword);