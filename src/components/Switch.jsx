import React from 'react'
import Switch from 'react-switch'
import './Switch.css'
/*
const video = (
  <span className="video-icon">REC
    <svg viewBox="0 0 576 512">
      <path d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"/>
    </svg>
  </span>
)
*/
const SwitchButton = ({
  label,
  checked = false,
  onChange,
  ...props
}) => {
  return (
    <label className="switch" htmlFor={label} {...props}>
      {label}
      <Switch
        id={label}
        handleDiameter={28}
        height={60}
        width={140}
        onColor="#e10000"
        offColor="#2ac100"
        onChange={onChange}
        checked={checked}
        uncheckedIcon={<span className="switch--unchecked">Camera</span>}
        checkedIcon={<span className="switch--checked">LIVE</span>}
        className="switch--input"
        activeBoxShadow="0 0 1px 10px rgba(0, 0, 0, 0.2)"
      />
    </label>
  )
}

export default SwitchButton


/*
<svg viewBox="-2 -5 14 20" height="100%" width="100%" style="position: absolute; top: 0px;">
  <path d="M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12" fill="#fff" fill-rule="evenodd"></path>
</svg>
*/