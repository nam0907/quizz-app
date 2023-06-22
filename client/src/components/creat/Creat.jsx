import React from 'react';
import {useState} from "react";
import '../creat/creat.css';
import {BsCheckCircleFill,BsCheckCircle} from 'react-icons/bs';
import {MdDelete} from 'react-icons/md';
import { useNavigate,useParams } from 'react-router-dom';
import Success from '../../Alert/Success/Success';
import Error from '../../Alert/Error/Error';
const Creat = () => {
  const {ids}=useParams();
  const navigate=useNavigate();
  const [success,setSuccess]=useState(false);
  const [val,setVal]=useState("");
  const[id,setId]=useState(1)
  const [check1,setCheck1]=useState(false);
	const [check2,setCheck2]=useState(false);
	const [check3,setCheck3]=useState(false);
	const [check4,setCheck4]=useState(false);
  const [questions, setQuestions]=useState([]);
  const[answerText1,setAnswerText1]=useState("");
	const[answerText2,setAnswerText2]=useState("");
	const[answerText3,setAnswerText3]=useState("");
	const[answerText4,setAnswerText4]=useState("");
  const [time, setTime]=useState("")
  const [title, setTitle]=useState("");
    const creatQuestion = () =>{
          const newQues = {
          id:id,
          questionText: val,
          answerOptions: [
            { answerChoice: "a", answerText: answerText1, isCorrect: check1},
            { answerChoice: "b", answerText: answerText2, isCorrect: check2},
            { answerChoice: "c", answerText: answerText3, isCorrect: check3},
            { answerChoice: "d", answerText: answerText4, isCorrect: check4},
          ]
          }
        setQuestions([...questions, newQues])
        setVal("");
        setAnswerText1("");
        setAnswerText2("");
        setAnswerText3("");
        setAnswerText4("");
        setCheck1(false)
        setCheck2(false)
        setCheck3(false)
        setCheck4(false)
        setId(id+1)                         
      }
      const handleCheck1 =()=>{
        check1?setCheck1(false):setCheck1(true)
      }
      const handleCheck2 =()=>{
        check2?setCheck2(false):setCheck2(true)
      }
      const handleCheck3 =()=>{
        check3?setCheck3(false):setCheck3(true)
      }
      const handleCheck4 =()=>{
        check4?setCheck4(false):setCheck4(true)
      }
     const add=async()=>{
      fetch(`http://localhost:3030/${ids}/question/creat`,{
          method: 'POST',
          crossDomain: true,
          headers:{
            "content-type": "application/json",
            Accept: "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            title: title,
            questions: questions,
          }),
        }).then((res)=>res.json()).then((data)=>{
          fetch(`http://localhost:3030/${ids}/question/add`,{
            method: 'POST',
            crossDomain: true,
            headers:{
              "content-type": "application/json",
              Accept: "application/json; charset=utf-8",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({data: data}),
          }).then((res)=>res.json()).then((data)=>{
            console.log(data,"skdla");
            if(data==="created success"){
              setSuccess(true);
            }
          }).catch((err)=>{
            console.log(err,"error")
          })
        })
        setTitle("")
        setQuestions([])
      }
const cancel=()=>{
    navigate(-1)
}
const handleDelete=(id)=>{
  console.log(id)
 const items=questions.filter((e)=>{return e.id!==id});
 setQuestions(items);
}
  return (
    <div className="creat-data">
    {success?(<Success message={"created success"} close={()=>setSuccess()}/>):(<></>)}
    <label>Title</label>
    <input className="input-title" type="text" onChange={(e)=>setTitle(e.target.value)}></input>
    <button onClick={()=>creatQuestion()} className="btn-add">Add</button>
    <div className="ques-add">
    <input placeholder='nhap cau hoi' className="ques" value={val} onChange={(e)=>setVal(e.target.value)} type="text"></input>
    <div className="input-ques">
                    <div className="div-ans-a"><button className="check-a" onClick={()=>handleCheck1()}>{check1===true?<BsCheckCircleFill color='green'></BsCheckCircleFill>:<BsCheckCircle></BsCheckCircle>}</button><input className="textans-a" value={answerText1} onChange={(e)=>setAnswerText1(e.target.value)} type="text" placeholder='Nhap dap an a'></input></div>
                    <div className="div-ans-b"><button className="check-b" onClick={()=>handleCheck2()}>{check2===true?<BsCheckCircleFill color='green'></BsCheckCircleFill>:<BsCheckCircle></BsCheckCircle>}</button><input className="textans-b" value={answerText2} onChange={(e)=>setAnswerText2(e.target.value)} type="text" placeholder='Nhap dap an b'></input></div>
                    <div className="div-ans-c"><button className="check-c" onClick={()=>handleCheck3()}>{check3===true?<BsCheckCircleFill color='green'></BsCheckCircleFill>:<BsCheckCircle></BsCheckCircle>}</button><input className="textans-c" value={answerText3} onChange={(e)=>setAnswerText3(e.target.value)} type="text" placeholder='Nhap dap an c'></input></div>
                    <div className="div-ans-d"><button className="check-d" onClick={()=>handleCheck4()}>{check4===true?<BsCheckCircleFill color='green'></BsCheckCircleFill>:<BsCheckCircle></BsCheckCircle>}</button><input className="textans-d" value={answerText4} onChange={(e)=>setAnswerText4(e.target.value)} type="text" placeholder='Nhap dap an d'></input></div>
    </div>
    </div>
    <div className="ques-container">
      {
      questions.length<1
      ?(<span>Chưa có câu hỏi nào</span>)
      :(questions.map((b)=>(
        <div className="ques-data" key={b.id}>
          <div className="header-ques">
            <span className="index">Câu hỏi {questions.indexOf(b)+1}/{questions.length}</span>
            <button className='btn-delete-creat' onClick={()=>handleDelete(b.id)}><MdDelete size={25}></MdDelete></button>
          </div>
            <div>
            <span>{b.questionText}?</span>
            <span>{b.answerOptions.map((a)=>(
              <div key={a.answerChoice}>
                <span>{a.answerChoice}: {a.answerText}</span>
              </div>
            ))}</span>
        </div>
        </div>
      )))
      }
    </div>
    <div className="creat-btn-container">
    <button className="btn-cancel-creat" onClick={()=>cancel()}>Cancel</button>
    <button className="btn-done" onClick={()=>add()}>Done</button>
    </div>
  </div>
  )
}

export default Creat