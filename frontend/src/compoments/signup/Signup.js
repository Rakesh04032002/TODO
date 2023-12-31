import React ,{useState} from 'react';
import './Signup.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import HeadingComp from './HeadingComp';
export default function Signup() {
    const history=useNavigate();
    const [input, setinput] = useState({email:"",username:"",password:""});
    const change=(e)=>{
        const {name,value}=e.target;
        setinput({...input,[name]:value});
    }
    const submit=async(e)=>{
        e.preventDefault();
        await axios.post(`${window.location.origin}/api/v1/register`,input).then((response)=>{
        if(response.data.message==="User already exists"){
            alert(response.data.message);
        }else{
            alert(response.data.message);
            setinput({
                email:"",username:"",password:""
            });
            history("/signin");
        }

    }); 

    };
  return (
    <div className='signup'>
        <div className="container">
            <div className="row">
                <div className="column col-lg-8 d-flex justify-content-center align-items-center ">
                    <div className='d-flex flex-column w-100 p-3'>
                        <input type="email" placeholder='Enter your email' className='p-2 my-3 input-signup' name='email' onChange={change} value={input.email}/>
                        <input type="username" placeholder='Enter your username' className='p-2 my-3 input-signup' name='username' onChange={change} value={input.username}/>
                        <input type="password" placeholder='Enter your password' className='p-2 my-3 input-signup' name='password' onChange={change} value={input.password}/>
                        <button className='btn-signup p-2' onClick={submit}>SignUp</button>
                    </div>
                </div>
                <div className=" column col-left col-lg-4 d-lg-flex justify-content-center align-items-center d-none">
                <HeadingComp first="sign" second="up"/>
            </div>
            </div>
        </div>
    </div>
  )
}
