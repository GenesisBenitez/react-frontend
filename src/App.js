import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav'
import Home from './components/Home'
import About from './components/About'
import Sellers from './components/Sellers';


function App() {
  return (
    <Router>
       <Nav />
       
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/about" element={<About/>}/>
         <Route path="/sellers" element={<Sellers/>}/>
       </Routes>
      
    </Router>

  );
}

export default App;
