'use client'
import React, { useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import img1 from '../../../images/img1.png'
import Image from 'next/image'
import { IoPersonCircle } from "react-icons/io5";
import { HiDocumentText } from "react-icons/hi2";
import { MdVerifiedUser } from "react-icons/md";
import { useRouter } from 'next/navigation';
import cloudinary from 'cloudinary-core';
import { useState } from 'react'
import { CldImage } from 'next-cloudinary';

const SecondStep = () => {
  const router=useRouter()
  const [cin, setCin] = useState("");
  const [grise,setGrise]=useState("")
  const add=()=>{
    axios.post(`http://localhost:5000/seller/register`,{batinda:grise,cinNumb:cin})
    .then(r=>router.push('/register/seller/thirdStep')
    ).catch(err=>console.log(err))
  }
// const cloudinaryInstance = cloudinary.Cloudinary.new({ cloud_name: 'djptnmqtl' });
  // cloudinaryInstance.upload(selectedFile, (error:any, result:any) => {
  //   if (error) {
  //     console.error(error);
  //     alert('Error uploading image. Please try again.');
  //   } else {
  //     console.log(result);
  //           const imageUrl = result.secure_url;
  //     alert('Image uploaded successfully!\n' + imageUrl);
  //   }
  // });

  return (
    <div>
        <img className='absolute right-0 h-full w-1/2' src="https://static01.nyt.com/images/2023/09/21/multimedia/21sp-cli-stadium-02-mljv/21sp-cli-stadium-02-mljv-articleLarge.jpg?quality=75&auto=webp&disable=upscale" alt="" />
        <Image  src={img1} className='absolute right-[17.25rem] rounded-xl top-[6rem] z-30'
        alt=''/>
        <div className='flex mt-20 ml-40 absolute'>
        <IoPersonCircle size={45} color="#00cf54"/>
        <hr className='w-40 text-gray-400 h-1 bg-black mt-5'/>
        <HiDocumentText size={45} color="#0000007a"/>
        <hr className='w-40 text-gray-400 h-1 bg-gray-200 mt-5'/>
        <MdVerifiedUser size={45} color="black"/>
        </div>
        <div className='absolute right-0 h-full w-1/2 bg-black opacity-70'></div>
<h1 className=' text-gray-600 text-sm w-fit inline-block ml-[30%] mt-[4%]'></h1><Link href={'/login/seller'} className=' text-blue-500 underline text-[15px]'>Sign-in</Link>
        <div className='flex items-center ml-[10%] mt-[6%]'>
        <div className=''>
        <h1>2/3 Step</h1>
        <h1 className='text-[45px] mb-10'>Sign-up</h1>
        <div className='w-[500px] h-[150px] mb-10 bg-gray-100 flex justify-center items-center'>
        <div>
        <h1 className='font-bold text-[20px]'>Cin Image</h1>
       <input 
       type="file"
       onChange={(e:any)=>{
        console.log(e) 
        setCin(e.target.value)
      }} />

      </div>
      </div>
      <div className='w-[500px] h-[150px] bg-gray-100 flex justify-center items-center'>
      <div>
      <h1 className='font-bold text-[20px]'>Car Paper (carte grise)</h1>
      <input type="file" 
       onChange={(e:any)=>{
        console.log(e) 
         setGrise(e.target.value)
      }} />
      </div>
       </div>
       <button className="cta mt-[5%] ml-[80%]"
   
   onClick={()=>{
    add()}}
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

export default SecondStep