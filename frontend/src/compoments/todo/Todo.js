import React, { useState,useEffect } from 'react'
import "./Todo.css";
import { TodoCards } from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Update } from './Update';
import {useDispatch,useSelector} from "react-redux";
import {authActions} from "../../store";
import axios from "axios";
let id =sessionStorage.getItem("id");
let toUpdateArray=[];
export default function Todo() {
    const [inputs, setInputs] = useState({ title: "", body: "" });
    const [Array, setArray] = useState([]);
    
    const show = () => {
        document.getElementById("textarea").style.display = "block";
    }
    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    }
    
    const submit = async () => {
        try {
            if (inputs.title === "" || inputs.body === "") {
                toast.error('Title or Body should not be empty');
                return;
            }
    
            if (id) {
                // If the user is authenticated (has an 'id'), make a POST request to add the task
                const response = await axios.post(`${window.location.origin}/api/v2/addTask`, {
                    title: inputs.title,
                    body: inputs.body,
                    id: id
                });
    
                console.log("Add Task Response:", response.data);
    
                setInputs({ title: "", body: "" });
                toast.success("Your Task Is Added");
            } else {
                // If the user is not authenticated, add the task to the local state 'Array'
                setArray([...Array, inputs]);
                setInputs({ title: "", body: "" });
                toast.success("Your Task Is Added");
                toast.error('Your Task Is Added But Not Saved In Your Account Cause You Are Not Signed-Up');
            }
        } catch (error) {
            console.error("Error adding task:", error);
    
            // Handle specific error conditions if needed
            if (error.response && error.response.status === 404) {
                toast.error("User not found. Please sign in again.");
            } else {
                toast.error("Error adding task. Please try again.");
            }
        }
    };
    
    const del=async(Cardid)=>{
        if(id){
            await axios.delete(`${window.location.origin}/api/v2/deleteTask/${Cardid}`,{data:{id:id}}).then((response)=>{toast("Your task is deleted")});
        }else{
            toast.error("You are not signed Up , to delete it you have to sign up");
        }
        //Array.splice(id,"1");
        //setArray([...Array]);
    };
    const dis=(value)=>{
        //console.log(value);
        document.getElementById("todo-update").style.display=value;
    }
    const update=(value)=>{
       toUpdateArray= Array[value];
    }
    useEffect(()=>{
        if(id){
            const fetch=async()=>{
                await axios.get(`${window.location.origin}/api/v2/getTask/${id}`).then((response)=>{setArray(response.data.list)});
            };
            fetch();
        }
    },[submit]);
    return (
        <div>
            <div className='todo'>
            <ToastContainer/>
                <div className='todo-main container d-flex justify-content-center align-items-center my-4 flex-column'>
                    <div className='d-flex flex-column todo-inputs-div w-100 p-1'>
                        <input type="text" placeholder='Title' className='my-2 p-2 todo-inputs' name="title" value={inputs.title} onClick={show} onChange={change} />
                        <textarea id="textarea" type="text" placeholder='Body' className='my-2 p-2 todo-inputs' name="body" value={inputs.body} onChange={change} />
                    </div>
                    <div className='w-lg-50 w-100 d-flex justify-content-end my-3  '>
                        <button className='add-btn px-2 py-1' onClick={submit}>Add</button>
                    </div>
                </div>
                <div className="todo-body">
                    <div className="container-fluid">
                        <div className="row ">
                        
                                {Array && Array.map((item, index) => (
                                    <div className="col-lg-3 col-10 mx-lg-5 mx-3 my-2" key={index}>
                                        <TodoCards title={item.title} body={item.body} id={item._id} delid={del} display={dis}
                                        updateId={index}
                                        toBeUpdate={update}/>
                                    </div>
                                ))} 
                        </div>
                    </div>
                </div>
            </div>
            <div className="todo-update" id="todo-update">
                <div className="container update"><Update  display={dis} update={toUpdateArray}/></div>
            </div>  
        </div>
    );
}
