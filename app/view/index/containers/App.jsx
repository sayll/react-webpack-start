import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { REQUEST_POSTS } from '../actions';
import Sign from '../components/Sign';

class App extends Component {
  static propTypes() {
    return {
      REQUEST_POSTS: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.fetchCode = this.fetchCode.bind(this);
    this.fetchSign = this.fetchSign.bind(this);
  }

  fetchCode(e) {
    console.log(e, this);
    return false;
  }

  fetchSign(fromData) {
    this.props.REQUEST_POSTS(fromData);
  }

  render() {
    return (
      <div>
        <Sign fetchCode={this.fetchCode} fetchSign={this.fetchSign} />
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, {
  REQUEST_POSTS
})(App);
