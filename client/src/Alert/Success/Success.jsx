import React from 'react'
import {AiFillCheckCircle} from 'react-icons/ai';
import {MdOutlineCancel} from 'react-icons/md';
import './Success.css';
import { findDOMNode } from 'react-dom';
const Success = ({message,close}) => {
  return (
    <div className='success-popup'>
        <div className='icon-success'></div>
        <div className='message-success'><AiFillCheckCircle size={40} color='green'/>{message}</div>
        <div><button onClick={()=>close(false)} className='cancel-success'><MdOutlineCancel size={50} color='green'/></button></div>
    </div>
  )
}

export default Success