import React from 'react';
import '../UserClass/UserClass.css';
import { Link, useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import{FiPlus} from 'react-icons/fi'
import CreatClass from './CreatClass';
import JoinClass from './JoinClass';
const UserClass = () => {
    const [creat,setCreat]=useState(false)
    const [creatClass,setCreatClass]=useState(false)
    const [joinClass,setJoinClass]=useState(false)
    const {id}=useParams();
    const [userClass,setUserClass]=useState([]);
    const handleCreat=()=>{
        setCreat(true);
    }
    const handleCreatClass=()=>{
      setCreatClass(true);
      setJoinClass(false);
    }
    const handleJoinClass=()=>{
      setJoinClass(true);
      setCreatClass(false);
    }
    const handleCancel=()=>{
      setCreat(false);
      setJoinClass(false);
      setCreatClass(false);
    }
    useEffect(()=>{
      console.log(id);
    fetch(`http://localhost:3030/${id}`,{
        method: 'GET',
        crossDomain: true,
        headers:{
          "content-type": "application/json",
          Accept: "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((res)=>res.json()).then(async(data)=>{
        console.log(data,"getData");
        setUserClass([...data.class]);
      })
    },[])
  return (
    <div className='class'>
        <div className='header-class'>
            {creat?
            (<div className='drop-plus-menu'>
                <div className='drop-plus-menu-item'>
                    <button onClick={()=>handleCreatClass()} className='btn-drop-menu'>Creat Class</button>
                    <span>or</span>
                    <button onClick={()=>handleJoinClass()} className='btn-drop-menu'>Join a Class</button>
                </div>
                <div className='drop-plus-menu-item'>
                    {creatClass?(<CreatClass/>):(<></>)}
                    {joinClass?(<JoinClass/>):(<></>)}
                </div>
                <button className='btn-cancel-class' onClick={()=>handleCancel()}>Cancel</button>
            </div>):(<></>)}
            <Link to={`http://localhost:3030/${id}/myclass`}><button className='btn-myclass'>My Class</button></Link>
            <button onClick={()=>handleCreat()} className='btn-plus'><FiPlus size={40}/></button>
        </div>
        <div className='class-content'>
           {userClass.length<1?(<div>Bạn chưa có lớp nào</div>)
          :(
          <div className="data-container">
            {userClass.map((val) =>(
              <div className="data" key={val._id}>
                <div className="title-data">{val.title}</div>
                <Link to={`/question/${val._id}`} className="button"><button className="btn-try">Try</button></Link>
              </div>
            ))}
        </div>
        )}
        </div>
    </div>
  )
}

export default UserClass