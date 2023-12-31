import React ,{useEffect, useState} from 'react'
import axios from "axios";
import { toast } from 'react-toastify';
export const Update = ({display,update}) => {
  useEffect(()=>{
    setinput({title:update.title,body:update.body});
  },[update])
  const [input, setinput] = useState({title:"",body:""});
  const change=(e)=>{
    const {name,value}=e.target;
    setinput({...input,[name]:value});
  }
  const submit=async()=>{
    await axios.put(`${window.location.origin}/api/v2/updateTask/${update._id}`,input).then((response)=>{toast.success("Your task is updataed")});
    display('none');
  }
  return (
    <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>
        <h5>Update your task</h5>
        <input name="title" type="text" className='todo-inputs my-4 w-100 p-3' value={input.title} onChange={change}/>
        <textarea name="body" id="" cols="30" rows="10" className='todo-inputs w-100 p-3' value={input.body} onChange={change} />
        <div>
            <button className='btn btn-dark my-4' onClick={submit}>Update</button>
            <button className='btn btn-danger my-4 mx-3' onClick={()=>{display('none')}}>Close</button>
        </div>
    </div>
  )
}
