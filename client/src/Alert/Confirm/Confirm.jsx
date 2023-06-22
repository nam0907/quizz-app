import React from 'react'
import './Confirm.css';
import {TiWarning} from 'react-icons/ti';
const Confirm = ({message,text,close,action}) => {
  const confirm=()=>{
    action(true);
    close(false);
  }
  return (
    <div className='confirm-popup'>
        <div className='icon-confirm'><TiWarning size={120} color='#ECAE60'/></div>
        <div className='title-confirm'>Are you sure?</div>
        <div className='message-confirm'>{message}</div>
        <div className='btn-confirm'>
          <button onClick={()=>close(false)} className='cancel-confirm'>Cancel</button>
          <button onClick={()=>action()} className='action-confirm'>{text}</button>
        </div>
    </div>
  )
}

export default Confirm