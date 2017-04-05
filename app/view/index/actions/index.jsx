import { createAction, createActions } from 'redux-actions';

export const REQUEST_TESTS = createAction('REQUEST_TESTS', amount => amount);
export const REQUEST_POSTS = createAction('REQUEST_POSTS', amount => amount);

export const { actionOne, actionTwo, actionThree } = createActions({
  ACTION_ONE: (key, value) => ({ [key]: value }),

  ACTION_TWO: [
    first => [first],
    (first, second) => ({ second })
  ],
}, 'ACTION_THREE');
console.log(actionTwo([1, 2, 3], 'a', 2));
