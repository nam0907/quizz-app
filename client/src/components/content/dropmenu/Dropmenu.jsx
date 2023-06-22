import React from 'react';
import {Link,useParams} from 'react-router-dom';
import {MdNotificationsNone, MdOutlineQuestionAnswer, MdOutlineLibraryBooks} from 'react-icons/md';
import {SiGoogleclassroom} from 'react-icons/si';
import {AiOutlinePlusCircle,AiOutlineSetting,} from 'react-icons/ai';
import './dropmenu.css';
const Dropmenu = () => {
  const {id}=useParams()
  return (
    <div className="drop-menu">
        <Link to="/creat"><button className='btn-dropmenu'><span><AiOutlinePlusCircle/> New Question</span></button></Link>
        <ul className="list-dropmenu">
            <li><button id="1" className='drop-menu-item'>Explore </button></li>
            <li><button id="2" className='drop-menu-item' ><MdOutlineQuestionAnswer/> My Question</button></li>
            <li><button id="3" className='drop-menu-item'><SiGoogleclassroom/> Class</button></li>
            <li><button id='4' className='drop-menu-item'><AiOutlineSetting/> Setting</button></li>
        </ul>
    </div>
  )
}

export default Dropmenu