
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './compoments/navbar/Navbar.js';
import Home from './compoments/home/Home.js';
import Footer from './compoments/footer/Footer.js';
import About from './compoments/about/About.js';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from './compoments/signup/Signup.js';
import Signin from './compoments/signup/Signin.js';
import Todo from './compoments/todo/Todo.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from './store/index.js';


function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    const id=sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login());
    }
  },[])
  return (
    <div className="App">
    <Router>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/todo' element={<Todo/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        
      </Routes>
      
    </Router>
      
      <Footer/>
    </div>
  );
}

export default App;
