import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CrudForm from "./CrudForm";
import Error404Page from "./Error404Page";
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

export default function MainComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
    } catch (err) {
      console.error(err);
      return false;
    }
  });
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    console.log()
  }, [isLoggedIn])
  const handleLogin = () => {
    setIsLoggedIn(true)
  }
  const handleLogout = () => {
    setIsLoggedIn(false)
  }
  console.log(isLoggedIn)
  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path='/sign-up' element={<SignUpPage />}></Route>
        <Route path='/login' element={<LoginPage handleLogin={handleLogin} />}></Route>
        <Route path="/add-data" element={<CrudForm />}></Route>
        <Route path="*" element={<Error404Page />}></Route>
      </Routes>
    </BrowserRouter>
  )
}