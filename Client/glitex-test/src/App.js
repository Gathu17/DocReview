import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Register from './Pages/Register/register'
import Login from './Pages/Login/login'
import Home from './Pages/Home/home'
import NavBar from './Components/Nav'
import File from './Pages/Files/file'

function App() {
  return (
    <BrowserRouter basename="/">
    <NavBar/>
    <Routes>
      <Route path="/"  element={<Home/>}/>
      <Route path="/register"  element={<Register/>}/>
      <Route path="/login"  element={<Login/>}/>
      <Route path="/files"  element={<File/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
