import React from 'react';
import {useState} from 'react';
import '../register/register.css';
import { useNavigate,useParams } from 'react-router-dom';
 const Register=()=>{
    const navigate = useNavigate();
    const [email,setEmail]=useState("");
    const [userInfor,setUserInfor]=useState({})
    const [warning,setWarning]=useState(false)
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const handleSubmit=(e)=>{
      e.preventDefault()
      fetch('http://localhost:3030/register',{
          method: 'POST',
          crossDomain: true,
          headers: {
              "content-type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
              name: name,
              email: email,
              password: password,
          }),
      }).then((res)=>res.json("dang nhap thanh cong")).then((data)=>{
          console.log(data, "userRegister")
          if(data==="tao tai khoan thanh cong"){
            localStorage.setItem("isLogined",true)
            setWarning(false)
            alert("registered")
            navigate("/")
          }else if(data==="account used"){
            setWarning(true);
          }
      }).catch((error)=>{
        console.log(error)
      })
    }
    return(
      <div className="register">
        <span className='title1-register'>Welcome to Quizz</span>
        <span className='title2-register'>You need to creat a account first</span>
        <form className="form-login" onSubmit={handleSubmit}>
              <input placeholder="Your name" onChange={(e)=>setName(e.target.value)} className="input-form" type="text" required></input>
              <input placeholder='Your email' type="email" onChange={(e)=>setEmail(e.target.value)} className="input-form" required></input>
              <input placeholder='Your password' onChange={(e)=>setPassword(e.target.value)} className="input-form" type="password" required></input>
              {warning?(<span className="warning-register">Email has been existed. Please try another email</span>):(<></>)}
              <button type="submit" className="btn-register">Register</button>
        </form>
      </div>
    )
  }

export default Register