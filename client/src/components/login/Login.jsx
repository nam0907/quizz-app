import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {MdOutlineMail, MdLockOutline} from "react-icons/md"
import "../login/login.css";
const  Login=()=>{
    const navigate=useNavigate()
    const [email,setEmail]=useState("");
    const [warning, setWarning]=useState(false);
    const [password,setPassword]=useState("");
    const handleSubmit=(e)=>{
      e.preventDefault()
      console.log(email, password)
      fetch('http://localhost:3030/login',{
          method: 'POST',
          crossDomain: true,
          headers: {
              "content-type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
              email: email,
              password: password,
          }),
      }).then((res)=>res.json()).then((data)=>{
          console.log(data, "userLogin")
          if(data.status==="success"){
            localStorage.setItem("isLogined",true)
            setWarning(false)
            alert("Login success")
            navigate(`/${data.id}`)
          }else{
            setWarning(true)
          }
      }).catch((error)=>{
        console.log("sever error","error")
        navigate('/serverError')
      })
    }
    return(
      <div className="login">
          <span className='title1-login'>Welcome to Quizz</span>
          <span className='title2-login'>You need to login first</span>
          <form className="form-register" onSubmit={handleSubmit}>
            <div className="input-gmail">
              <MdOutlineMail size={30}/>
              <input placeholder='Email' onChange={(e)=>setEmail(e.target.value)} className="input-form-login" type="text" required/>
            </div>
            <div className="input-password">
              <MdLockOutline size={30}/>
              <input placeholder='Password' onChange={(e)=>setPassword(e.target.value)} className="input-form-login" type="password" required/>
            </div>
            {warning?(<span className="warning-login">Email or password is incorrect. Please try again</span>):(<></>)}
              <button type="submit" className="btn-login">Login</button>
          </form>
          <span>
          <span>You don't have account? </span>
          <a href='http://localhost:3000/register'>Sign up</a>
          </span>
      </div>
    )
  }

export default Login