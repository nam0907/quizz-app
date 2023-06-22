import React from 'react';
import { useState } from 'react';
import './Add.css';
import { useParams } from 'react-router-dom';
import {BsPlus} from 'react-icons/bs'
const Add = ({address,phoneNumber}) => {
  const {id}=useParams();
    const [Address,setAdress]=useState(address);
    const [PhoneNumber,setPhoneNumber]=useState(phoneNumber);
    const [addAddress,setAddAddress]=useState(false);
    const [addPhone,setAddPhone]=useState(false);
    const handleAddAddress=()=>{
      addAddress?setAddAddress(false):setAddAddress(true)
      setAddPhone(false)
    }
    const handleAddPhone=()=>{
      addPhone?setAddPhone(false):setAddPhone(true)
      setAddAddress(false)
    }
    const handleAddress=(e)=>{
      e.preventDefault();
      console.log("add")
      fetch(`http://localhost:4040/${id}/account/address`,{
            method: 'POST',
            crossDomain: true,
            headers:{
                "content-type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                address:Address,
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            if(data.status==="success"){
                alert("add address success")
                setAddAddress(false)
            }
        })
    }
    const handlePhoneNumber=(e)=>{
      e.preventDefault();
      fetch(`http://localhost:4040/${id}/account/phoneNumber`,{
            method: 'POST',
            crossDomain: true,
            headers:{
                "content-type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                phoneNumber: PhoneNumber,
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            if(data.status==="success"){
                alert("add phone number success");
                setAddPhone(false);
            }
        })
    }
  return (
    <div>
    <div className='add-container'>
            {address===""?(<div className='add-items'>
                <button onClick={()=>handleAddAddress()}><BsPlus size={20}/></button>
                <div>Add your adress</div>
            </div>):(<></>)}
            {phoneNumber===""?(<div className='add-items'>
                <button onClick={()=>handleAddPhone()}><BsPlus size={20}/></button>
                <div>Add your phone number</div>
            </div>):(<></>)}
    </div>
    {addAddress?(<div className='add'>
      <form onSubmit={handleAddress}>
        <label className='label-add'>Your address:</label>
        <input className='input-add' value={Address} onChange={(e)=>setAdress(e.target.value)}/>
        <button className='btn-add' type='submit'>Add</button>
      </form>
    </div>):(<></>)}
    {addPhone?(<div className='add'>
      <form onSubmit={handlePhoneNumber}>
      <label className='label-add'>Your phone number:</label>
        <input className='input-add' value={PhoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
        <button className='btn-add' type='submit'>Add</button>
      </form>
    </div>):(<></>)}
    </div>
  )
}

export default Add