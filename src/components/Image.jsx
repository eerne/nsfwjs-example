import React, { Component, createRef } from 'react'
import './Image.css'

const hasDraggable = 'draggable' in document.documentElement;

export default class Image extends Component {

  constructor(props) {
    super(props)
    this.imgRef = createRef()
    this.inputRef = createRef()
  }

  state = {
    focus: false,
    fileName: null,
    error: null
  }

  handleDrop = (e) => {
    e.preventDefault()
    const [file] = e.dataTransfer ? e.dataTransfer.files : e.target.files
    if (!'image/jpeg,image/png,image/webp,image/gif'.includes(file.type)) {
      return this.setState({
        error: `${file.name} ${file.type} not supported!`
      })
    }
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.imageData = e.target.result
        this.imgRef.current.onload = this.handleOnLoad
        this.setState({ fileName: file.name })
      }
      reader.readAsDataURL(file)
    }
    this.setState({ focus: false, error: null })
  }

  setImage = (fileName, canvas) => {
    this.imageData = canvas.toDataURL('image/png', 1)
    this.imgRef.current.onload = this.handleOnLoad
    this.setState({ fileName })
  }

  resetImage = () => {
    this.imageData = null
    this.setState({ fileName: null })
  }

  openImage = () => {
    this.inputRef.current.click()
  }
  
  handleOnLoad = () => {
    this.props.onInput(this.imgRef.current)
  }

  handleDragOver(e) {
    e.preventDefault()
  }

  hangleFileInputReset(e) {
    e.target.value = ''
  }

  handleDragEnter = () => {
    this.setState({ focus: true })
  }

  handleDragLeave = () => {
    this.setState({ focus: false })
  }

  render() {
    const { name } = this.props
    const { focus, fileName, error } = this.state
    const img = (
      <img
        className="image--background"
        alt={fileName}
        src={this.imageData}
        ref={this.imgRef}
        style={{ visibility: this.imageData ? 'visible' : 'hidden' }}
      />
    )
    return (
      hasDraggable ? (
        <div
          className={focus ? 'image image--focus' : 'image'}
          onDragEnter={this.handleDragEnter}
          onDragLeave={this.handleDragLeave}
          onDragOver={this.handleDragOver}
          onDrop={this.handleDrop}
        >
          {error ? (<div>{error}</div>) : null}
          {img}
          <input
            name={name}
            type="file"
            onReset={this.hangleFileInputReset}
            onChange={this.handleDrop}
            ref={this.inputRef}
          />
        </div>
      ) : (
        <input
          name={name}
          type="file"
          onChange={this.handleDrop}
          onClick={this.hangleFileInputReset}
          ref={this.inputRef}
        />
      )
    )
  }
}
