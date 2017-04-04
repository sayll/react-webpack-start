import { combineReducers } from 'redux';
// import { ajax } from 'rxjs/observable/dom/ajax.js';
import {
  REQUEST_POSTS,
  REQUEST_TESTS,
} from '../actions';

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return state;
    default:
      return state;
  }
}

function requestTest(state = {}, action) {
  switch (action.type) {
    case REQUEST_TESTS:
      return {
        items: action.items
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  requestTest
});

export default rootReducer;
