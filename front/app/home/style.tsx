"use client"
import Link from 'next/link'
import React, { useState,useEffect } from 'react'
import axios from 'axios'
const Style = () => {
    const[data,setData]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:5000/items/fetch-items').then(r=>{setData(r.data)}).catch(err=>console.log(err))
    },[])
    const filter0=(value:any)=>{
        const filtered=data.filter(el=>{
            return el.category===value
        })
        setData(filtered)
    }
  return (
    <div>
        <h1 className='text-[#ff2800] text-center font-[600] tracking-wider'>Find your Style</h1>
    <h1 className='text-[35px] text-center font-[800] mb-[30px]'>Search by Body Type</h1>
    <div className='flex justify-evenly flex-wrap content-evenly '>
        <div className='w-[320px] h-[200px] shadow-xl rounded-[10px] bg-white flex justify-center items-center mb-[35px]'>
            <div>
            <img 
            onClick={()=>filter0("Sedan")}
            className='w-[200px]' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ1.png" alt="" />
            <h1 className='font-[800] text-[25px] text-center'
            
            >Sedan</h1>
            </div>
        </div>
        <div className='w-[320px] h-[200px] shadow-xl rounded-[10px] bg-white flex justify-center items-center '>
            <div>
            <img 
            onClick={()=>filter0("SUV")}
            className='w-[200px]' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ2.png" alt="" />
            <h1 className='font-[800] text-[25px] text-center'>SUV</h1>
            </div>
        </div>
        <div className='w-[320px] h-[200px] shadow-xl rounded-[10px] bg-white flex justify-center items-center'>
            <div>
            <img 
            onClick={()=>filter0("Sports")}
            className='w-[200px]' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ3.png" alt="" />
            <h1 className='font-[800] text-[25px] text-center'>Sports</h1>
            </div>        
        </div>
        <div className='w-[320px] h-[200px] shadow-xl rounded-[10px] bg-white flex justify-center items-center'>
            <div>
            <img 
            onClick={()=>filter0("Convertible")}
            className='w-[200px]' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ4.png" alt="" />
            <h1 className='font-[800] text-[25px] text-center'>Convertible</h1>
            </div>
        </div>
        <div className='w-[320px] h-[200px] shadow-xl rounded-[10px] bg-white flex justify-center items-center'>
            <div>
            <img 
            onClick={()=>filter0("Compact")}
            className='w-[200px]' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ5.png" alt="" />
            <h1 className='font-[800] text-[25px] text-center'>Compact</h1>
            </div>
        </div>
        <div className='w-[320px] h-[200px] shadow-xl rounded-[10px] bg-white flex justify-center items-center'>
            <div>
            <img 
            onClick={()=>filter0("Pick-up")}
            className='w-[200px]' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ6.png" alt="" />
            <h1 className='font-[800] text-[25px] text-center'>Pick Up</h1>
            </div>
        </div>
        <div className='w-[320px] h-[200px] shadow-xl rounded-[10px] bg-white flex justify-center items-center '>
            <div>
            <img 
            onClick={()=>filter0("CrossOver")}
            className='w-[200px]' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ7.png" alt="" />
            <h1 className='font-[800] text-[25px] text-center'>Cross Over</h1>
            </div>
        </div>
        <div className='w-[320px] h-[200px] shadow-xl rounded-[10px] bg-white flex justify-center items-center'>
            <div>
            <img 
            onClick={()=>filter0("Electric")}
            className='w-[200px]' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_categ8.png" alt="" />
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