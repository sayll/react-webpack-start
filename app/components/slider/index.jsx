import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './slider.pcss'

class Slider extends Component {
  static propTypes = {
    auto: PropTypes.bool,
    speed: PropTypes.number,
    lazy: PropTypes.bool,
    callback: PropTypes.func,
    //dots: PropTypes.bool,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    auto: true,
    speed: 3000,
    lazy: true,
    callback: (...props) => {
      console.log(...props)
    }
    // dots: true
  }

  constructor(...props) {
    super(...props)
    const { children } = this.props

    this.state = {
      renderData: [],
      currentIndex: 0,
      w: 0,
      total: children.length || 1,
      startX: 0,
      curX: 0,
      canDrag: false,
      isBusy: false,
      timer: false
    }
  }

  componentDidMount() {
    const { renderData, curX } = this.state
    const { lazy, auto } = this.props
    // 初始化宽度
    const slideWidth = this.componentSlider.offsetWidth
    this.state.w = slideWidth
    this.sliderWrapper.style.width = `${renderData.length * slideWidth}px`
    // 自动轮播
    if (auto) {
      this.auto()
    }
    // 非懒加载
    if (!lazy) {
      this.state.currentIndex = 1
    }
    this.state.curX = curX - slideWidth
    this.setTransition(this.sliderWrapper, this.state.curX, false)
    // this.setState(this.state)
  }

  /**
   * 设置动画
   * @param {EventTarget|HTMLElement} dom - 动画节点
   * @param {number} x - 移动的x轴距离
   * @param {boolean} animate - 是否启动动画
   * @param {function|boolean} func - 回调方法
   * */
  setTransition = (dom, x, animate = false, func = false) => {
    const rn = Date.now().toString(32)
    window[rn] = () => {
      dom.removeEventListener('webkitTransitionEnd', window[rn], false)
      delete window[rn]
      func && func()
    }
    dom.addEventListener('webkitTransitionEnd', window[rn], false)
    dom.style.webkitTransform = `translate3d(${x}px, 0, 0)`
    // 是否存在动画
    if (animate) {
      dom.style.webkitTransition = 'all 0.6s ease'
    }
    else {
      dom.style.webkitTransition = 'all 0s ease'
    }
  }

  auto = () => {
    const { speed } = this.props
    const { timer } = this.state
    const time = speed || 3000
    // 重制定时器
    if (timer) {
      clearTimeout(timer)
    }
    this.state.timer = setTimeout(() => {
      this.next(this.auto)
    }, time)
  }

  createLoadRenderData = () => {
    const { total } = this.state
    const { children: cld } = this.props
    if (total) {
      // 轮播数据
      if (total > 2) {
        this.state.renderData = [cld[total - 1], ...cld, cld[0]]
      }
      else if (total === 2) {
        this.state.renderData = [cld[1], cld[0], cld[1], cld[0]]
      }
      else {
        this.state.renderData = [cld, cld, cld]
      }
    }
  }

  createLazyRenderData = () => {
    const { total, currentIndex } = this.state
    const { children: cld } = this.props
    if (total) {
      let left
      let right
      // 轮播页码
      if (total > 2) {
        if (currentIndex === 0) {
          left = total - 1
          right = 1
        }
        else if (currentIndex === total - 1) {
          left = total - 2
          right = 0
        }
        else {
          left = currentIndex - 1
          right = currentIndex + 1
        }
      }
      else {
        /*eslint no-lonely-if: "off"*/
        if (currentIndex === 0) {
          left = 1
          right = 1
        }
        else if (currentIndex === 1) {
          left = 0
          right = 0
        }
      }

      // 轮播数据
      if (total > 1) {
        this.state.renderData = [cld[left], cld[currentIndex], cld[right]]
      }
      else {
        this.state.renderData = [cld, cld, cld]
      }
    }
  }

  touchStart = e => {
    const { isBusy, timer } = this.state
    // 等待检验
    if (isBusy) return
    // 初始化数据，并禁用定时器
    const eTouch = e.targetTouches[0]
    this.state.startX = eTouch.pageX
    this.state.canDrag = true
    if (timer) {
      clearTimeout(timer)
    }
    return false
  }

  touchMove = e => {
    const { canDrag, startX } = this.state
    if (canDrag) {
      const eTouch = e.changedTouches[0]
      this.draw(eTouch.pageX - startX)
    }
    return false
  }

  touchEnd = e => {
    const { auto } = this.props
    const { canDrag, startX, w, isBusy } = this.state
    // isBusy 消除移动中的点击带来的副作用
    if (canDrag && isBusy) {
      this.state.canDrag = false
      const eTouch = e.changedTouches[0]
      const offX = eTouch.pageX - startX
      // 有效范围，进行翻页
      if (Math.abs(offX) > w / 6) {
        if (offX > 0) {
          this.prev(() => {
            auto && this.auto()
          })
        }
        else {
          this.next(() => {
            auto && this.auto()
          })
        }
      }
      else {
        this.draw(0, true)
      }
    }
    auto && this.auto()
    return false
  }
  // 翻页
  prev = func => {
    const { lazy, callback } = this.props

    if (this.hasPrev()) {
      this.draw(this.state.w, true, () => {
        this.subCurrentIndex()
        callback(lazy ? this.state.currentIndex : this.state.currentIndex - 1)
        if (lazy) {
          this.setState(this.state)
        }
        // this.drawPagination()
        func && func()
      })
    }
    else {
      this.draw(0, true)
    }
  }

