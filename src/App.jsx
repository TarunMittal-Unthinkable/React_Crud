import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/LoginForm/LoginForm.jsx'
import Signup from './components/SignUp/SignUp.jsx'
import ProductList from './components/ProductList/ProductList.jsx'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import BrandList from './components/BrandList/BrandList.jsx'

function App() {


  return (
    <>
      <Router>
        <div className="app-container">
          <h1>Crud App</h1>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/brandlist" element={<BrandList />} />
            <Route path="/productlist" element={<ProductList />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
