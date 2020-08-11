import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './style.css';
import { translate } from '../../../utils/utils';
import {connect} from 'react-redux';
import { compose } from 'redux';

class EditProfile extends Component {
  state = { 
    firstName: '',
    lastName: '',
    email: ''
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const postId = window.location.pathname.replace('/feed/edit-profile/', '');
    try {
      const response = await axios.get('http://localhost:6060/feed/user/' + postId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      this.setState({
        email: response.data.user.email, 
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName
      });
    } catch (error) {
      if (+error.response.status === 401) {
        localStorage.removeItem('token');
        this.props.history.push('/home');
      }
      console.log('error', error);
    } 
  }

  goBack = () => {
    this.props.history.goBack();
  }

  handleOnChange = (inputName, event) => this.setState({ [inputName]: event.target.value});

  clearField = () => this.setState({name: "", description: ""});

  saveChanges = async () => {
    const token = localStorage.getItem('token');
    const postId = window.location.pathname.replace('/feed/edit-profile/', '');
    try {
      await axios({
        method: 'put',
        url: 'http://localhost:6060/feed/user/' + postId,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          firstName: this.state.firstName,
          lastName: this.state.lastName
        }
      });
      this.props.history.push("/feed/my-profile");
    } catch (error) {
      if (+error.response.status === 401) {
        localStorage.removeItem('token');
        this.props.history.push('/home');
      }
      console.log(error)
    }
  }

  render() {
    const { lang } = this.props;
    return (
      <div className="edit-profile">
        <div className="wrapper">
          <h2>{ this.state.createPost ? translate('create post', lang) : translate('save post', lang) }</h2>
          <label htmlFor="firstName">{ translate('firstName', lang) }</label>
          <input 
            id="firstName" 
            type="firstName" 
            onChange={this.handleOnChange.bind(this, 'firstName')}
            value={this.state.firstName}
          />
          <label htmlFor="lastName">{ translate('lastName', lang) }</label>
          <input 
            id="lastName" 
            type="lastName" 
            onChange={this.handleOnChange.bind(this, 'lastName')}
            value={this.state.lastName}
          />
          <div className="buttons"> 
            <button onClick={this.saveChanges}>{ translate('edit profile', lang) }</button>
            <button onClick={this.clearField}>{ translate('clear', lang) }</button>
            <button onClick={this.goBack}>{ translate('back', lang) }</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      lang: state.lang,
      dataMyPosts: state.dataMyPosts
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(EditProfile);