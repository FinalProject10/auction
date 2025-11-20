'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { getApiUrl } from '../../../../utils/api'
import Alert from '@mui/material/Alert';
import Input from '@mui/joy/Input';
import Image from 'next/image'
import Key from '@mui/icons-material/Key';
import Stack from '@mui/joy/Stack';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import img1 from '../../../images/img1.png'
import { IoPersonCircle } from "react-icons/io5";
import { HiDocumentText } from "react-icons/hi2";
import { MdVerifiedUser } from "react-icons/md";
import { useRouter } from 'next/navigation';
import InfoTooltip from '../../../components/InfoTooltip';
const FirstStep = () => {
  const router=useRouter()
  const[firstName,setFirstName]=useState(null)
  const[lastName,setLastName]=useState(null)
  const[phone,setPhone]=useState(null)
  const[email,setEmail]=useState(null)
  const[pass,setPass]=useState('')
  const[confirmPass,setConfirmPass]=useState("")
  const[show,setShow]=useState(false)
  const[danger,setDanger]=useState(true)
  const[dangerPass,setDangerPass]=useState(true)
  const[dangerConfPass,setDangerConfPass]=useState(true)
  const[err,setErr]=useState('')


  const add=()=>{
    axios.post(getApiUrl('seller/register'),{name:firstName,lastName:lastName,password:pass,email:email,phone:phone})
    .then(r=>{
      console.log(r.data)
      localStorage.setItem('id',r.data.id)
      router.push('/register/seller/secondStep')}).catch(err=>{if(err.response) setErr(err.response.data['err'])})
  }
  
  return (
    <div>
        <img className='absolute right-0 h-full w-1/2' src="/images/backgrounds/login-background.jpg" alt="" />
        
       <div className='flex mt-28 ml-40 absolute'>
        <IoPersonCircle size={45} color="#0000007a"/>
        <hr className='w-40 text-gray-400 h-1 bg-gray-200 mt-5'/>
        <HiDocumentText size={45} color="black"/>
        <hr className='w-40 text-gray-400 h-1 bg-gray-200 mt-5'/>
        <MdVerifiedUser size={45} color="black"/>

        </div>
        <div className='absolute right-0 h-full w-1/2 bg-black opacity-70'></div>
<h1 className=' text-gray-600 text-sm w-fit inline-block ml-[30%] mt-[4%]  '>Already a member</h1><Link href={'/login/seller'} className=' text-blue-500 underline text-[15px]'>Sign-in</Link>
        <div className='flex items-center ml-[10%] mt-[6%]'>
        <div className=''>
        <h1>1/3 Step</h1>
        <h1 className='text-[45px] mb-10'>Sign-up</h1>
       <div className='flex gap-4'>
        <div>
       <h1 className=''>First Name</h1><br/>
        <Input 
        onChange={(e:any)=>setFirstName(e.target.value)}
        type="text"
        placeholder='Mohammed'
        className=' w-[250px] h-[45px] bg-gray-50 pl-5 mb-5'
        />
        </div>
        <div>
        <h1 className='mb-6'>Last Name</h1>
        <Input 
        onChange={(e:any)=>setLastName(e.target.value)}
        type="text"
        placeholder='Ben Ali'
        className=' w-[250px] h-[45px] bg-gray-50 pl-5 mb-5'
        />
        </div>
        </div>
        <div className='flex gap-5'>
        <div>
        <h1 className='mb-5 flex items-center gap-2'>
          Phone
          <InfoTooltip 
            content="Enter your phone number. Must be 8 digits long. Format: +84961566302"
            position="top"
            iconSize="sm"
          />
        </h1>
        <Input 
        onChange={(e:any)=>{setPhone(e.target.value)
        if(e.target.value.length===8){
          setDanger(false)}
          else 
          setDanger(true)
        }}
        type="text"
        placeholder='+84961566302'
        color={danger?'danger':"success"}
        className=' w-[250px] h-[45px] bg-gray-50 pl-5 mb-5'
        />
        </div>
        <div>
        <h1 className='mb-5 flex items-center gap-2'>
          Email
          <InfoTooltip 
            content="Enter a valid email address. This will be used for account verification and notifications."
            position="top"
            iconSize="sm"
          />
        </h1>
        <Input 
        onChange={(e:any)=>setEmail(e.target.value)}
        type="email"
        placeholder='ahmed@gmail.com'
        className=' w-[250px] h-[45px] bg-gray-50 pl-5 mb-5'
        />
        </div>
        </div>
        <div className='flex gap-5'>

          <div>
        <h1 className='mb-5 flex items-center gap-2'>
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
        </h1>
    
      <Input
        onMouseEnter={()=>setShow(true)}
        onMouseLeave={()=>setShow(false)}
        
        type="password"
        placeholder="*******"
        startDecorator={<Key />}
        value={pass}
        onChange={(event:any) => {setPass(event.target.value)
        if(event.target.value.length>8 && (event.target.value.includes('#')||event.target.value.includes('@')||event.target.value.includes('?'))){
          setDangerPass(false)
        }
      else setDangerPass(true)}}
        color={dangerPass?"danger":"success"}
        
      />
       {show&& 
      <div className='top-[83%] w-[250px] flex justify-center items-center h-[120px] absolute rounded-[10px] border-black border-[3px] z-40 bg-white'>
        <div>
        <h1 className=' text-green-400'>Password must contain:</h1>
        <ul>
        
            <li className='text-[15px]'>more than 8 characters</li>
            <li className='text-[15px]'>at least contain #-?-@ symbols</li>
        </ul>
        </div>
        </div>
        }  
     
        </div>
        <div>
        <h1 className='mb-5 flex items-center gap-2'>
          Confirm Password
          <InfoTooltip 
            content="Re-enter your password to confirm. Both passwords must match exactly."
            position="top"
            iconSize="sm"
          />
        </h1>
       
      <Input
        type="password"
        placeholder="*******"
        startDecorator={<Key />}
        value={confirmPass}
        color={dangerConfPass?'danger':'success'}
        onChange={(event:any) =>{setConfirmPass(event.target.value)
        if(event.target.value===pass){
          setDangerConfPass(false)}
        else setDangerConfPass(true)}}
      />
     
        </div>
    </div>
    {err==="email in use"&&
    <Alert severity="error" className='mt-[5%] w-[250px]'>Email Already Exist!</Alert>
    }
   <button className="cta mt-[5%] ml-[80%]"
   
   onClick={()=>{

    add()
   
         
      
   
}}
   >
   
  <span className="hover-underline-animation"> Next </span>
  <svg
    id="arrow-horizontal"
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="10"
    viewBox="0 0 46 16"
  >
    <path
      id="Path_10"
      data-name="Path 10"
      d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
      transform="translate(30)"
    ></path>
  </svg>
</button>
        </div>
        </div>
    </div>
  )
}

export default FirstStep