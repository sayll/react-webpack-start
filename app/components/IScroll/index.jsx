import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll'
import './style.pcss'

class IScroll extends Component {
  static propTypes = {
    onReset: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    options: PropTypes.object
  }
  static defaultProps = {
    options: {
      tap: true,
      click: true,
      disableTouch: false,
      disablePointer: true,
      disableMouse: true,
      mouseWheel: true,
      scrollY: true
    },
    onReset: () => {},
    onUpload: () => {}
  }

  constructor() {
    super()
    this.state = {
      isLoading: false
    }
  }

  onScrollEnd = e => {
    const { onReset, onUpload } = this.props
    if (e.startY > 50 || e.distY > 500) {
      this.setState({
        isLoading: true
      })
      onReset()
      setTimeout(() => {
        this.setState({
          isLoading: false
        })
      }, 1000)
    }
    else if (e.y - e.startY > 10 || e.y === e.maxScrollY) {
      onUpload()
    }
  }

  render() {
    const { isLoading } = this.state
    const { children, options } = this.props
    return (
      <div id="_iScroll">
        <ReactIScroll
          iScroll={iScroll}
          onScrollEnd={this.onScrollEnd}
          options={options}
          className={isLoading ? 'loading' : 'load'}
        >
          <div className="iScrollBox">
            {
              children
            }
          </div>
        </ReactIScroll>
      </div>
    )
  }
}

export default IScroll
