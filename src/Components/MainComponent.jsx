import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CrudForm from "./CrudForm";
import Error404Page from "./Error404Page";
import Index from './Index';

export default function MainComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />}></Route>
        <Route path="/add-data" element={<CrudForm />}></Route>
        <Route path="*" element={<Error404Page />}></Route>
      </Routes>
    </BrowserRouter>
  )
}