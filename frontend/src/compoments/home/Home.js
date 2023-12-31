import React from 'react'
import './Home.css';
export default function Home() {
  return (
    <div className='home d-flex justify-content-center align-items-center'>
        <div className='container d-flex justify-content-center align-items-center flex-column'>
          <h1>Organize your <br/>work and life,finally</h1>  
          <p>Become focused , oraganized and calm with todo app . The world's #1 task manager app</p>
          <button className='home-btn'>Make todo list</button>
        </div>
    </div>
  )
}
