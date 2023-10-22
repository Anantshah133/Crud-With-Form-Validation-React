import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CrudForm from "./CrudForm";
import Error404Page from "./Error404Page";
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

export default function MainComponent() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/sign-up' element={<SignUpPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path="/add-data" element={<CrudForm />}></Route>
        <Route path="*" element={<Error404Page />}></Route>
      </Routes>
    </BrowserRouter>
  )
}