"use client"
import React from 'react'
import "./cart.css"
import Navbar from "../home/navbar"
import { IoIosCard } from "react-icons/io";
import Link from 'next/link';

const Cart = () => {
  return (

    <div>
    <Navbar/>
      <div >
      <div className="bg-[#F2F2F2] h-[170px] w-full">
        <div className="pl-[6%] pt-[3%]">
          <Link href={"/home"}>
            {" "}
            <h1 className="text-[#999999] inline-block mb-[2%]">Home / </h1>
          </Link>
          <span className="text-[#999999]">Cart</span>
          <h1 className="text-[35px] font-[700]">Cart</h1>
        </div>
      </div>

    <div className='step_cart mt-[3%] '>
      <div className='first_step'>1</div>
      <div className='cart_space'></div>
      <div className='other_step'>2</div>
      <div className='other_space'></div>
      <div className='other_step'>3</div>
    </div>
<div className='text_step_cart mb-[3%] mt-[5px]'>
<h5 className='text_step'>MY CART</h5>
<h5 className='ml-[4%] text_step'>CHECKOUT</h5>
<h5 className='text_step'>ORDER SUMMARY</h5>
</div>

    
    <div className='border-t-[2px] border-[red]  w-[90%] ml-[5%] boxWithShadow'>
<IoIosCard className='icon' /> 
  <h3 className='text-[15px] text_cart'>Your cart is currently empty.</h3>
</div>
<button className='text-white font-[800] ml-[5%] mt-[3%] bg-[#ff2800] rounded w-[132px] h-[43px] float-start hover:text-black hover:bg-white hover:border-[2px] hover:border-black hover:transition ease-in-out delay-50 '>Return To Shop</button>
</div>

    </div>
  )
}

export default Cart