  next = func => {
    const { lazy, auto, callback } = this.props

    if (this.hasNext()) {
      this.draw(-this.state.w, true, () => {
        this.addCurrentIndex()
        callback(lazy ? this.state.currentIndex : this.state.currentIndex - 1)
        if (lazy) {
          this.setState(this.state)
        }
        // this.drawPagination()
        func && func()
      })
    }
    else {
      /*eslint no-lonely-if: "off"*/
      // 自动播放回滚首图
      if (auto) {
        this.state.currentIndex = 1
        this.state.curX = 0
        if (lazy) {
          this.setState(this.state)
        }
        this.draw(0, true, () => {
          func && func()
          callback(lazy ? this.state.currentIndex : this.state.currentIndex - 1)
        })
      }
      else {
        this.draw(0, true)
      }
    }
  }

  addCurrentIndex = () => {
    const { lazy } = this.props
    const { currentIndex, total, w } = this.state
    if (lazy) {
      // 设置页码
      if (currentIndex >= total - 1) {
        this.state.currentIndex = 0
      }
      else {
        this.state.currentIndex += 1
      }
      // 移动视图
      this.state.curX = -w
      this.setTransition(this.sliderWrapper, this.state.curX, false)
    }
    else {
      console.log(currentIndex, total)
      // 设置页码
      if (currentIndex >= total) {
        this.state.currentIndex = 1
        this.state.curX = -w
      }
      else {
        this.state.currentIndex += 1
        this.state.curX -= w
      }
      this.setTransition(this.sliderWrapper, this.state.curX, false)
    }
  }

  subCurrentIndex = () => {
    const { lazy } = this.props
    const { currentIndex, renderData, total, w } = this.state
    if (lazy) {
      if (currentIndex === 0) {
        this.state.currentIndex = total - 1
      }
      else {
        this.state.currentIndex -= 1
      }
      this.state.curX = -w
      this.setTransition(this.sliderWrapper, this.state.curX, false)
    }
    else {
      if (currentIndex === 1) {
        this.state.currentIndex = renderData.length - 2
        this.state.curX = -this.state.currentIndex * w
      }
      else {
        this.state.currentIndex -= 1
        this.state.curX += w
      }
      this.setTransition(this.sliderWrapper, this.state.curX, false)
    }
  }
  // 暂无新增功能（如loop）
  hasNext = () => (true)
  hasPrev = () => (true)

  /**
   * 拖拉轮播容器
   * @param {number} offset - x移动的距离
   * @param {boolean} animate - 是否启动动画
   * @param {function|boolean} func - 回调方法
   * */
  draw = (offset, animate = false, func = false) => {
    this.state.isBusy = true
    // 拖拽移动
    this.setTransition(
      this.sliderWrapper,
      this.state.curX + offset,
      animate,
      () => {
        this.state.isBusy = false
        func && func()
      }
    )
  }

  /*drawPagination = () => {
    // const {total} = this.state
    let items = this.sliderWrapper.querySelectorAll('.slider-item');
    items = Array.prototype.slice.call(items);
    if (this.props.dots) {
      const pager = this.sliderWPager
      const locators = []
      for (let i = 0; i < this.state.total; i++) {
        let span, idx
        if (this.props.lazy) {
          idx = i - 1
        }
        else {
          idx = i
        }
        if (this.state.currentIndex === idx) {
          span = '<span class="active"></span>'
        }
        else {
          span = '<span></span>'
        }
        locators.push(span)
      }
      pager.innerHTML = locators.join('')
      console.log(pager)
    }
  }*/

  render() {
    const { lazy } = this.props
    if (lazy) {
      this.createLazyRenderData()
    }
    else {
      this.createLoadRenderData()
    }
    const { renderData } = this.state
    if (renderData && renderData.length > 0) {
      return (
        <div
          className="component-slider"
          ref={e => { this.componentSlider = e }}
          onTouchStart={this.touchStart}
          onTouchMove={this.touchMove}
          onTouchEnd={this.touchEnd}
        >
          <div
            className="slider-wrapper"
            ref={e => { this.sliderWrapper = e }}
          >
            {
              renderData.map(item => (
                <div key={item.key} className="slider-item">{item}</div>
              ))
            }
          </div>
          <div
            className="slider-pagination"
            ref={e => { this.sliderWPager = e }}
          />
        </div>
      )
    }
    return (<div>loading</div>)
  }
}

export default Slider
