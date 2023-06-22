import React from 'react'
import{MdOutlineError,MdOutlineCancel} from 'react-icons/md';
import './Error.css'

const Error = ({message,close}) => {
  return (
    <div className='error-popup'>
        <div className='icon-error'></div>
        <div className='message-error'><MdOutlineError size={40} color='#FF4654'/>{message}</div>
        <div><button className='cancel-error'><MdOutlineCancel size={50} color='#FF4654'/></button></div>
    </div>
  )
}

export default Error