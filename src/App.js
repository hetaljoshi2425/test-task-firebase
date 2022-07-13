import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './Views/Dashboard';
import Login from './Views/Login';
import Role from './Views/Role';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/role" element={<Role />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter >
    </div >
  );
}

export default App;