import React, { useState } from 'react'
import './Signup.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import HeadingComp from './HeadingComp';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
export default function Signin() {
    const dispatch=useDispatch();
    const history = useNavigate();
    const [input, setinput] = useState({ email: "", password: "" });
    const change = (e) => {
        const { name, value } = e.target;
        setinput({ ...input, [name]: value });
    }
    const submit = async (e) => {
        e.preventDefault();
        await axios.post(`${window.location.origin}/api/v1/loginuser`, input).then((response) => {
            sessionStorage.setItem("id",response.data.others._id);
            dispatch(authActions.login());
            history("/todo");
        });

    };
    return (
        <div>
            <div className='signup'>
                <div className="container">
                    <div className="row">
                        <div className="column col-lg-8 d-flex justify-content-center align-items-center ">
                            <div className='d-flex flex-column w-100 p-3'>
                                <input type="email" placeholder='Enter your email' className='p-2 my-3' name='email' value={input.email} onChange={change} />
                                <input type="password" placeholder='Enter your password' className='p-2 my-3' name='password' value={input.password} onChange={change} />
                                <button className='btn-signup p-2' onClick={submit}>SignIn</button>
                            </div>
                        </div>
                        <div className="column col-left col-lg-4 d-lg-flex justify-content-center align-items-center d-none">
                            <HeadingComp first="sign" second="in"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
