import { combineEpics } from 'redux-observable';
import requestSignFromPosts from './requestSignFromPosts';

const epics = [
  requestSignFromPosts,
];

export default combineEpics(...epics);
