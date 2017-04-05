import { combineReducers } from 'redux';
import * as Actions from '../actions';

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

const requestTest = createReducer([], {
  [Actions.REQUEST_TESTS](state, action) {
    return {
      items: action.items
    };
  }
});

const postsByOther = createReducer({}, {
  [Actions.REQUEST_POSTS](state) {
    return state;
  }
});

export default combineReducers({
  postsByOther,
  requestTest
});
