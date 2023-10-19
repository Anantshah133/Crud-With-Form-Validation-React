import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";



export default function MainComponent() {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/add-data" element={<CrudForm />}></Route>
          <Route path="*" element={<Error404Page />}></Route>
        </Routes>
      </BrowserRouter>
    )
}
