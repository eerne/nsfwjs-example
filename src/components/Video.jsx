import React, { useRef, useEffect, useState } from 'react'
import './Video.css'

const Video = ({
  onStream,
  onReset
}) => {
  const video = useRef(null)
  const [status, setStatus] = useState('init')
  const [info, setInfo] = useState('')
  const [videoInputs, setVideoInputs] = useState([])
  const [facingMode, setFacingMode] = useState('user')
  
  useEffect(() => {
    switch(status) {
      case 'init':
        video.current.addEventListener('loadeddata', () => {
          onStream(video.current)
          setStatus('streaming')
        })
        video.current.addEventListener('error', console.error)
        setStatus('ready')
        break
      case 'ready':
        setStatus('starting')
        navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: {
              width: {
                ideal: video.current.innerWidth
              },
              facingMode
            }
          })
          .then((stream) => {
            const videoTracks = stream.getVideoTracks()
            setInfo(videoTracks[0].label)
            video.current.srcObject = stream
          })
          .catch(handleError)
        break
      case 'flip':
        video.current.srcObject.getTracks().forEach(t => t.stop())
        setStatus('ready')
        break
      case 'streaming':
        if (!videoInputs.length) {
          navigator.mediaDevices
            .enumerateDevices()
            .then(devices => devices.filter(({ kind }) => kind === 'videoinput'))
            .then(devices => setVideoInputs(devices))
            .catch(handleError)
        }
        break
      case 'starting':
        break
      default:
        console.log('default', status, facingMode)
    }
  }, [status, facingMode, videoInputs.length, onStream])  

  function handleError(error) {
    console.error(error)
    setInfo(error.message || error.toString())
  }

  function handleChangeFacingMode() {
    onReset()
    setFacingMode((mode) => mode !== 'user' ? 'user' : 'environment')
    setStatus('flip')
  }

  return (
    <div className="video">
      <video
        autoPlay
        playsInline
        ref={video}
      />
      {(videoInputs.length > 1) ? (
        <FlipIcon2 onClick={handleChangeFacingMode}>
          {facingMode}
        </FlipIcon2>
      ) : null}
      <div className="video__caption">{info}</div>
    </div>
  )
}

// function FlipIcon({
//   onClick
// }) {
//   return (
//     <svg onClick={onClick} className="flipIcon" viewBox="0 0 50 50">
//       <path d="M25 38c-7.2 0-13-5.8-13-13 0-3.2 1.2-6.2 3.3-8.6l1.5 1.3C15 19.7 14 22.3 14 25c0 6.1 4.9 11 11 11 1.6 0 3.1-.3 4.6-1l.8 1.8c-1.7.8-3.5 1.2-5.4 1.2z"></path><path d="M34.7 33.7l-1.5-1.3c1.8-2 2.8-4.6 2.8-7.3 0-6.1-4.9-11-11-11-1.6 0-3.1.3-4.6 1l-.8-1.8c1.7-.8 3.5-1.2 5.4-1.2 7.2 0 13 5.8 13 13 0 3.1-1.2 6.2-3.3 8.6z"></path>
//       <path d="M18 24h-2v-6h-6v-2h8z"></path>
//       <path d="M40 34h-8v-8h2v6h6z"></path>
//     </svg>
//   )
// }

function FlipIcon2({
  onClick
}) {
  return (
    <svg onClick={onClick} className="flipIcon" viewBox="0 0 50 50">
      <path d="M38 35h-2V17c0-.6-.4-1-1-1H18v-2h17c1.7 0 3 1.3 3 3v18z"></path>
      <path d="M37 36.5l-6.8-7.8 1.6-1.4 5.2 6.2 5.2-6.2 1.6 1.4z"></path>
      <path d="M32 36H15c-1.7 0-3-1.3-3-3V15h2v18c0 .6.4 1 1 1h17v2z"></path>
      <path d="M18.2 22.7L13 16.5l-5.2 6.2-1.6-1.4 6.8-7.8 6.8 7.8z"></path>
    </svg>
  )
}

export default Video
