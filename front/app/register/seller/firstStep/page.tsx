'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import img1 from '../../../images/img1.png'
import { IoPersonCircle } from "react-icons/io5";
import { HiDocumentText } from "react-icons/hi2";
import { MdVerifiedUser } from "react-icons/md";
import { useRouter } from 'next/navigation';

const FirstStep = () => {
  const router=useRouter()
  const[firstName,setFirstName]=useState(null)
  const[lastName,setLastName]=useState(null)
  const[phone,setPhone]=useState(null)
  const[email,setEmail]=useState(null)
  const[pass,setPass]=useState(null)
  const[confirmPass,setConfirmPass]=useState(null)
  const[verified,setVerified]=useState(false)
  const add=()=>{
    axios.post(`http://localhost:5000/seller/register`,{name:firstName,lastName:lastName,password:pass,email:email,telNumb:phone})
    .then(r=>setVerified(true)).catch(err=>console.log((err)))
  }
  return (
    <div>
        <img className='absolute right-0 h-full w-1/2' src="https://static01.nyt.com/images/2023/09/21/multimedia/21sp-cli-stadium-02-mljv/21sp-cli-stadium-02-mljv-articleLarge.jpg?quality=75&auto=webp&disable=upscale" alt="" />
        <Image  src={img1} className='absolute right-[17.25rem] rounded-xl top-[6rem] z-30'
        alt=''/>
     
        <div className='flex mt-20 ml-40 absolute'>
        <IoPersonCircle size={45} color="#0000007a"/>
        <hr className='w-40 text-gray-400 h-1 bg-gray-200 mt-5'/>
        <HiDocumentText size={45} color="black"/>
        <hr className='w-40 text-gray-400 h-1 bg-gray-200 mt-5'/>
        <MdVerifiedUser size={45} color="black"/>

        </div>
        <div className='absolute right-0 h-full w-1/2 bg-black opacity-70'></div>
<h1 className=' text-gray-600 text-sm w-fit inline-block ml-[30%] mt-[4%]'></h1><Link href={'/login/client'} className=' text-blue-500 underline text-[15px]'>Sign-in</Link>
        <div className='flex items-center ml-[10%] mt-[6%]'>
        <div className=''>
        <h1>1/3 Step</h1>
        <h1 className='text-[45px] mb-10'>Sign-up</h1>
       <div className='flex gap-4'>
        <div>
       <h1 className=''>Name</h1><br/>
        <input 
        onChange={(e:any)=>setFirstName(e.target.value)}
        type="text"
        placeholder='Enter Your Name'
        className=' w-[250px] h-[45px] bg-gray-50 pl-5 mb-5'
        />
        </div>
        <div>
        <h1 className='mb-6'>Last Name</h1>
        <input 
        onChange={(e:any)=>setLastName(e.target.value)}
        type="text"
        placeholder='Enter Your Last Name'
        className=' w-[250px] h-[45px] bg-gray-50 pl-5 mb-5'
        />
        </div>
        </div>
        <div className='flex gap-5'>
        <div>
        <h1 className='mb-5'>Phone</h1>
        <input 
        onChange={(e:any)=>setPhone(e.target.value)}
        type="text"
        placeholder='+216 . . .'
        className=' w-[250px] h-[45px] bg-gray-50 pl-5 mb-5'
        />
        </div>
        <div>
        <h1 className='mb-5'>Email</h1>
        <input 
        onChange={(e:any)=>setEmail(e.target.value)}
        type="email"
        placeholder='Enter Your Phone Email'
        className=' w-[250px] h-[45px] bg-gray-50 pl-5 mb-5'
        />
        </div>
        </div>
        <div className='flex gap-5'>

          <div>
        <h1 className='mb-5'>Password</h1>
         <input 
         onChange={(e:any)=>setPass(e.target.value)}
         type="password"
        placeholder='Enter Your Password'
        className=' w-[250px] h-[45px] bg-gray-50 pl-5 mb-5'
        />
        </div>
        <div>
        <h1 className='mb-5'>Confirm Password</h1>
         <input 
         onChange={(e:any)=>setConfirmPass(e.target.value)}
         type="password"
        placeholder='Confirm Your Password'
        className=' w-[250px] h-[45px] bg-gray-50 pl-5 mb-5'
        />
        </div>
    </div>
    <div className="w-full h-40 flex items-center justify-center cursor-pointer ml-[40%]"
    onClick={()=>{

        add()
        if(verified) router.push('/register/seller/secondStep')
    }}>
  <div
    className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group"
  >
    <span
      className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"
    ></span>
    <span
      className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        className="w-5 h-5 text-green-400"
      >
        <path
          d="M14 5l7 7m0 0l-7 7m7-7H3"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
        ></path>
      </svg>
    </span>
    <span
      className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        className="w-5 h-5 text-green-400"
      >
        <path
          d="M14 5l7 7m0 0l-7 7m7-7H3"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
        ></path>
      </svg>
    </span>
    <span
      className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200"
      >Next</span>
  </div>
</div>
        </div>
        </div>
    </div>
  )
}

export default FirstStep