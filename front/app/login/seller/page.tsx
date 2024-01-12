"use client"
import { useEffect, useReducer, useState } from 'react'
import React from 'react'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const SellerLogin = () => {
    const[email,setEmail]=useState(null)
    const[pass,setPass]=useState(null)
    const[err,setErr]=useState("")
    const router=useRouter()
const log=()=>{
    axios.post(`http://localhost:5000/seller/login`,{email,password:pass})
    .then(r=>{
        localStorage.setItem('role','seller')
        localStorage.setItem('user',r.data)       
        setTimeout(() => {
          router.push('/home')
        }, 1500);            
}).catch(err=>{
  setErr(err.response.data)
  })
}
  return (
    <div>
        
        <img className='absolute right-0 top-0 h-full w-1/2' src="https://static01.nyt.com/images/2023/09/21/multimedia/21sp-cli-stadium-02-mljv/21sp-cli-stadium-02-mljv-articleLarge.jpg?quality=75&auto=webp&disable=upscale" alt="" />
        <div className='absolute right-0 top-0 h-full w-1/2 bg-black opacity-70'></div>
        <div className='flex items-center ml-[10%] mt-[6%]'>
        <div className='mt-[10%]'>
        <h1 className='text-[45px] mb-10'>Sign in</h1>
        <h1 className=' font-[300] text-gray-500 absolute top-[25%] ml-[24%] '>Not a member ?<Link href={'/register/seller/firstStep'} className='underline text-blue-400'>Sign-up now</Link></h1>
       <h1 className='mb-5'>Email Address</h1>
        <input 
        onChange={(e:any)=>setEmail(e.target.value)}
        type="email"
        placeholder='Enter Your Email'
        className=' w-[450px] h-[45px] bg-gray-50 pl-5 mb-5'
        /><br/>
        <h1 className='mb-5'>Password</h1>
        <input 
        onChange={(e:any)=>setPass(e.target.value)}
        type="password"
        placeholder='Enter Your Password'
        className=' w-[450px] h-[45px] bg-gray-50 pl-5 mb-5'
        />
        <div className='flex flex-nowrap'>
            <input type="checkbox" className='inline-block w-4 mr-2 '/>
            <h1 className='inline-block mr-[40%] font-bold'>remember me</h1>
            <Link href={'/forget'} className=' text-blue-600'>forget password ?</Link>
        </div>
        {err==="cin or batinda needed"&&<Alert severity="error">Complete Registration!</Alert>}
        {err==="user not found"&&<Alert severity="error">User Not Found!</Alert>}
        {err==="password is incorrect"&&<Alert severity="error">Password is incorrect!</Alert>} 

        <button 
        onClick={()=>log()}
        className='bg-black w-[20%] h-[45px] text-white rounded mt-[5%] '>Login</button>
        </div>
        </div>
    </div>
  )
}

export default SellerLogin