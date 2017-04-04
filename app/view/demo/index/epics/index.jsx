import { combineEpics } from 'redux-observable';
import requestSelectSubreddit from './SelectSubreddit';

const epics = [
  requestSelectSubreddit
];

export default combineEpics(...epics);