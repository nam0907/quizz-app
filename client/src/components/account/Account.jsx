import React from 'react'
import './Account.css'
import Add from './Add/Add'
import { useEffect, useState } from 'react';
import {MdCreate} from 'react-icons/md';
import { useParams, useNavigate } from 'react-router-dom';
import Success from '../../Alert/Success/Success';
import Confirm from '../../Alert/Confirm/Confirm';
const Account = () => {
    const navigate=useNavigate();
    const {id}=useParams();
    const [name, setName]=useState("");
    const [password, setPassword]=useState("");
    const [changeNameSuccess,setChangeNameSuccess]=useState(false);
    const [changePWSuccess,setChangePWSuccess]=useState(false);
    const [deleteSuccess,setDeleteSuccess]=useState(false);
    const [confirmDeleted,setConfirmDeleted]=useState(false);
    // const [address, setAdress]=useState("");
    // const [phoneNumber, setPhoneNumber]=useState("");
    const [changename, setChangeName]=useState(false);
    const [changePassword, setChangePassword]=useState(false);
    // const [changeAddress, setChangeAddress]=useState(false);
    // const [changePhoneNumber, setChangePhoneNumber]=useState(false);
    // const ids = localStorage.getItem('id');
    const [account, setAccount]=useState();
    useEffect(()=>{
        fetch(`http://localhost:3030/${id}/account`,{
            method: 'GET',
            crossDomain: true,
            headers:{
                Accept: 'application/json'
            }
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            setAccount(data);
            setPassword(data.password);
            setName(data.name);
        })
    },[])
    const changeName=()=>{
        changename?setChangeName(false):setChangeName(true)
    }
    const changepassword=()=>{
        changePassword?setChangePassword(false):setChangePassword(true)
    }
    // const changeaddress=()=>{
    //     changeAddress?setChangeAddress(false):setChangeAddress(true)
    // }
    // const changephonenumber=()=>{
    //     changePhoneNumber?setChangePhoneNumber(false):setChangePhoneNumber(true)
    // }
    const handleDelete=()=>{
        fetch(`http://localhost:3030/${id}/account/deleteAccount`,{
        method: 'DELETE',
        headers:{
          Accept: 'application/json',
        }
       }).then(res=>res.json()).then(data=>{
        console.log(data);
        if(data.status==="success"){
          localStorage.setItem("deleted",true);
          navigate("/")
        }
       })
    }
    const handleChange=(event)=>{
        event.preventDefault();
        fetch(`http://localhost:3030/${id}/account/password`,{
            method: 'POST',
            crossDomain: true,
            headers:{
                "content-type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                password:password,
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            if(data.status==="success"){
              setChangePWSuccess(true);
              setAccount(data.data)
            }
        })
        setChangePassword(false);
    }
    const handleChangeName=(event)=>{
      event.preventDefault();
      fetch(`http://localhost:3030/${id}/account/name`,{
          method: 'POST',
          crossDomain: true,
          headers:{
              "content-type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
              name:name,
          })
      }).then(res=>res.json()).then(data=>{
          console.log(data);
          if(data.status==="success"){
            setChangeNameSuccess(true);
              setAccount(data.data);
          }
      })
      setChangeName(false);
  }
    // const handleChangePhoneNumber=(event)=>{
    //     event.preventDefault();
    //     fetch(`http://localhost:4040/${id}/account/phoneNumber`,{
    //         method: 'POST',
    //         crossDomain: true,
    //         headers:{
    //             "content-type": "application/json",
    //           Accept: "application/json",
    //           "Access-Control-Allow-Origin": "*",
    //         },
    //         body: JSON.stringify({
    //             phoneNumber: phoneNumber,
    //         })
    //     }).then(res=>res.json()).then(data=>{
    //         console.log(data);
    //         if(data.status==="success"){
    //             alert("Change phone number success");
    //             setAccount(data.data);
    //             setChangePhoneNumber(false);
    //         }
    //     })
    //     setChangePassword(false);
    // }
    // const handleChangeAddress=(event)=>{
    //     event.preventDefault();
    //     fetch(`http://localhost:4040/${id}/account/address`,{
    //         method: 'POST',
    //         crossDomain: true,
    //         headers:{
    //             "content-type": "application/json",
    //           Accept: "application/json",
    //           "Access-Control-Allow-Origin": "*",
    //         },
    //         body: JSON.stringify({
    //             address: address,
    //         })
    //     }).then(res=>res.json()).then(data=>{
    //         console.log(data);
    //         if(data.status==="success"){
    //             alert("Change address success");
    //             setAccount(data.data);
    //             setChangeAddress(false);
    //         }
    //     })
    //     setChangePassword(false);
    // }
    const back=()=>{
        navigate(-1);
    }
  return (
    <div className='account-items'>
      {changeNameSuccess?(<Success message={"Your name is changed"} close={setChangeNameSuccess}/>):(<></>)}
      {changePWSuccess?(<Success message={"Your password is changed"} close={setChangePWSuccess}/>):(<></>)}
      {deleteSuccess?(<Success message={"Your account is deleted"} close={setDeleteSuccess}/>):(<></>)}
      {confirmDeleted?(<Confirm message={" To delete your account. This action can't be undo"} text={"Delete"} close={setConfirmDeleted} action={handleDelete}/>):(<></>)}
            <span className='account-title'>YOUR ACCOUNT</span>
            <div className='account-content'>
                <span className='account-text'>Your name:</span>
                <span className='account-text'>{account?.name}</span>
                <button type="button" onClick={()=>changeName()} className='btn-update'><MdCreate size={30}/></button>
                {changename?(<div>
                    <form className='nsm' onSubmit={handleChangeName}>
                    <input className='input-account' value={name} onChange={(e)=>setName(e.target.value)}/>
                    <button type='submit' className='btn-done-account'>Done</button>
                </form>
                </div>):(<></>)}
            </div>
            <div className='account-content'>
                <span className='account-text'>Your email:</span>
                <span className='account-text'>{account?.email}</span>
            </div>
            <div className='account-content'>
                <span className='account-text'>Your password:</span>
                <span className='account-text'>{account?.password}</span>
                {/* <button type='button' onClick={()=>changepassword()} className='btn-update'><MdCreate size={30}/></button> */}
                {changePassword?(<div>
                    <form className='nsm' onSubmit={handleChange}>
                    <input className='input-account' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button type='submit' className='btn-done-account'>Done</button>
                </form>
                </div>):(<></>)}
                {/* <button type='submit' className='btn-done-account' onClick={(e)=>this.handleChange.bind(this)}>Done</button> */}
            </div>
            {/* <div className='content'>
                <span>Your address:</span>
                <span>{account?.address}</span>
                {account?.address!==""?(<button onClick={()=>changeaddress()} className='btn-update'><MdCreate size={30}/></button>):(<></>)}
               {changeAddress?( <div>
                    <form onSubmit={handleChangeAddress}>
                        <input value={address} onChange={(e)=>setAdress(e.target.value)}/>
                        <button type="submit">Done</button>
                    </form>
                </div>):(<></>)}          
            </div>
            <div className='content'>
                <span>Your phone number:</span>
                <span>{account?.phoneNumber}</span>
                {account?.phoneNumber===""?(<></>):(<button onClick={()=>changephonenumber()} className='btn-update'><MdCreate size={30}/></button>)}
                {changePhoneNumber?(<div>
                    <form onSubmit={handleChangePhoneNumber}>
                        <input value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                        <button type="submit">Done</button>
                    </form>
                </div>):(<></>)}
            </div> */}
        {/* <Add address={account?.address}phoneNumber={account?.phoneNumber}/> */}
        <div>
          <div>
          <button className='btn-back' onClick={()=>back()}>Back</button>
            <button className='btn-change' onClick={()=>changepassword()}>Change password</button>
          </div>
            <button onClick={()=>handleDelete()} className='btn-logOut'>Delete Account</button>
        </div>
    </div>
  )
}

export default Account