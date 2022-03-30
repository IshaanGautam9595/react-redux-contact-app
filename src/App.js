import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import {  ToastContainer } from "react-toastify"; 
import Home from './components/Home';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';

import Navbar from './components/Navbar';
const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Add" element={<AddContact />} />
        <Route path="/Edit/:id" element={<EditContact />} />
      </Routes>
      </div>
  );
}

export default App