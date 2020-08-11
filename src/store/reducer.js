import * as actionTypes from './actionTypes';
import { updateObject } from '../utils/utils';

const initialState = 
{
    lang: "srb",
    dataHome: {},
    dataMyPosts: []
}


const reducer = (state = initialState, action) => 
{
    switch ( action.type )
    {
        case actionTypes.LANG_SWITCH:
          return updateObject(state, {
            lang: action.lang
          });
        case actionTypes.FETCH_POSTS_SUCCESS:
          return updateObject(state, {
            dataHome: action.data
          });
        case actionTypes.FETCH_MY_POSTS_SUCCESS:
          return updateObject(state, {
            dataMyPosts: action.data.posts
          });
        // case actionTypes.CREATE_POST_SUCCESS:
        //   return updateObject(state, {
        //     dataMyPosts: action.data
        //   });
        case actionTypes.DELETE_POST_SUCCESS:
          const arr = state.dataMyPosts.filter(post => post._id !== action.postId.toString())
          console.log('niz', arr, action.postId);
          return updateObject(state, {
            dataMyPosts: arr
          });
        case actionTypes.SOCKET_CREATE_POST:
          console.log('pre create', state.dataHome);
          state.dataHome.posts.push(action.post);
          console.log('post create', state.dataHome);
          return updateObject(state, {
            dataHome: {...state.dataHome}
          })
        case actionTypes.SOCKET_DELETE_POST:
          const posts = state.dataHome.posts.filter(post => post._id.toString() !== action.postId.toString())
          console.log('delete post', posts)
          return updateObject(state, {
            dataHome: {...state.dataHome, posts}
          })
        case actionTypes.SOCKET_UPDATE_POST:
          console.log('update post', action)
          const updatedPosts = state.dataHome.posts.map(post => {
            if (post._id.toString() === action.updatedPost._id.toString()) {
              return action.updatedPost
            } else {
              return post
            }
          })
          return updateObject(state, {
            dataHome: {...state.dataHome, posts: updatedPosts}
          })
        default:
          return state;
    }
}

export default reducer;