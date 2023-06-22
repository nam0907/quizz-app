import React from 'react';
import './content.css';
import Navbar from '../navbar/Navbar';
import { useState } from 'react';
import { Link, useParams} from 'react-router-dom';
import {MdOutlineQuestionAnswer, MdOutlineLibraryBooks} from 'react-icons/md';
import {SiGoogleclassroom} from 'react-icons/si';
import {AiOutlinePlusCircle,AiOutlineSetting} from 'react-icons/ai';
import UserQuestion from './UserQuestion/UserQuestion';
import UserClass from './UserClass/UserClass';
import Explore from './Explore/Explore';
import Success from '../../Alert/Success/Success';
const Content = () => {
  const {id}=useParams();
  console.log(id);
  const [question,setQuestion]=useState(true);
  const [myClass,setMyClass]=useState(false);
  const [explore,setExplore]=useState(false);
  const [success,setSuccess]=useState(localStorage.getItem("success"))
  const [registed,setRegisted]=useState(localStorage.getItem("registed"))
  if(registed===false){
    localStorage.removeItem("registed")
  }
  if(success===false){
    localStorage.removeItem("success")
  }
  const handleQuestion=()=>{
    setQuestion(true)
    setMyClass(false);
    setExplore(false);
  }
  const handleClass=()=>{
    setMyClass(true);
    setQuestion(false);
    setExplore(false);

  }
  const handleExplore=()=>{
    setExplore(true);
    setMyClass(false);
    setQuestion(false);
  }
  return (
    <div>
        {success?(<Success message={"Login success"} close={setSuccess}/>):(<></>)}
        {registed?(<Success message={"Creat account success"} close={setRegisted}/>):(<></>)}
      <Navbar/>
      <div className="content-body">
        <div className="drop-menu">
        <Link to={`/${id}/question/creat`}><button className='btn-dropmenu'><span><AiOutlinePlusCircle/> New Question</span></button></Link>
        <ul className="list-dropmenu">
            <li><div id="1"><button onClick={()=>handleExplore()}  className='drop-menu-item'><MdOutlineLibraryBooks/>Explore</button></div></li>
            <li><button onClick={()=>handleQuestion()} className='drop-menu-item' ><MdOutlineQuestionAnswer/> My Question</button></li>
            <li><button onClick={()=>handleClass()} id="3" className='drop-menu-item'><SiGoogleclassroom/> Class</button></li>
            <li><button id='4' className='drop-menu-item'><AiOutlineSetting/> Setting</button></li>
        </ul>
        </div>
        <div>
          <div>
            {question?(<UserQuestion/>):(<></>)}
          </div>
          <div>
            {myClass?(<UserClass/>):(<></>)}
          </div>
          <div>
            {explore?(<Explore/>):(<></>)}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Content