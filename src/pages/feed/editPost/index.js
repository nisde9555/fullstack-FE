import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './style.css';
import { translate } from '../../../utils/utils';
import {connect} from 'react-redux';
import { compose } from 'redux';

class Login extends Component {
  state = { 
    name: '',
    description: '',
    createPost: true
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    if (window.location.pathname !== '/feed/create-post') {
      this.setState({createPost: false})
      const postId = window.location.pathname.replace('/feed/edit-post/', '');
      try {
        const response = await axios.get('http://localhost:6060/feed/post/' + postId, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.setState({name: response.data.post.name, description: response.data.post.description});
      } catch (error) {
        if (+error.response.status === 401) {
          localStorage.removeItem('token');
          this.props.history.push('/home');
        }
        console.log('error', error);
      } 
    }
  }

  componentWillReceiveProps(nextProps){
    console.log('perica', nextProps.createPost)
    if(nextProps.createPost !== this.props.createPost){
      this.setState({createPost: nextProps.createPost});
    }
  }

  goBack = () => {
    this.props.history.goBack();
  }

  handleOnChange = (inputName, event) => this.setState({ [inputName]: event.target.value});

  clearField = () => this.setState({name: "", description: ""});

  createPost = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios({
        method: 'post',
        url: 'http://localhost:6060/feed/post',
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          name: this.state.name,
          description: this.state.description
        }
      });
      this.props.history.push("/feed/my-posts");
    } catch (error) {
      if (+error.response.status === 401) {
        localStorage.removeItem('token');
        this.props.history.push('/home');
      }
      console.log(error)
    }
  }

  savePost = async () => {
    const token = localStorage.getItem('token');
    const postId = window.location.pathname.replace('/feed/edit-post/', '');
    try {
      await axios({
        method: 'put',
        url: 'http://localhost:6060/feed/post/' + postId,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          name: this.state.name,
          description: this.state.description
        }
      });
      this.props.history.push("/feed/my-posts");
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
      <div className="edit-post">
        <div className="wrapper">
          <h2>{ this.state.createPost ? translate('create post', lang) : translate('save post', lang) }</h2>
          <label htmlFor="name">{ translate('name', lang) }</label>
          <input 
            id="name" 
            type="name" 
            onChange={this.handleOnChange.bind(this, 'name')}
            value={this.state.name}
          />
          <label htmlFor="description">{ translate('description', lang) }</label>
          <input 
            id="description" 
            type="description" 
            onChange={this.handleOnChange.bind(this, 'description')}
            value={this.state.description}
          />
          {
            this.state.createPost ?
              <div className="buttons"> 
                <button onClick={this.createPost}>{ translate('create post', lang) }</button>
                <button onClick={this.clearField}>{ translate('clear', lang) }</button>
                <button onClick={this.goBack}>{ translate('back', lang) }</button>
              </div>
            :
              <div className="buttons"> 
                <button onClick={this.savePost}>{ translate('save post', lang) }</button>
                <button onClick={this.clearField}>{ translate('clear', lang) }</button>
                <button onClick={this.goBack}>{ translate('back', lang) }</button>
              </div>
          }
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
)(Login);