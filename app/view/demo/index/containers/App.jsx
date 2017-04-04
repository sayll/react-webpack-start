import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectSubreddit, requestSelectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

class App extends Component {
  static propTypes() {
    return {
      selectedSubreddit: PropTypes.string.isRequired,
      posts: PropTypes.array.isRequired,
      isFetching: PropTypes.bool.isRequired,
      lastUpdated: PropTypes.number,
      dispatch: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() { // 完成装载加载一次
    const { requestSelectSubreddit, selectedSubreddit } = this.props;
    requestSelectSubreddit(selectedSubreddit);
  }

  componentWillReceiveProps(nextProps) { // 切换选项卡加载一次
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { requestSelectSubreddit, selectedSubreddit } = nextProps;
      requestSelectSubreddit(selectedSubreddit);
    }
  }

  handleChange(nextSubreddit) { // 切换选项卡
    this.props.selectSubreddit(nextSubreddit);
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;

    return (
      <div>
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={['reactjs', 'frontend']}
        />
        <p>
          {lastUpdated &&
          <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}</span>
          }

          {!isFetching &&
          <a href="#1" onClick={this.handleRefreshClick}>Refresh</a>
          }
        </p>

        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {posts.length > 0 &&
        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
          <Posts posts={posts} />
        </div>
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectSubreddit,
    fetchPostsIfNeeded,
    invalidateSubreddit
  }
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state;
  return {
    selectedSubreddit
  };
}

export default connect(mapStateToProps, {
  selectSubreddit,
  requestSelectSubreddit
})(App);
