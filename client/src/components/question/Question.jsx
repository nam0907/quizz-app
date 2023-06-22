import React from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { useState, useEffect,useRef } from 'react';
import {MdNavigateNext} from "react-icons/md";
import './question.css';
const Question = () => {
    const navigate=useNavigate()
    const [question,setQuestion]=useState([]);
    const {id}=useParams();
    const hasFetchedData = useRef(false);
    const [currentQuestion,setCurrentQuestion]=useState(0);
    const [score,setScore]=useState(0);
    const [showScore,setShowScore]=useState(false);
    useEffect(()=>{
   const FetchQues=()=>{
    fetch(`http://localhost:3030/question/${id}`,{
        method: 'GET',
        crossDomain: true,
        headers:{
            Apccept: "application/json",
        }
    }).then((res)=>res.json()).then((data)=>{
        console.log(data,"QuestionData")
        setQuestion([...data?.questions])
        console.log(question,"data")
    }).catch((err)=>{
        console.log("Error")
    })
}
        if(hasFetchedData.current===false){
            FetchQues();
            hasFetchedData.current=true;
        }
},[])
const clickNext=()=>{
    const nextQuestion=currentQuestion+1
    if(nextQuestion<question.length){
        setCurrentQuestion(nextQuestion)
    }else{
        setShowScore(true)
    }
}
const handleAnswer=(isCorrect)=>{
    if(isCorrect){
        setScore(score+1)
    }
    const nextQuestion=currentQuestion+1
    if(nextQuestion<question.length){
        setCurrentQuestion(nextQuestion)
    }else{
        setShowScore(true)
    }
}
const tryAgain=()=>{
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
}
function Cancel(){
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    navigate(-1)
}
  return (
    <div className="app">
            {showScore?(
                <div className="score-section">
                    <span>Your score: {score}/{question.length}</span>
                    <div className="btn-showscore">
                        <button className="btn-try-again" onClick={()=>tryAgain()}>Try again</button>
                        <button className="btn-cancels" onClick={()=>Cancel()}>Cancel</button>
                    </div>
                </div>)
            :(
                <>
            <div className="quesetion-container">
                <div className="count">
                    <div>question {currentQuestion+1}/{question.length}</div>
                </div>
                <div className="question-section">{question[currentQuestion]?.questionText}</div>
                <div>{question[currentQuestion]?.answerOptions.map((val)=>(
                    <button onClick={()=>handleAnswer()} className={val.answerChoice} key={val.answerText}>{val.answerText}</button>
                ))}</div>
            </div>
        <div className="nextbutton">
            <button className="btn-cancels" onClick={()=>Cancel()}>Cancel</button>
            <button className="btn-next" onClick={()=>clickNext()}><MdNavigateNext size="30px" color="white"></MdNavigateNext></button>
        </div>
        </>
        )}
    </div>
  )
}

export default Question