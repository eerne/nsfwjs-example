import React, { useState, useRef } from 'react'
import Video from './Video'
import Image from './Image'
import Switch from './Switch'
import Button from './Button'
import './Media.css'

let interval
let stream

const Media = ({
  onData,
  onReset,
  footer,
  children
}) => {
  const [input, setInput] = useState('file')
  const [error, setError] = useState(null)
  const imageRef = useRef()

  function handleInput(image) {
    onData(image).catch(setError)
  }

  function handleStream(video) {
    stream = video
    interval = setInterval(() => {
      onData(video).catch(setError)
    }, 3000)
  }

  function resetMedia() {
    if (input === 'video') {
      clearInterval(interval)
    }
    imageRef.current.resetImage()
    onReset()
  }

  function handleChange() {
    resetMedia()
    setInput(prevInput => prevInput === 'file' ? 'video' : 'file')
  }

  function handleScreenshot() {
    const { videoWidth, videoHeight } = stream
    const canvas = document.createElement('canvas')
    canvas.width = videoWidth
    canvas.height = videoHeight
    canvas.getContext('2d').drawImage(stream, 0, 0, videoWidth, videoHeight)
    imageRef.current.setImage(new Date().toISOString(), canvas)
    clearInterval(interval)
    setInput('file')
  }

  function handlePhoto() {
    if (stream) {
      return handleScreenshot()
    }
    imageRef.current.openImage()
  }

  return (
    <main className="media">
      {error}
      <Image
        onInput={handleInput}
        ref={imageRef}
      />
      { input === 'video' ? (
        <Video
          onStream={handleStream}
          onReset={resetMedia}
        />
      ) : null }
      <div>
        {children}
      </div>
      <div className="media__control">
        <Button onClick={handlePhoto}>
          Photo
        </Button>
        <Switch
          onChange={handleChange}
          checked={input === 'video'}
        />
        <footer className="media__status">
          {footer}
        </footer>
      </div>
    </main>
  )
}

export default Media
