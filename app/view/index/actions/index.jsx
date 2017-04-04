export const REQUEST_TESTS = 'REQUEST_TESTS';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export function requestSignPosts(signFrom) {
  return {
    type: REQUEST_POSTS,
    signFrom
  };
}

export function requestTest(signFrom) {
  return {
    type: REQUEST_TESTS,
    signFrom
  };
}

