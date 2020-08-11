import React, { Component } from 'react';
import axios from 'axios';
import ReactTooltip from 'react-tooltip'
import { withRouter } from 'react-router-dom';

import './style.css';
import * as actions from '../../../store/actions';
import { translate } from '../../../utils/utils';
import {connect} from 'react-redux';
import { compose } from 'redux';
import Message from '../../../static/message.png';
import User from '../../../static/user.png';
import Delete from '../../../static/delete.png';
import Edit from '../../../static/edit.png';

class Post extends Component {
  state = { 
    name: '',
    description: '',
    creator: ''
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const postId = window.location.pathname.replace('/feed/post/', '');
    console.log('postId', postId);
    try {
      const response = await axios.get('http://localhost:6060/feed/post/' + postId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('creator', response.data.post)
      this.setState({
        name: response.data.post.name, 
        description: response.data.post.description,
        creator: response.data.post.creator,
        owner: response.data.owner,
        id: response.data.post._id
      });
    } catch (error) {
      console.log('error', error.response);
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

  editPost = postId => {
    this.props.history.push("/feed/edit-post/" + postId);
  }

  render() {
    const { lang, onDeletePost } = this.props;
    console.log('props', this.props)
    return (
      <div className="post">
        <div className="wrapper">
          <h2>{this.state.name}</h2>
          <img src="https://picsum.photos/200" alt="img" />
          <p>{this.state.description}</p>
            {
              this.state.owner ?
                <div className="icons">
                  <img data-tip={translate('edit', lang)} onClick={() => this.editPost(this.props.data?._id || this.state.id)} src={Edit} alt="icon" />
                  <img data-tip={translate('delete', lang)} onClick={() => onDeletePost(this.props.data._id || this.state.id)} src={Delete} alt="icon" />
                </div>
              :
                <div className="icons">
                  <img data-tip={translate('send message', lang)} src={Message} alt="icon" />
                  <img data-tip={translate('view creator', lang)} onClick={() => this.viewUser(this.state.creator)} src={User} alt="icon" />  
                </div>
            }
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


const mapDispatchToProps = dispatch => {
  return {
      onDeletePost: postId => dispatch(actions.deletePost(postId)),
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Post);