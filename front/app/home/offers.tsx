"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import img3 from '../images/img3.png'
import axios from 'axios'
const Offers = () => {
    const[users,setUsers]=useState(0)
    useEffect(()=>{
            axios.get('http://localhost:5000/getallusers').then(r=>setUsers(r.data.total))
            .catch(err=>console.log(err))
    },[])
  return (
    <div className='w-full h-[930px] bg-[#f2f2f2] mt-[15%] mb-[5%]'>
        <div className='flex justify-evenly w-full p-[50px]'>
            <div>
                <h1 className='text-[45px] font-[800]'>{users}</h1>
                <h1 className='text-[#ff2800] '> Registered members</h1>
            </div>
            <div>
                <h1 className='text-[45px] font-[800]'>5M</h1>
                <h1  className='text-[#ff2800] '> Inventory Sold</h1>
            </div>
            <div>
                <h1 className='text-[45px] font-[800]'>100%</h1>
                <h1 className='text-[#ff2800] '> Selling Price Received</h1>
            </div>
            <div>
                <h1 className='text-[45px] font-[800]'>4+</h1>
                <h1 className='text-[#ff2800] '> Satisfied Customers</h1>
            </div>
        </div>
        <hr className=' h-[10px] border-black border-dotted'/>
        <div className='grid grid-cols-2 '>
            <div className='ml-[10%] mt-[15%]'>
            <p className='font-bold text-[#ff2800] tracking-wider text-[14px] '> New Offers</p>
            <h1 className='font-[800] text-[30px] text-[#262626] mb-[10%]'>Exciting & Exclusive Auction Lot – Cars Ready for Bidding!</h1>
            <h1 className='text-[12px]'>Get ready to bid for the car of your dreams and experience the thrill of owning
a masterpiece on wheels! Find out bellow how to bid.</h1>
 <ul className='list-disc pl-10 mt-10'>
    <li><h1 className='font-[600] inline-block'>Year: </h1>2023</li>
    <li><h1 className='font-[600] inline-block'>Make: </h1>Mercedes-Benz</li>
    <li><h1 className='font-[600] inline-block'>Mileage: </h1>15,000 miles</li>
    <li><h1 className='font-[600] inline-block'>Color: </h1>Midnight Black</li>
    <li><h1 className='font-[600] inline-block'>Model: </h1>G AMG</li>
    <li><h1 className='font-[600] inline-block'>Condition: </h1>Excellent</li>
    <li><h1 className='font-[600] inline-block'>Engine: </h1> 3.0L V6 Twin Turbo</li>
    <li><h1 className='font-[600] inline-block'>Transmission: </h1> 8-Speed Automatic</li>
 </ul>
 <div className='flex gap-[20px] mt-[5%] ml-[3%]'>
 <button className='text-white font-[800] mt-[1%] bg-[#ff2800] rounded w-[132px] h-[43px] float-right hover:text-black hover:bg-white hover:border-[2px] hover:border-black  hover:transition ease-in-out delay-50 '>Submit Entry</button>
 <button className='text-black font-[800] border-[2px] border-black  mt-[1%] bg-white rounded w-[132px] h-[43px] float-right hover:text-white hover:bg-[#ff2800] hover:border-none hover:transition ease-in-out delay-50 '>View Slot</button>
 </div>

            </div>
            <div>
                <Image  src={img3} alt='' className='mt-[15%]'/>
            </div>
        </div>
    </div>
  )
}

export default Offers