import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { requestSignPosts } from '../actions';
import Sign from '../components/Sign';

class App extends Component {
  static propTypes() {
    return {
      requestSignPosts: PropTypes.func.isRequired,
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
    this.props.requestSignPosts(fromData);
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
  requestSignPosts
})(App);
