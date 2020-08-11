import * as actionTypes from './actionTypes';

export const langSwitch = lang => {
  return {
    type: actionTypes.LANG_SWITCH,
    lang
  };
}

export const fetchPosts = page => {
  return {
    type: actionTypes.FETCH_POSTS,
    page
  }
}

export const fetchPostsSuccess = data => {
  return {
    type: actionTypes.FETCH_POSTS_SUCCESS,
    data
  }
}

export const fetchPostsFail = error => {
  return {
    type: actionTypes.FETCH_POSTS_FAIL,
    error
  }
}

export const fetchMyPosts = token => {
  return {
    type: actionTypes.FETCH_MY_POSTS,
    token
  }
}

export const fetchMyPostsSuccess = data => {
  return {
    type: actionTypes.FETCH_MY_POSTS_SUCCESS,
    data
  }
}

export const fetchMyPostsFail = error => {
  return {
    type: actionTypes.FETCH_MY_POSTS_FAIL,
    error
  }
}

export const createPost = token => {
  return {
    type: actionTypes.CREATE_POST,
    token
  }
}

export const createPostSuccess = data => {
  return {
    type: actionTypes.CREATE_POST_SUCCESS,
    data
  }
}

export const createPostFail = error => {
  return {
    type: actionTypes.CREATE_POST_FAIL,
    error
  }
}

export const deletePost = postId => {
  return {
    type: actionTypes.DELETE_POST,
    postId
  }
}

export const deletePostSuccess = postId => {
  return {
    type: actionTypes.DELETE_POST_SUCCESS,
    postId
  }
}

export const deletePostFail = error => {
  return {
    type: actionTypes.DELETE_POST_FAIL,
    error
  }
}

export const socketCreatePost = post => {
  return {
    type: actionTypes.SOCKET_CREATE_POST,
    post
  }
}

export const socketDeletePost = postId => {
  return {
    type: actionTypes.SOCKET_DELETE_POST,
    postId
  }
}

export const socketUpdatePost = updatedPost => {
  return {
    type: actionTypes.SOCKET_UPDATE_POST,
    updatedPost
  }
}