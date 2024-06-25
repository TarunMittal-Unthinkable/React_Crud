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
import BrandList from './components/BrandList/BrandList.jsx';
import AuthenticatedRoute from "./components/Auth/AuthenticatedRoute.jsx"; 
import AuthenticatedLayout from "./components/Auth/AuthenticatedLayout.jsx"; 
import Category from "./components/Category/Category.jsx"

function App() {

  return (
    <>
      <Router>
        <div className="app-container">
          <h1>Crud App</h1>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route
              element={
                <AuthenticatedRoute>
                  <AuthenticatedLayout />
                </AuthenticatedRoute>
              }
            >
            <Route path="/brandlist" element={<BrandList />} />
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/categorylist" element={<Category/>} />
            </Route>
            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
        </div>
      </Router>
      </>
   
  )
}

export default App
