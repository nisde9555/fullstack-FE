import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";

import './style.css';
import User from '../../../components/user/index';

class Users extends Component {
  state = { 
    users: ''
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    try {
      const users = await axios.get('http://localhost:6060/feed/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      this.setState({users: users.data.users});
    } catch (error) {
      if (+error.response.status === 401) {
        localStorage.removeItem('token');
        this.props.history.push('/home');
      }
    }
  }

  viewUser = userId => {
    console.log('cao', userId);
    this.props.history.push('/feed/user/' + userId);
  }

  render() {
    return (
      <div className="users">
        <div className="wrapper">
          {(this.state.users || []).map(user => {
            return <User key={user._id} data={user} viewUser={this.viewUser} id={user._id}/>
          })}
        </div>
      </div>
    )
  }
}

export default withRouter(Users);