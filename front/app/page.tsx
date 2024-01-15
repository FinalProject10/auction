"use client"
import { useState } from 'react'
import AboutUs from "./aboutUs/AboutUs.tsx"
import Image from 'next/image'
import Register from './register/seller/page'
import { useRouter } from 'next/navigation'
import Footer from "./footer/Footer.tsx"
import Pricing from "./membershipCard/Pricing.tsx"
import Cart from "./CART/cart.tsx"
export default function Home() {
  const [client,setClient]=useState(false)
  const [seller,setSeller]=useState(false)
  const router=useRouter()
  return (
   <div>
    {client&&
    <div
    onMouseEnter={()=>setClient(true)}
    onMouseLeave={()=>setClient(false)}
    className='absolute opacity-85 w-[50%] h-full left-0 z-30 bg-black'>
      <h1 
      onClick={()=>router.push('/login/client')}
      className='text-white text-center text-[40px] font-bold cursor-pointer animate-pulse absolute bottom-0 left-[30%]	'>Login as a client</h1>
      </div>
       }  
       {seller&&
    <div 
    onMouseEnter={()=>setSeller(true)}
    onMouseLeave={()=>setSeller(false)}
    className='absolute opacity-85 w-[50%] h-full right-0 z-10 bg-black'>
      <h1 
      onClick={()=>router.push('/login/seller')}
      className='text-white text-center text-[40px] font-bold cursor-pointer animate-pulse absolute bottom-0 left-[30%]	'>Login as a seller</h1>
      </div>
       }  
    <img 
    onMouseEnter={()=>setClient(true)}
    onMouseLeave={()=>setClient(false)}
    className='absolute top-0 left-0 w-[50%] h-full' src="https://dealerdotcom.webdamdb.com/embeddables/display.php?size=550&webid=gVE5hZYd9nT72gKZ" alt="" />
    
    <hr className='rotate-[90deg]'/>
    <img
    onMouseEnter={()=>setSeller(true)}
    onMouseLeave={()=>setSeller(false)}
    className='absolute top-0 right-0 w-[50%] h-full' src="https://group.mercedes-benz.com/bilder/unternehmen/chancengleichheit-und-inklusion/diversity-inclusion-03-w1680xh945-cutout.jpg" alt="" />

   </div>
  )
}
