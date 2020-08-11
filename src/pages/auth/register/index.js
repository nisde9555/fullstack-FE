import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './style.css';
import { translate } from '../../../utils/utils';
import {connect} from 'react-redux';
import { compose } from 'redux';

class Register extends Component {
  state = { 
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  redirectToAuth = route => this.props.history.push("/auth/" + route);

  handleOnChange = (inputName, event) => this.setState({ [inputName]: event.target.value});

  register = async () => {
    try {
      const result = await axios.post('http://localhost:6060/auth/register', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      });
      if (+result.status === 201) {
        this.setState({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        this.props.history.push("/auth/login")
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  render() {
    const { lang } = this.props;
    return (
      <div className="register">
        <div className="wrapper">
          <h2>{ translate('register', lang) }</h2>
          <label htmlFor="firstName">{ translate('first name', lang) }</label>
          <input 
            id="firstName" 
            type="text" 
            onChange={this.handleOnChange.bind(this, 'firstName')}
            value={this.firstName}
          />
          <label htmlFor="lastName">{ translate('last name', lang) }</label>
          <input 
            id="lastName" 
            type="text" 
            onChange={this.handleOnChange.bind(this, 'lastName')}
            value={this.lastName}
          />
          <label htmlFor="email">{ translate('e-mail', lang) }</label>
          <input 
            id="email" 
            type="email" 
            onChange={this.handleOnChange.bind(this, 'email')}
            value={this.email}
          />
          <label htmlFor="password">{ translate('password', lang) }</label>
          <input 
            id="password" 
            type="password" 
            onChange={this.handleOnChange.bind(this, 'password')}
            value={this.password}
          />
          <label htmlFor="confirmPassword">{ translate('confirm password', lang) }</label>
          <input 
            id="confirmPassword" 
            type="password" 
            onChange={this.handleOnChange.bind(this, 'confirmPassword')}
            value={this.confirmPassword}
          />
          <div className="links">
            <button onClick={() => this.redirectToAuth('login')}>{ translate('login', lang) }</button>
          </div>
          <button onClick={this.register}>{ translate('register', lang) }</button>
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
)(Register);