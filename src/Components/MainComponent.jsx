import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CrudForm from "./CrudForm";
import Error404Page from "./Error404Page";
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import Home from './Home';
import Dashboard from './Dashboard';
import StudentsTable from './StudentsTable';
import ViewStudent from './ViewStudent';
import EditStudent from './EditStudent';

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
  }, [isLoggedIn])
  const handleLogin = () => {
    setIsLoggedIn(true)
  }
  const handleLogout = () => {
    setIsLoggedIn(false)
  }
  // console.log(isLoggedIn)
  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="*" element={<Error404Page />} />
        <Route path='/' element={isLoggedIn ?  <Dashboard /> : <Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/add-student" element={<CrudForm />} />
        <Route path='/students' element={<StudentsTable />} />
        <Route path='/students/view/:id' element={isLoggedIn ? <ViewStudent /> : <Home />} />
        <Route path='/students/edit/:id' element={isLoggedIn ? <EditStudent /> : <Home />} />
      </Routes>
    </BrowserRouter>
  )
}