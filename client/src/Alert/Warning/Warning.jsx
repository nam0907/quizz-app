import React from 'react'
import {TiWarning} from 'react-icons/ti';
import {MdOutlineCancel} from 'react-icons/md';
import './Warning.css'
const Warning = ({message,close}) => {
  return (
    <div className='warning-popup'>
        <div className='icon-warning'></div>
        <div className='message-warning'><TiWarning size={40} color='#CD8702'/>{message}</div>
        <div><button className='cancel-warning'><MdOutlineCancel size={50} color='#CD8702'/></button></div>
    </div>
  )
}

export default Warning