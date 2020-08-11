import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './style.css';
import { translate } from '../../utils/utils';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import { compose } from 'redux';

class Navigation extends Component {
  state = {
  }

  redirectToFeed = route => this.props.history.push("/feed/" + route);

  redirectToAuth = route => this.props.history.push("/auth/" + route);

  logout = () => {
    localStorage.removeItem('token');
    this.props.history.push("/feed/home");
  }



  render() {
    const { onLangSwitch, lang } = this.props;
    return (
      <div className='navigation'> 
        <div className='wrapper'>
          {
            localStorage.getItem('token') === null ? 
              <ul>
                <li onClick={() => this.redirectToFeed('home')}>{translate('home', lang)}</li>
              </ul>
            :
              <ul>
                <li onClick={() => this.redirectToFeed('home')}>{translate('home', lang)}</li>
                <li onClick={() => this.redirectToFeed('my-posts')}>{translate('my posts', lang)}</li>
                <li onClick={() => this.redirectToFeed('create-post')}>{translate('create post', lang)}</li>
                <li onClick={() => this.redirectToFeed('users')}>{translate('users', lang)}</li>
                <li onClick={() => this.redirectToFeed('my-profile')}>{translate('my profile', lang)}</li>
                <li onClick={() => this.redirectToFeed('chat')}>{translate('chat', lang)}</li>
              </ul>
          }
          <div className="dropdown">
            <button className="dropbtn">Language</button>
            <div className="dropdown-content">
              <li onClick={() => onLangSwitch('srb')}>Srpski</li>
              <li onClick={() => onLangSwitch('eng')}>English</li>
            </div>
          </div>
          {
            localStorage.getItem('token') === null ? 
            <ul>
              <li onClick={() => this.redirectToAuth('login')}>{translate('login', lang)}</li>
              <li onClick={() => this.redirectToAuth('register')}>{translate('register', lang)}</li>
            </ul>
            :
            <ul>
              <li onClick={this.logout}>{translate('logout', lang)}</li>
            </ul>
          }
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

const mapDispatchToProps = dispatch => {
  return {
      onLangSwitch: langName => dispatch(actions.langSwitch(langName)),
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Navigation);