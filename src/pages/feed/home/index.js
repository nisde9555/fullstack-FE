import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';

// import { translate } from '../../utils/utils';
import './style.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import { compose } from 'redux';
import Post from "../../../components/post/index";

class Home extends Component {
  state = {

  }

  componentDidMount() {
    const pageNumber = +window.location.href.split('=')[1] || 1;
    this.props.onFetchPosts(pageNumber);
    const socket = io('http://localhost:6060');
    socket.on('posts', data => {
      console.log('componentdidmount', data);
      if (data.action === 'create') {
        console.log('io', data);
        this.props.onSocketCreatePost(data.post);
      } else if (data.action === 'delete') {
        this.props.onSocketDeletePost(data.postId);
      } else if (data.action === 'updatePost') {
        this.props.onSocketUpdatePost(data.updatedPost);
      }
    })
  }

  pagination = pageNumber => {
    this.props.onFetchPosts(pageNumber);
    this.props.history.push("/home?page=" + pageNumber);
  }

  render() {
    const { data } = this.props;
    console.log('provera', data)
    return (
      <div className="home">
        <div className="wrapper">
          {(data.posts || []).map(post => {
            return <Post key={post._id} data={post}/>
          })}
        </div>
        <div className="actions">
          {
            data.previous ? <button onClick={() => this.pagination(data.previous)}>Previous page</button> : null
          }
          {
            data.next ? <button onClick={() => this.pagination(data.next)}>Next page</button> : null
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      lang: state.lang,
      data: state.dataHome
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onFetchPosts: page => dispatch(actions.fetchPosts(page)),
      onSocketCreatePost: post => dispatch(actions.socketCreatePost(post)),
      onSocketDeletePost: postId => dispatch(actions.socketDeletePost(postId)),
      onSocketUpdatePost: updatedPost => dispatch(actions.socketUpdatePost(updatedPost))
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Home);