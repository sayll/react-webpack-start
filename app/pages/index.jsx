import React from 'react'
import { hot } from 'react-hot-loader'
import './style.scss'

class App extends React.Component {
  state = {
    file: null,
    reader: new FileReader()
  }

  componentDidMount() {
    const { reader } = this.state
    // 初始化 Drop
    this.handleDrop()

    this.$input.addEventListener('change', () => {
      console.log(this.$input.files)
      const img = document.createElement('img')
      const file = this.$input.files[0]
      img.file = file
      img.width = 200
      this.$imgBox.appendChild(img)
      reader.onload = e => {
        img.src = e.target.result
        console.log(1)
      }
      reader.readAsDataURL(file)
    })

    // 读取进度
    reader.addEventListener('progress', e => {
      console.log(e)
    })
  }

  onClickFileSlice = e => {
    const { reader } = this.state
    const file = this.$input.files[0]
    const { start, end } = e.target.dataset
    const blob = this.handleBlobSlice(file, start, end)
    reader.readAsBinaryString(blob)
  }

  // 分割 Blob
  handleBlobSlice = (file, s, e) => {
    console.log(file)
    if (file['webkitSlice']) {
      console.log('webkitSlice')
      return file['webkitSlice'](s, e)
    } else if (file['mozSlice']) {
      console.log('mozSlice')
      return file['mozSlice'](s, e)
    } else {
      return file.slice(s, e)
    }
  }

  // 拖入文件读取
  handleDrop = () => {
    function preventDrag(e) {
      e.stopPropagation()
      e.preventDefault()
    }

    this.$dropBox.addEventListener('dragover', preventDrag, false)
    this.$dropBox.addEventListener('dragenter', preventDrag, false)
    this.$dropBox.addEventListener('drop', function (e) {
      e.stopPropagation()
      e.preventDefault()
      const dt = e.dataTransfer
      const files = dt.files
      console.log(files.item(0))
    })
  }

  render() {
    return (
      <React.Fragment>
        <div
          styleName="box"
          ref={e => (this.$dropBox = e)}
          onClick={() => this.$input.click()}
        />
        <input type="button" data-start="0" data-end="5" value="0-5" onClick={this.onClickFileSlice} />
        <input type="button" data-start="0" data-end="0" value="完整" onClick={this.onClickFileSlice} />
        <input
          multiple
          type="file"
          directory="true"
          webkitdirectory="true"
          name="文件上传"
          ref={e => (this.$input = e)}
        />
        <div ref={e => (this.$imgBox = e)} />
      </React.Fragment>
    )
  }
}

export default hot(module)(App)