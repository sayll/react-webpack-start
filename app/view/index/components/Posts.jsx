import React, { PropTypes } from 'react';

function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post, i) =>
        <li key={i}>{post.title}</li>
      )}
    </ul>
  );
}

Posts.propTypes = {
  posts: PropTypes.arrayOf.isRequired
};

export default Posts;
