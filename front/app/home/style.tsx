"use client"
import Link from 'next/link'
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const Style = () => {
   const router=useRouter()
  return (
    <div>
        <h1 className='text-[#ff2800] text-center font-[600] tracking-wider'>Find your Style</h1>
    <h1 className='text-[35px] text-center font-[800] mb-[30px]'>Search by Body Type</h1>
    <div className='flex justify-evenly flex-wrap content-evenly '>
        <div className='w-[320px] h-[200px] shadow-xl rounded-[10px] bg-white flex justify-center items-center mb-[35px]'>
            <div>
            <img
            onClick={()=>{
                localStorage.setItem('category','sedan')
                router.push('/shop')
            }} 
            className='w-[200px] cursor-pointer hover:-translate-y-1 transition-all' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ1.png" alt="" />
            <h1 className='font-[800] text-[25px] text-center'
            
            >Sedan</h1>
            </div>
        </div>
        <div className='w-[320px] h-[200px] shadow-xl rounded-[10px] bg-white flex justify-center items-center '>
            <div>
            <img 
             onClick={()=>{
                localStorage.setItem('category','suv')
                router.push('/shop')
            }} 
            className='w-[200px] cursor-pointer hover:-translate-y-1 transition-all' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ2.png" alt="" />
            <h1 className='font-[800] text-[25px] text-center'>SUV</h1>
            </div>
        </div>
        <div className='w-[320px] h-[200px] shadow-xl rounded-[10px] bg-white flex justify-center items-center'>
            <div>
            <img 
             onClick={()=>{
                localStorage.setItem('category','sports')
                router.push('/shop')
            }} 
            className='w-[200px] cursor-pointer hover:-translate-y-1 transition-all' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ3.png" alt="" />
            <h1 className='font-[800] text-[25px] text-center'>Sports</h1>
            </div>        
        </div>
        <div className='w-[320px] h-[200px] shadow-xl rounded-[10px] bg-white flex justify-center items-center'>
            <div>
            <img 
             onClick={()=>{
                localStorage.setItem('category','convertible')
                router.push('/shop')
            }} 
            className='w-[200px] cursor-pointer hover:-translate-y-1 transition-all' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ4.png" alt="" />
            <h1 className='font-[800] text-[25px] text-center'>Convertible</h1>
            </div>
        </div>
        <div className='w-[320px] h-[200px] shadow-xl rounded-[10px] bg-white flex justify-center items-center'>
            <div>
            <img 
             onClick={()=>{
                localStorage.setItem('category','compact')
                router.push('/shop')
            }} 
            className='w-[200px] cursor-pointer hover:-translate-y-1 transition-all' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ5.png" alt="" />
            <h1 className='font-[800] text-[25px] text-center'>Compact</h1>
            </div>
        </div>
        <div className='w-[320px] h-[200px] shadow-xl rounded-[10px] bg-white flex justify-center items-center'>
            <div>
            <img 
             onClick={()=>{
                localStorage.setItem('category','pickup')
                router.push('/shop')
            }} 
            className='w-[200px] cursor-pointer hover:-translate-y-1 transition-all' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ6.png" alt="" />
            <h1 className='font-[800] text-[25px] text-center'>Pick Up</h1>
            </div>
        </div>
        <div className='w-[320px] h-[200px] shadow-xl rounded-[10px] bg-white flex justify-center items-center '>
            <div>
            <img 
             onClick={()=>{
                localStorage.setItem('category','crossover')
                router.push('/shop')
            }} 
            className='w-[200px] cursor-pointer hover:-translate-y-1 transition-all' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ7.png" alt="" />
            <h1 className='font-[800] text-[25px] text-center'>Cross Over</h1>
            </div>
        </div>
        <div className='w-[320px] h-[200px] shadow-xl rounded-[10px] bg-white flex justify-center items-center'>
            <div>
            <img 
             onClick={()=>{
                localStorage.setItem('category','electirc')
                router.push('/shop')
            }} 
            className='w-[200px] cursor-pointer hover:-translate-y-1 transition-all' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ8.png" alt="" />
            <h1 className='font-[800] text-[25px] text-center'>Electric</h1>
            </div>
        </div>

    </div>
    <Link href={'/shop'}><button className='text-white font-[400] bg-[#ff2800] rounded w-[150px]  h-[43px] ml-[45%] mt-[3%] hover:text-black hover:bg-white hover:border-[2px] hover:border-black  hover:transition ease-in-out delay-50 '>Check Our Shop</button>
    </Link>
    </div>
  )
}

export default Style