import React from 'react';
import '../UserQuestion/UserQuestion.css';
import { Link, useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Success from '../../../Alert/Success/Success';
import Error from '../../../Alert/Error/Error';
import Warning from '../../../Alert/Warning/Warning';
import Confirm from '../../../Alert/Confirm/Confirm';
const UserQuestion = () => {
    const {id}=useParams();
    const [question,setQuestion]=useState([]);
    useEffect(()=>{
    fetch(`http://localhost:3030/${id}`,{
        method: 'GET',
        crossDomain: true,
        headers:{
          "content-type": "application/json",
          Accept: "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((res)=>res.json()).then(async(data)=>{
        console.log(data,"getquestion");
         await setQuestion([...data.question]);
      })
    },[])
  return (
      <div className='question'>
        <div className='header-question'>
          <div>
            <form className='form-question'>
              <input className='input-question' placeholder='nhập câu hỏi '/>
              <button className='btn-question'>Search</button>
            </form>
          </div>
          <div><Link to={`http://localhost:3030/${id}/myquestion`}><button className='btn-myquestion'>My Question</button></Link></div>
        </div>
        <div className='question-content'>
           {question.length<1?(<div>Bạn chưa có câu hỏi nào</div>)
          :(
          <div className="data-container">
            {question.map((val) =>(
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

export default UserQuestion