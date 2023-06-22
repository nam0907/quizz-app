import React from 'react'
import { useState,useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import './Explore.css';
import { MdOutlinePanoramaHorizontalSelect } from 'react-icons/md';

const Explore = () => {
    const {id} = useParams();
    const [question,setQuestion]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        fetch(`http://localhost:3030/${id}/question`,{
            method: 'GET',
            crossDomain: true,
            headers:{
              "content-type": "application/json",
              Accept: "application/json; charset=utf-8",
              "Access-Control-Allow-Origin": "*",
            },
          }).then((res)=>res.json()).then(async(data)=>{
            console.log(data,"getData");
            setQuestion([...data]);
          })
        },[])
        const handleTry=(ques)=>{
            navigate(`/question/${ques}`)
            fetch(`http://localhost:3030/${id}/question/find`,{
                method: 'POST',
                crossDomain:true,
                headers:{
                    "content-type": "application/json",
                    Accept: "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({ques: ques})
            }).then((res)=>res.json()).then((data)=>{
                console.log(data,"add");
                fetch(`http://localhost:3030/${id}/add`,{
                  method: 'POST',
                  crossDomain:true,
                  headers:{
                    "content-type": "application/json",
                    Accept: "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({data:data})
                }).then((res)=>res.json()).then((data)=>{
                  console.log(data,"addstatus")
                })
            })
        }
  return (
<div className='explore-contain'>
           {question.length<1?(<div>Bạn chưa có câu hỏi nào</div>)
          :(
          <div className="explore-container">
            {question.map((val) =>(
              <div className="data" key={val._id}>
                <div className="title-data">{val.title}</div>
                  <button onClick={()=>handleTry(val._id)} className="btn-try">Try</button>
                </div>
            ))}
        </div>
        )}
        </div>  
    )
}

export default Explore