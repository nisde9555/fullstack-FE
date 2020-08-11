import axios from 'axios';

import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import history from '../../history';

export function* fetchPostsSaga(action) {
  try {
    let response;
    if (action.page) {
      response = yield axios.get('http://localhost:6060/home?page=' + action.page)
    } else {
      response = yield axios.get('http://localhost:6060/home')
    }
    yield put(actions.fetchPostsSuccess(response.data));
  } catch (error) {
    console.log('error', error);
    yield put(actions.fetchPostsFail(error))
  }
}

export function* fetchMyPostsSaga(action) {
  try {
    const response = yield axios.get('http://localhost:6060/feed/posts', {
      headers: {
        Authorization: `Bearer ${action.token}`
      }
    })
    yield put(actions.fetchMyPostsSuccess(response.data));
  } catch (error) {
    if (+error.response.status === 401) {
      localStorage.removeItem('token');
      history.push('/home');
    }
    console.log('error', error);
    yield put (actions.fetchMyPostsFail(error))
  }
}

export function* deletePostSaga(action) {
  try {
    const token = localStorage.getItem('token');
    const postId = action.postId;
    const response = yield axios({
      method: 'delete',
      url: 'http://localhost:6060/feed/post/' + postId,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('cao', response);
    yield put(actions.deletePostSuccess(postId));
  } catch (error) {
    if (+error.response.status === 401) {
      localStorage.removeItem('token');
      history.push('/home');
    }
    console.log('error', error);
    yield put (actions.deletePostFail(error))
  }
}