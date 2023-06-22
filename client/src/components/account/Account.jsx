import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
const Account = () => {
  const {id}=useParams();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [userInfor,setUserInfor]=useState({});
  useEffect(()=>{
    fetch(`http://localhost:3030/account/${id}`,{
      method: 'GET',
      crossDomain: true,
      headers:{
          Apccept: "application/json",
      }
  }).then((res)=>res.json()).then((data)=>{
      setName(data.name)
      setEmail(data.email)
      setPassword(data.password)
      console.log(userInfor)
  }).catch((err)=>{
      console.log("Error")
  })
},[])
return (
   
    <div>
        <span>Your account</span>
        <div>
          <div>
            <span>Your Name</span>
            <span>{name}</span>
          </div>
          <div>
            <span>Your Email</span>
            <span>{email}</span>
          </div>
          <div>
            <span>Your Password</span>
            <input value={password} type="password" readOnly/>
          </div>
        </div>
        <form>
            <label>Your Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)}/>
            <label>Your Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <label>Your Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </form>
    </div>
  )
}

export default Account