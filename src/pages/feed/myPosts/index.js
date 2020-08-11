import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './style.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import { compose } from 'redux';
import Post from "../../../components/post/index";

class MyPosts extends Component {
  state = { 

  }

  async componentDidMount() {
    const token = await localStorage.getItem('token');
    await this.props.onFetchMyPosts(token);
  }

  render() {
    const { data } = this.props;
    return (
      <div className="my-posts">
        <div className="wrapper">
          {(data || []).map(post => {
            return <Post key={post._id} data={post} owner={true}/>
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      lang: state.lang,
      data: state.dataMyPosts
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onFetchMyPosts: token => dispatch(actions.fetchMyPosts(token))
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MyPosts);