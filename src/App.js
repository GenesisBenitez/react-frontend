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


function App() {
  return (
    <Router>
       <Nav />
       
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/sellers/:id" element={<Seller/>}/>
         <Route path="/products" element={<AllProducts/>}/>
         <Route path="/register" element={<RegisterUser/>}/>
       </Routes>
      
    </Router>

  );
}

export default App;
