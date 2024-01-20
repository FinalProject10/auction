"use client"
import React,{useState} from 'react'
import Link from 'next/link'
import { FaBasketShopping } from "react-icons/fa6";

const Navbar = () => {
   
    const[home,setHome]=useState(false)
    const[platform,setPlatform]=useState(false)
    const[shop,setShop]=useState(false)
    const[pages,setPages]=useState(false)
    const[cart,setCart]=useState(false)
  return (
    <div
    onMouseLeave={()=>{setHome(false);setPlatform(false);setShop(false);setPages(false);setCart(false)}}

    >
        <div 
        className=' w-full h-[54px] bg-[#262626] flex justify-center items-center gap-[80%]'>
        </div>
        <div className='flex items-center gap-[30px] text-[#333333] font-[600] mb-[25px]'>
            <img className='w-[120px] ml-[50px] mt-[15px] ' src="https://autobid.modeltheme.com/wp-content/themes/autobid/images/logo-autobid.svg" alt="" />
        <Link href={'/home'} className='mt-[1%] ml-[10%] hover:text-[#ff2800] transition ease-in-out delay-50 ' 
        onMouseEnter={()=>{setHome(true);setPlatform(false);setShop(false);setPages(false)}}
        >Home</Link>
        
        <h1  className='mt-[1%] cursor-pointer hover:text-[#ff2800] transition ease-in-out delay-50'
        onMouseEnter={()=>{setPlatform(true);setHome(false);setShop(false);setPages(false)}}
        >Platform</h1>
       
        <Link href={'/shop'} className='mt-[1%] hover:text-[#ff2800] transition ease-in-out delay-50'
        onMouseEnter={()=>{setShop(true);setHome(false);setPlatform(false);setPages(false)}}
        >Shop</Link>
        <h1 className='mt-[1%] cursor-pointer hover:text-[#ff2800] transition ease-in-out delay-50'
        onMouseEnter={()=>{setPages(true);setHome(false);setPlatform(false);setShop(false)}}
        >Pages</h1>
        <Link href={'/'} className='mt-[1%] hover:text-[#ff2800] transition ease-in-out delay-50'>Get In Touch</Link>
        <Link href={'/'} className='mt-[1%] hover:text-[#ff2800] transition ease-in-out delay-50'>Favorites</Link>
        <FaBasketShopping size={25} className='hover:text-[#ff2800] ml-[10%] mt-[1%] cursor-pointer'
        onMouseEnter={()=>setCart(true)}/>

        <button className='text-white font-[800] mt-[1%] bg-[#ff2800] rounded w-[132px] h-[43px] float-right hover:text-black hover:bg-white hover:border-[2px] hover:border-black hover:transition ease-in-out delay-50 '>Sell Now</button>
        </div>
        
       
        {platform&&<div
        onMouseLeave={()=>setPlatform(false)}
        className=' bg-white w-[900px] h-[367px] rounded-[20px] absolute top-[15%] left-[419px] grid grid-cols-2 mt-[10px]'>
            <div className='grid grid-cols-2 mt-[2%] ml-[2%] p-5'>
                <div className='mb-10'>
                <h1 className='font-[700] text-[30px] mb-[15px]'>Search Cars</h1>
                <div className='flex gap-[10px] mb-[15px]'>
                <img className='w-[20px]' src="https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-1.png" alt="" />
                <h1 className= 'cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50 '>Body</h1>
                </div>
                <div className='flex gap-[10px] mb-[15px]'>
                <img className='w-[20px]' src="https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-2.png" alt="" />
                <h1 className= 'cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50 '>Color</h1>
                </div>
                <div className='flex gap-[10px] mb-[15px]'>
                <img className='w-[20px]' src="https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-4.png" alt="" />
                <h1 className= 'cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50 '>Capacity</h1>
                </div>
                <div className='flex gap-[10px] mb-[15px]'>
                <img className='w-[20px]' src="https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-3.png" alt="" />
                <h1 className= 'cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50 '>Gearbox</h1>
                </div>
                <div className='flex gap-[10px] mb-[15px]'>
                <img className='w-[20px] h-[20px]' src="https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-5.png" alt="" />
                <h1 className= 'cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50 '>Climatisation</h1><br/>
                </div>
                <Link href={'/shop'}><button className='font-[700] text-[15px] text-[#ff2800]'>Explore All Categories</button></Link>

                </div>
                <div>
                <h1 className='font-[700] text-[30px] mb-[15px]'>Search Parts</h1>
                <div className='flex gap-[10px] mb-[15px]'>
                <img className='w-[20px]' src="https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-6.png" alt="" />
                <h1 className= 'cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50 '>Appointment</h1>
                </div>
                <div className='flex gap-[10px] mb-[15px]'>
                <img className='w-[20px]' src="https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-7.png" alt="" />
                <h1 className= 'cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50 '>Dimensions</h1>
                </div>
                <div className='flex gap-[10px] mb-[15px]'>
                <img className='w-[20px]' src="https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-8.png" alt="" />
                <h1 className= 'cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50 '>Manifacturer</h1>
                </div>
                <div className='flex gap-[10px] mb-[15px]'>
                <img className='w-[20px]' src="https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-9.png" alt="" />
                <h1 className= 'cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50 '>Material</h1>
                </div>
                <div className='flex gap-[10px] mb-[15px]'>
                <img className='w-[20px] h-[20px]' src="https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-10.png" alt="" />
                <h1 className= 'cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50 '>Weight</h1><br/>
                </div>
                </div>

            </div>
            <div style={{backgroundImage: 'url(https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)', 
  backgroundSize: 'cover',
  borderBottomRightRadius:'20px',
  borderTopRightRadius:'20px'}}></div>

        </div>}
       
        {shop&&<div className='text-[#333333] bg-white w-[150px] h-[144px] leading-[30px]	 pl-[1.5rem] pt-3 shadow-2xl absolute top-[16%] left-[35%] '
        onMouseLeave={()=>setShop(false)}
        >
           <Link href={'/shop'}> <h1 className= 'cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50'>Shop Page</h1></Link>
            <Link href={'/checkout'}> <h1 className='cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50'>Checkout</h1></Link>
           <Link href={'/CART'}> <h1 className='cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50'>Cart</h1></Link>
           <Link href={'/'}></Link> <h1 className='cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50'>My Account</h1>
        </div>}
        {pages&&<div className='text-[#333333] bg-white w-[170px] h-[144px] leading-[30px]	 pl-[1.5rem] pt-3 shadow-2xl absolute top-[16%] left-[40%] '
        onMouseLeave={()=>setPages(false)}
        >
            <h1 className= 'cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50'>How It Works</h1>
           <Link href={'/membershipCard'}> <h1 className='cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50'>Pricing Services</h1></Link>
          <Link href={'/aboutUs'}>  <h1 className='cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50'>About us</h1></Link>
            <h1 className='cursor-pointer text-[#333333] font-[600] hover:text-[#ff2800] transition ease-in-out delay-50'>404 Not Found</h1>
        </div>}
        {cart&&
        <div className='text-[#333333] bg-white w-[350px] h-[144px] pl-[1.5rem] pt-3 shadow-2xl absolute top-[16%] left-[70%] rounded-[20px]'
        onMouseLeave={()=>setCart(false)}
        >
            <h1 className= ' text-[#333333] font-[600] text-[30px] '>Cart</h1>
            <h1>No Product In The Cart!</h1>
           
        </div>
         } 
       

        
    </div>
  )
}

export default Navbar