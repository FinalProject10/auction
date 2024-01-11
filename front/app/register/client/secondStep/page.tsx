'use client'
import React from 'react'
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
const SecondStep = () => {
  const router=useRouter()
  // const [selectedFile, setSelectedFile] = useState(null);
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
<h1 className=' text-gray-600 text-sm w-fit inline-block ml-[30%] mt-[4%]'></h1><Link href={'/login/client'} className=' text-blue-500 underline text-[15px]'>Sign-in</Link>
        <div className='flex items-center ml-[10%] mt-[6%]'>
        <div className=''>
        <h1>2/3 Step</h1>
        <h1 className='text-[45px] mb-10'>Sign-up</h1>
       <input type="file" 
       onChange={(e:any)=>{
        console.log(e) 
        // setSelectedFile(e.target.value)
      }} />
       
       <button className='w-[150px] h-[45px] bg-black mb-5 text-white float-right'
       onClick={()=>router.push('/register/client/thirdStep')}>Next</button>
        </div>
        </div>
    </div>
  )
}

export default SecondStep