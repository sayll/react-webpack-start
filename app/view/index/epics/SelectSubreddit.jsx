import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/Observable/dom/ajax';
import * as Actions from '../actions';

export default function requestSelectSubreddit(action$) {
  return action$.ofType(Actions.REQUEST_SELECT_SUBREDDIT)
    .map(action => action.subreddit)
    .switchMap(q =>
      Observable.timer(1000) // debounce
        .mergeMap(() =>  ajax({
          method: 'GET',
          url : `https://api.github.com/search/users?q=1`
        })
          .map(res => {
            return {
              type: q,
              item: res.response.items
            };
          }))
    );
}
