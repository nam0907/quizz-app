import React from 'react';
import './navbar.css';
import {MdOutlineAccountCircle,MdNotificationsNone ,MdOutlineMenu, MdSearch, MdLogout} from 'react-icons/md';
import {useState,useEffect} from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
const Navbar = () => {
  const navigate=useNavigate()
  const [account,setAccount]=useState(false);
  const {id}=useParams();
  const [notification,setNotification]=useState([]);
  useEffect(()=>{
    fetch(`http://localhost:3030/${id}`,{
      method: 'GET',
      crossDomain: true,
      headers:{
        Accept: 'application/json',
      },
    }).then((res)=>res.json()).then(async(data)=>{
    console.log(data);
    await setNotification([...data.notifications]);
  }
    )
  },[])
  const handleAccount=()=>{
    account?setAccount(false):setAccount(true)
  }
  const handleLogOut=()=>{
    localStorage.removeItem("isLogined")
    navigate("/")
  }
  return (
    <div className="list">
      <div className="search-container">
              <form className="form-search">
                <span><MdSearch size={28}/></span>
                <input placeholder='Search' className='input-search'/>
                <button className='btn-join'>Search</button>
              </form>
      </div>
        <ul className='list-nav'>
              <li className='list-nav-item'>
                <div className='notification'>
                  <span><MdNotificationsNone size={30}/></span>
                  <div className="notification-text">{notification.length}</div>
                </div>
              </li>
              <li className='list-nav-item'>
                <button className='btn-account' onClick={()=>handleAccount()}><MdOutlineAccountCircle size={30}/></button></li>
        </ul>
        {account?(<div className='account-navbar'>
            <Link to={`/${id}/account`} className='account-item'> <MdOutlineAccountCircle size={25}/> Account</Link>
            <button onClick={()=>handleLogOut()} className='account-item'><MdLogout size={25}/> Log Out</button>
        </div>):(<></>)}
    </div>
  )
}

export default Navbar