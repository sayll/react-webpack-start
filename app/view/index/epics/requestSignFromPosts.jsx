import { Observable } from 'rxjs/Observable';
import * as Actions from '../actions';

Observable.of(1, 2).subscribe(console.log);

export default function requestSignFromPosts(action$, store, { getJSON }) {
  return action$.filter(action => action.type === Actions.REQUEST_POSTS)
    .switchMap(() =>
      getJSON('https://api.github.com/search/users?q=21')
        .map(res => ({
          items: res.items
        })))
    .map(res => ({
      type: Actions.REQUEST_TESTS,
      items: res.items
    }));
}

