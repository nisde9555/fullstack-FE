import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { compose } from 'redux';
import ReactTooltip from 'react-tooltip'

import './style.css';
import { translate } from '../../../utils/utils';
import Message from '../../../static/message.png';
import Edit from '../../../static/edit.png';

class User extends Component {
  state = { 
    firstName: '',
    lastName: '',
    email: '',
    owner: true
  }

  async componentDidMount() {
    console.log('caos', this.props.owner, window.location.pathname)
    if (window.location.pathname !== '/feed/my-profile') {
      this.setState({owner: false})
    }
    const token = localStorage.getItem('token');
    const userId = window.location.pathname.replace('/feed/user/', '');
    console.log('userId', userId)
    try {
      let response;
      if (this.props.owner) {
        response = await axios.get('http://localhost:6060/feed/my-profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      } else {
        response = await axios.get('http://localhost:6060/feed/user/' + userId, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      }
      if (response.data.owner) {
        this.props.history.push('/feed/my-profile');
      }
      this.setState({
        firstName: response.data.user.firstName, 
        lastName: response.data.user.lastName,
        email: response.data.user.email
      });
    } catch (error) {
      console.log('error', error)
      console.log('error status code', error.response);
      if (+error.response.status === 401) {
        localStorage.removeItem('token');
        this.props.history.push('/home');
      }
    }
  }

  async componentWillReceiveProps(nextProps){
    console.log('pera', nextProps.owner);
    if(nextProps.owner !== this.props.owner){
      this.setState({owner: nextProps.owner});
      try {
        const token = localStorage.getItem('token');
        if (nextProps.owner) {
          const response = await axios.get('http://localhost:6060/feed/my-profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          this.setState({
            firstName: response.data.user.firstName, 
            lastName: response.data.user.lastName,
            email: response.data.user.email
          });
        }
      } catch (error) {
        console.log('error', error)
        console.log('error status code', error.response);
        if (+error.response.status === 401) {
          localStorage.removeItem('token');
          this.props.history.push('/home');
        }
      }
    }
  }

  editProfile = () => {
    this.props.history.push('/feed/edit-profile/');
  }

  render() {
    const { lang } = this.props;
    return (
      <div className='user'>
        <div className='wrapper'>
          <h2>{this.state.firstName}{' ' + this.state.lastName}</h2>
          <img src="https://picsum.photos/200" alt="img" />
          <p>{this.state.email}</p>
          <div className="icons">
            {
              this.state.owner ?
              <img onClick={this.editProfile} data-tip={translate('edit', lang)} src={Edit} alt="icon" /> :
              <img data-tip={translate('send message', lang)} src={Message} alt="icon" />
            }
          </div>
          <ReactTooltip />
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
  connect(mapStateToProps, null)
)(User);