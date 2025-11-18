"use client"
import axios from 'axios'
import React,{useState} from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Alert from '@mui/material/Alert';
const AdminLogin = () => {
  const[email,setEmail]=useState(null)
  const[pass,setPass]=useState(null)
  const[err,setErr]=useState('')
  const router=useRouter()
  const log=()=>{
    axios.post(`http://localhost:5001/admin/login`,{email,password:pass})
    .then(r=>{
      localStorage.setItem('role','admin')
      localStorage.setItem('user',r.data)
                router.push('/home')            
  }).catch(err=>{
    let errorMessage = "Connection error. Please check if the server is running.";
    if (err.response?.data) {
      errorMessage = typeof err.response.data === 'string' 
        ? err.response.data 
        : err.response.data.message || JSON.stringify(err.response.data);
    } else if (err.message) {
      errorMessage = err.message;
    }
    setErr(errorMessage);
    console.error("Login error:", err);
  })
  } 
  return (
    <div>
        <img className='absolute right-0 top-0 h-full w-1/2' src="https://static01.nyt.com/images/2023/09/21/multimedia/21sp-cli-stadium-02-mljv/21sp-cli-stadium-02-mljv-articleLarge.jpg?quality=75&auto=webp&disable=upscale" alt="" />
        <div className='absolute right-0 top-0 h-full w-1/2 bg-black opacity-70'></div>
        <div className='flex items-center ml-[10%] mt-[6%]'>
        <div className=''>
        <h1 className='text-[45px] mb-10'>Sign in</h1>
       <h1 className='mb-5'>Email Address</h1>
        <input 
        onChange={(e:any)=>setEmail((e.target.value))}
        type="email"
        placeholder='Enter Your Email'
        className=' w-[450px] h-[45px] bg-gray-50 pl-5 mb-5'
        /><br/>
        <h1 className='mb-5'>Password</h1>
        <input 
        onChange={(e:any)=>setPass((e.target.value))}
        type="password"
        placeholder='Enter Your Password'
        className=' w-[450px] h-[45px] bg-gray-50 pl-5 mb-5'
        />
        <div className='flex flex-nowrap'>
            <input type="checkbox" className='inline-block w-4 mr-2 '/>
            <h1 className='inline-block mr-[40%] font-bold'>remember me</h1>
            <Link href={'/forget'} className=' text-blue-600'>forget password ?</Link>
        </div>
        {err && (
          <Alert severity="error" className="mb-5">{err}</Alert>
        )}
        <button 
    
        className='bg-black w-[20%] h-[45px] text-white rounded mt-[5%] '
        onClick={()=>log()}>Login</button>
        </div>
        </div>
    </div>
  )
}

export default AdminLogin