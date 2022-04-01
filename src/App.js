import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav'
import Home from './components/Home'
import Seller from './components/Seller';
import AllProducts from './components/products/AllProducts';
import RegisterUser from './components/users/RegisterUser';
import Login from './components/auth/Login';
import axios from 'axios'
import {useEffect, useState} from 'react'
import UserPage from './components/users/UserPage';


function App() {
    const [userId, setUserId] = useState();
    const [username, setUsername] = useState();

    const getUser = () =>{
        axios.get("http://localhost:8080/getLoggedInUser", {withCredentials: true})
        .then((response)=>{
          console.log(response.data)
            setUserId(response.data.userId);
            setUsername(response.data.username)
        }).catch(function(error){
            console.log(error)
        })
    }
   getUser();
  return (
    <Router>
       <Nav userId = {userId} username={username}/>
       
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/sellers/:id" element={<Seller/>}/>
         <Route path="/products" element={<AllProducts/>}/>
         <Route path="/register" element={<RegisterUser/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/profilePage/:id" element={<UserPage userId = {userId} username={username}/>}/>
       </Routes>
      
    </Router>

  );

  }
export default App;
