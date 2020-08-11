import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'
import { withRouter } from 'react-router-dom';

import './style.css';
import Lookup from '../../static/lookup.png';
import Message from '../../static/message.png';
import User from '../../static/user.png';
import Delete from '../../static/delete.png';
import Edit from '../../static/edit.png';
import { translate } from '../../utils/utils';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import { compose } from 'redux';

class EditPost extends Component {
  state = {

  }

  editPost = postId => {
    this.props.history.push("/feed/edit-post/" + postId);
  }

  viewPost = postId => {
    this.props.history.push("/feed/post/" + postId);
  }

  viewCreator = userId => {
    this.props.history.push('/feed/user/' + userId);
  }

  render() {
    const { lang, onDeletePost } = this.props;
    return (
      <div className="post-card">
        <h2>{this.props.data.name}</h2>
        <img src="https://picsum.photos/200" alt="img" />
        <p>{this.props.data.description}</p>
        {
          this.props.owner ? 
            <div className="owner-icons">
              <img data-tip={translate('edit', lang)} onClick={() => this.editPost(this.props.data._id)} src={Edit} alt="icon" />
              <img data-tip={translate('delete', lang)} onClick={() => onDeletePost(this.props.data._id)} src={Delete} alt="icon" />
            </div>
          :
            <div className="icons">
              <img data-tip={translate('view post', lang)} onClick={() => this.viewPost(this.props.data._id)} src={Lookup} alt="icon" />
              <img data-tip={translate('send message', lang)} src={Message} alt="icon" />
              <img data-tip={translate('view creator', lang)} onClick={() => this.viewCreator(this.props.data.creator)} src={User} alt="icon" />
            </div>
        }
        <ReactTooltip />
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
)(EditPost);