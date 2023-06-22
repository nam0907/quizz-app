import React from 'react';
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Content from "./components/content/Content";
import Question from "./components/question/Question";
import Creat from './components/creat/Creat';
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ServerError from './Errors/ServerError';
import Account from './components/account/Account';
export default function AppRouter() {
  const Custom=()=>{
    return localStorage.getItem("isLogined")?<Content/>:<Navigate to="/"/>
  }
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/:id" element={<Custom/>}/>
        <Route path="/:id/account" element={<Account/>}/>
        <Route path="/question/:id" element={<Question/>}/>
        <Route path="/:ids/question/creat" element={<Creat/>}/>
        <Route path="/serverError" element={<ServerError/>}></Route>
      </Routes>
    </Router>
  )
}