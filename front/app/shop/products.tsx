"use client"
import { FaHammer } from "react-icons/fa";

import React, { useState } from 'react'
import { TbLayoutGrid } from "react-icons/tb";
import { FaRegListAlt } from "react-icons/fa";
import { Select, Option } from "@material-tailwind/react";
import { dividerClasses } from "@mui/material";

const Products = () => {
    const[flex,setFlex]=useState(true)
  return (
    <div className='w-[90%] m-[5%] h-[800px] flex gap-[5%]'>
        <div className='w-[329px] h-[1691px] shadow-2xl rounded-[20px] p-[3%] inline-block'>
        <h1 className=' font-[700] text-[30px] mb-[3%]'>Filters:</h1>
        <h1 >Car Models</h1>
        <div className='flex justify-between mb-[1%]'>
            <h1>Audi </h1>
            <h1>(5)</h1>
            </div>
            <hr className=' border-dotted'/>
            <div className='flex justify-between'>
            <h1>BMW </h1>
            <h1>(6)</h1>
            </div>
            <hr className=' border-dotted'/>
            <div className='flex justify-between'>
            <h1>Dacia </h1>
            <h1>(3)</h1>
            </div>
            <hr className=' border-dotted'/>
            <div className='flex justify-between'>
            <h1>Ford </h1>
            <h1>(3)</h1>
            </div>
            <hr className=' border-dotted'/>
            <div className='flex justify-between'>
            <h1>Lamborghini </h1>
            <h1>(1)</h1>
            </div>





        </div>
    <div className='w-[1090px] h-[1500px] bg-gray-200'>
    <div className='flex justify-between'>
    <div className='flex gap-[20px]' >
    <div className='flex cursor-pointer'>

    <div className=' w-[40px] h-[31px] bg-[#ff2800] flex justify-center items-center rounded-l-[3px] '>
    <TbLayoutGrid size={20} color='white' onClick={()=>{setFlex(true)}}/>
        </div>
        <div className='w-[40px] h-[31px] bg-white flex justify-center items-center rounded-r-[3px] hover:bg-[#ff2800] hover:text-white transition-all'>
    <FaRegListAlt size={20} className='text-[#ff2800] ' onClick={()=>{setFlex(false)}}/>
    </div>
    </div> 
    <h1>       Showing</h1>
    </div>
    <div>
    <Select  placeholder={'qs'} label='Default Sorting'>
        <Option>Material Tailwind HTML</Option>
        <Option>Material Tailwind React</Option>
        <Option>Material Tailwind Vue</Option>
        <Option>Material Tailwind Angular</Option>
        <Option>Material Tailwind Svelte</Option>
      </Select>
    </div>


    </div>
    {flex?<div className='flex justify-between mt-[3%] flex-wrap'>
    <div className=' w-[33%] h-[10%] bg-white rounded-3xl border-[2px]  shadow-2xl'>
            <div style={{background:'url("https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-6-500x317.jpg")',backgroundSize:'cover'}}  className='w-[315px] h-[190px]  rounded-t-3xl overflow-hidden'>
            <div className="flex justify-evenly mt-[50%]">
            <div>
                <h1 className="text-white font-[700]">44 Days</h1>
            </div>
            <div className="flex justify-center items-center  w-[30px] h-[30px] rounded-[5px] hover:bg-[#ff2800]  transition-all">
            <FaHammer   size={25} className='text-white cursor-pointer'/>
            </div>

            </div>
            </div>
            <div className='p-[15px] text-[#333333]'>
            <h1 className='cursor-pointer hover:text-[#ff2800] text-[20px] font-[600]'>Tesla Model 3</h1>
            <h1 className='mb-[10px] font-[500]'>2018 · 121 787 km · 2 995 cm3 · Diesel</h1>
            

            <h1 className='font-[300] text-[13px]'>Auction Ended</h1>
            </div>
    </div>
    
 
    </div>:<div className="grid">
    <div className="w-full h-[198px]  rounded-[10px] bg-white flex">
        <div 
        className="w-[313px] h-full rounded-l-[10px] inline-block"
        style={{background:'url("https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-6-500x317.jpg")',backgroundSize:'cover'}}>
            <div className="flex justify-center items-center rounded-[10px] w-[100px] h-[40px]  ml-[5%]  backdrop-blur-[50px]	text-white">
                <h1 >44 days</h1>
                </div>
        </div>
        <div className="mt-[5%] ml-[5%]">
        <h1 className='cursor-pointer hover:text-[#ff2800] text-[20px] font-[600]'>Tesla Model 3</h1>

        <h1 className='mb-[10px] font-[500]'>2018 · 121 787 km · 2 995 cm3 · Diesel</h1>
        <h1 className='font-[300] text-[13px]'>Auction Ended</h1>

        </div>
    </div>
        </div>}
    
        </div>
    </div>
  )
}

export default Products