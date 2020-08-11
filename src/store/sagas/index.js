import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../actionTypes";
import { fetchPostsSaga, fetchMyPostsSaga, deletePostSaga } from "./post";

export function* watchPosts() {
  yield takeEvery(actionTypes.FETCH_POSTS, fetchPostsSaga)
  yield takeEvery(actionTypes.FETCH_MY_POSTS, fetchMyPostsSaga)
  yield takeEvery(actionTypes.DELETE_POST, deletePostSaga)
}