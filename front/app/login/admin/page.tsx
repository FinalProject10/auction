"use client"
import axios from 'axios'
import React,{useState} from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Alert from '@mui/material/Alert';
import { getApiUrl } from '../../../utils/api';
const AdminLogin = () => {
  // Pre-fill with test user credentials
  const[email,setEmail]=useState("testadmin@test.com")
  const[pass,setPass]=useState("Test123@")
  const[err,setErr]=useState('')
  const router=useRouter()
  
  // Quick fill test credentials
  const fillTestCredentials = () => {
    setEmail("testadmin@test.com");
    setPass("Test123@");
  };
  
  // Quick fill saved user credentials
  const fillSavedCredentials = () => {
    setEmail("savedadmin@test.com");
    setPass("Saved123@");
  };
  const log=()=>{
    axios.post(getApiUrl('admin/login'),{email,password:pass})
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
        
        {/* Test User Quick Fill */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-5 w-[450px]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-purple-800 font-medium">Test Accounts</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-xs text-purple-700">
                <span className="font-semibold">Test:</span> testadmin@test.com | Test123@
              </p>
              <button
                type="button"
                onClick={fillTestCredentials}
                className="text-xs text-purple-600 hover:text-purple-800 underline ml-2"
              >
                Fill
              </button>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-purple-700">
                <span className="font-semibold">Saved:</span> savedadmin@test.com | Saved123@
              </p>
              <button
                type="button"
                onClick={fillSavedCredentials}
                className="text-xs text-purple-600 hover:text-purple-800 underline ml-2"
              >
                Fill
              </button>
            </div>
          </div>
        </div>

       <h1 className='mb-5'>Email Address</h1>
        <input 
        onChange={(e:any)=>setEmail((e.target.value))}
        type="email"
        value={email || ""}
        placeholder='testadmin@test.com'
        className=' w-[450px] h-[45px] bg-gray-50 pl-5 mb-5'
        /><br/>
        <h1 className='mb-5'>Password</h1>
        <input 
        onChange={(e:any)=>setPass((e.target.value))}
        type="password"
        value={pass || ""}
        placeholder='Test123@'
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