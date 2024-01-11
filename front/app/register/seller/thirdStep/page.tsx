'use client'
import React,{useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import img1 from '../../../images/img1.png'
import { IoPersonCircle } from "react-icons/io5";
import { HiDocumentText } from "react-icons/hi2";
import { MdVerifiedUser } from "react-icons/md";
import { useRouter } from 'next/navigation';

const ThirdStep = () => {
  const router=useRouter()
  
  return (
    <div>
        <img className='absolute right-0 h-full w-1/2' src="https://static01.nyt.com/images/2023/09/21/multimedia/21sp-cli-stadium-02-mljv/21sp-cli-stadium-02-mljv-articleLarge.jpg?quality=75&auto=webp&disable=upscale" alt="" />
       
     
        <div className='flex mt-20 ml-40 absolute'>
        <IoPersonCircle size={45} color="#00cf54"/>
        <hr className='w-40 text-gray-400 h-1 bg-black mt-5'/>
        <HiDocumentText size={45} color="#00cf54"/>
        <hr className='w-40 text-gray-400 h-1 bg-black mt-5'/>
        <MdVerifiedUser size={45} color="#0000007a"/>

        </div>
        <div className='absolute right-0 h-full w-1/2 bg-black opacity-70'></div>
<h1 className=' text-gray-600 text-sm w-fit inline-block ml-[30%] mt-[4%]'></h1><Link href={'/login/seller'} className=' text-blue-500 underline text-[15px]'>Sign-in</Link>
        <div className='flex items-center ml-[10%] mt-[6%]'>
        <div className=''>
        <h1>3/3 Step</h1>
        <h1 className='text-[45px] mb-10'>Sign-up</h1>
       <p>Application Submitted
Thanks for submitting your registration application! <br/>

You'll soon be receiving an email to confirm your registration submission.<br/> A member of our Customer Service team will now review your account<br/> application.

We will be in touch within 2 working days, <br/>please look out for an email from team@auction4cars-mail.com</p>
    
       <button 
       
       className='w-[150px] h-[45px] bg-black mb-5 text-white float-right'
       onClick={()=>router.push('/login/seller')}
       >Login</button>
        </div>
        </div>
    </div>
  )
}

export default ThirdStep