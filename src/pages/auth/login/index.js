import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './style.css';
import { translate } from '../../../utils/utils';
import {connect} from 'react-redux';
import { compose } from 'redux';

class Login extends Component {
  state = { 
    email: '',
    password: ''
  }

  redirectToAuth = route => this.props.history.push("/auth/" + route);

  handleOnChange = (inputName, event) => this.setState({ [inputName]: event.target.value});

  login = async () => {
    try {
      const result = await axios.post('http://localhost:6060/auth/login', {
        email: this.state.email,
        password: this.state.password
      })
      console.log('pera', result)
      if (+result.status === 200) {
        this.setState({
          email: '',
          password: ''
        });
        localStorage.setItem('token', result.data.token);
        this.props.history.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { lang } = this.props;
    return (
      <div className="login">
        <div className="wrapper">
          <h2>{ translate('login', lang) }</h2>
          <label htmlFor="email">{ translate('e-mail', lang) }</label>
          <input 
            id="email" 
            type="email" 
            onChange={this.handleOnChange.bind(this, 'email')}
            value={this.state.email}
          />
          <label htmlFor="password">{ translate('password', lang) }</label>
          <input 
            id="password" 
            type="password" 
            onChange={this.handleOnChange.bind(this, 'password')}
            value={this.state.password}
          />
          <div className="links">
            <button onClick={() => this.redirectToAuth('reset-password')}>{ translate('reset password', lang) }</button>
            <button onClick={() => this.redirectToAuth('register')}>{ translate('register', lang) }</button>
          </div>
          <button onClick={this.login}>{ translate('login', lang) }</button>
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
)(Login);