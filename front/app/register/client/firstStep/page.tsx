'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { getApiUrl } from '../../../../utils/api'
import Input from '@mui/joy/Input';
import Key from '@mui/icons-material/Key';
import { IoPersonCircle } from "react-icons/io5";
import { HiDocumentText } from "react-icons/hi2";
import { MdVerifiedUser } from "react-icons/md";
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';
import InfoTooltip from '../../../components/InfoTooltip';

const FirstStep = () => {
  const router=useRouter()
  const[firstName,setFirstName]=useState(null)
  const[lastName,setLastName]=useState(null)
  const[phone,setPhone]=useState(null)
  const[email,setEmail]=useState(null)
  const[pass,setPass]=useState('')
  const[confirmPass,setConfirmPass]=useState("")
  const[verified,setVerified]=useState(false)
  const[show,setShow]=useState(false)
  const[danger,setDanger]=useState(true)
  const[dangerPass,setDangerPass]=useState(true)
  const[dangerConfPass,setDangerConfPass]=useState(true)
const[err,setErr]=useState('')

  const add=()=>{
    axios.post(getApiUrl('client/register'),{name:firstName,lastName:lastName,pass:pass,email:email,phone:phone})
    .then(r=>{router.push('/login/client')
    console.log(r.data)}).catch(err=>setErr(err.response.data['err']))
  }
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            className='absolute right-0 h-full w-1/2 object-cover' 
            src="/images/backgrounds/login-background.jpg" 
            alt="Background" 
          />
          <div className='absolute right-0 h-full w-1/2 bg-gradient-to-l from-black/80 via-black/70 to-transparent'></div>
        </div>

        {/* Sign-in Link */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-center">
          <span className='text-gray-600 text-sm'>Already a member? </span>
          <Link href={'/login/client'} className='text-red-500 hover:text-red-600 underline text-sm font-semibold transition-colors'>
            Sign-in
          </Link>
        </div>

        {/* Form Container */}
        <div className='relative z-10 w-full max-w-4xl mx-auto px-4'>
          <div className='bg-white rounded-2xl shadow-2xl p-8 md:p-12'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-2'>Sign-up</h1>
            <p className="text-gray-600 mb-8">Create your account to start bidding on amazing vehicles</p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>First Name</label>
                <Input 
                  onChange={(e:any)=>setFirstName(e.target.value)}
                  type="text"
                  placeholder='Mohammed'
                  className='w-full h-[50px] bg-gray-50 pl-5 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all'
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Last Name</label>
                <Input 
                  onChange={(e:any)=>setLastName(e.target.value)}
                  type="text"
                  placeholder='Ben Ali'
                  className='w-full h-[50px] bg-gray-50 pl-5 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all'
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                  Phone
                  <InfoTooltip 
                    content="Enter your phone number. Must be 8 digits long. Format: +84961566302"
                    position="top"
                    iconSize="sm"
                  />
                </label>
                <Input 
                  onChange={(e:any)=>{setPhone(e.target.value)
                    if(e.target.value.length===8){
                      setDanger(false)
                    } else {
                      setDanger(true)
                    }
                  }}
                  type="text"
                  placeholder='+84961566302'
                  color={danger?'danger':"success"}
                  className='w-full h-[50px] bg-gray-50 pl-5 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all'
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                  Email
                  <InfoTooltip 
                    content="Enter a valid email address. This will be used for account verification and notifications."
                    position="top"
                    iconSize="sm"
                  />
                </label>
                <Input 
                  onChange={(e:any)=>setEmail(e.target.value)}
                  type="email"
                  placeholder='ahmed@gmail.com'
                  className='w-full h-[50px] bg-gray-50 pl-5 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all'
                />
              </div>
              <div className="relative">
                <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                  Password
                  <InfoTooltip 
                    content={
                      <div>
                        <p className="font-semibold mb-1 text-yellow-300">Password Requirements:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>More than 8 characters</li>
                          <li>At least one special character (#, ?, @)</li>
                        </ul>
                        <p className="mt-2 text-xs">Hover over the password field for real-time validation.</p>
                      </div>
                    }
                    position="top"
                    iconSize="sm"
                  />
                </label>
                <Input
                  onMouseEnter={()=>setShow(true)}
                  onMouseLeave={()=>setShow(false)}
                  type="password"
                  placeholder="Enter your password"
                  startDecorator={<Key />}
                  value={pass}
                  onChange={(event:any) => {
                    setPass(event.target.value)
                    if(event.target.value.length>8 && (event.target.value.includes('#')||event.target.value.includes('@')||event.target.value.includes('?'))){
                      setDangerPass(false)
                    } else {
                      setDangerPass(true)
                    }
                  }}
                  color={dangerPass?"danger":"success"}
                  className='w-full h-[50px] bg-gray-50 pl-5 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all'
                />
                {show && 
                  <div className='absolute top-full left-0 mt-2 w-full p-4 rounded-lg border-2 border-gray-300 z-40 bg-white shadow-lg'>
                    <div>
                      <h3 className='text-green-600 font-semibold mb-2'>Password must contain:</h3>
                      <ul className='text-sm text-gray-700 space-y-1'>
                        <li>• More than 8 characters</li>
                        <li>• At least one special character (#, ?, @)</li>
                      </ul>
                    </div>
                  </div>
                }  
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                  Confirm Password
                  <InfoTooltip 
                    content="Re-enter your password to confirm. Both passwords must match exactly."
                    position="top"
                    iconSize="sm"
                  />
                </label>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  startDecorator={<Key />}
                  value={confirmPass}
                  color={dangerConfPass?'danger':'success'}
                  onChange={(event:any) => {
                    setConfirmPass(event.target.value)
                    if(event.target.value===pass){
                      setDangerConfPass(false)
                    } else {
                      setDangerConfPass(true)
                    }
                  }}
                  className='w-full h-[50px] bg-gray-50 pl-5 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all'
                />
              </div>
            </div>

            {err==="email in use" && (
              <Alert severity="error" className='mt-6'>Email Already Exists!</Alert>
            )}

            <div className="mt-8 flex justify-end">
              <button 
                className="group relative px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                onClick={() => {
                  add()
                }}
              >
                <span>Next</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default FirstStep