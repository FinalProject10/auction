"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios'
const Services = () => {
  const [data,setData]=useState([])
  const[index,setIndex]=useState(0)
  useEffect(()=>{
    axios.get(`http://localhost:5000/dash/getReclam`).then(r=>{
    console.log(r.data)  
    setData(r.data)})
    .catch(err=>console.log(err))
  },[])
  const handleIndex=(value:any)=>{
    if(index===data.length-1){
      setIndex(0)
      return
    }
    if(index===0){
      setIndex(data.length-1)
      return
    }
    
    setIndex(value)
  }
  return (
    <>
    <div className='mt-[40px] bg-auto' style={{background:'url(https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_about.jpg?id=6765)',backgroundSize:'cover',height:'600px'}}>
   <div className=' w-[90%] ml-[5%] mb-[10%] grid grid-cols-[30%_70%]'  >
    <div className='mt-[50%]'>
        <h1 className='text-[#ff2800] font-[700] tracking-wider'>Find out Now</h1>
        <h1 className='text-[30px] font-[700] mb-[20%]'>User Testimonials: What Our Customers Are Saying</h1>
        <Link href={'/membershipCard'}><button className='text-black font-[800] border-[2px] border-black  mt-[1%] bg-white rounded w-[132px] h-[43px] hover:text-white hover:bg-[#ff2800] hover:border-none hover:transition ease-in-out delay-50 ' >Our Services</button></Link>

    </div>
    <div >
    <div 
       
        className='bg-white absolute  mt-[20%] flex justify-center items-center w-[50px] h-[50px] rounded-[5px]'>
<KeyboardArrowLeftIcon 
onClick={()=>{handleIndex(index-1)}}
fontSize={'large'} className='text-black' />
        </div>

        <div className='w-[95%] ml-[6%] h-[90%] flex justify-center items-center  mt-[15%] bg-white shadow-xl rounded-[20px] '>
    <div>
  <img src={data[index]&&data[index]['Client'].image} className='w-[80px] rounded-full ml-[45%]' alt="" />
  <h1 className='text-center mt-[3%] mb-[3%]'>{data[index]&&data[index]['Client'].name}</h1>
  <p className='p-[30px] text-[20px] font-[600]'>{data[index]&&data[index].message}</p>
  </div>

        </div>
        <div 
       
        className='bg-white absolute right-0 -mt-[16%] flex justify-center items-center w-[50px] h-[50px] rounded-[5px]'>
        <KeyboardArrowRightIcon 
        onClick={()=>{handleIndex(index+1)}}
        fontSize={'large'} className='text-black absolute'/>
        </div>

    </div>
   </div>
   

    </div>

<div className='bg-[#f7f7f7] w-full h-[100px]   flex justify-center items-center'>
<h1 className='text-[20px] font-[600] mr-[5%]'>Are You Certified Seller?</h1>
<Link href={'register/seller/firstStep'}><button className='text-white font-[800]  bg-[#ff2800] rounded w-[190px] h-[43px] float-right hover:text-black hover:bg-white hover:border-[2px] hover:border-black  hover:transition ease-in-out delay-50 '>Register As Vendor</button></Link>

</div>
</>
  )
}

export default Services