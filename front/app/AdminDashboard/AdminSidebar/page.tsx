"use client"
import React from 'react'
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaCreativeCommonsNc } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaInbox } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import Link from 'next/link';

const sideBare = () => {
   return (
    <div className="flex-row lg:flex">

      <div className="space-y-3">
        <div className="flex items-center justify-between">
   
        
        </div>
<div className="flex h-screen bg-gray-100">
<div className="hidden md:flex flex-col w-64 bg-gray-800">
    <div className="flex items-center justify-center h-16 bg-gray-900" style={{"height": "217px"}}>
        <span className="text-white font-bold uppercase">
        <img className='flex rounded-4 rounded-full   ' src="https://shorturl.at/cgFI5" alt="" 
        style={{"width": "170px",
    "height": "170px",
    "object-fit": "cover"}}/>
    <center>BeeT-Taa</center>
        </span>
    </div>
    <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 bg-gray-800">
        <Link href="/AdminDashboard/AdminHome">
        <div className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 ml-1">
            <FaHome/>
          <a style={{"margin-left":"15px"}}> 
                Home
            </a>
            </div> 
            </Link>
            <Link href="/AdminDashboard/AdminLIstProduct">
            <div className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 ml-1">
            <MdOutlineProductionQuantityLimits />
          <a style={{"margin-left":"15px"}}> 
                Product List
            </a>
            </div>
            </Link> 
            <Link href="/AdminDashboard/AdminClient(Bid)">
            <div className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 ml-1">
            <GiMoneyStack />
          <a style={{"margin-left":"15px"}}> 
                client can bid 
            </a>
            </div> 
            </Link>
            <Link href="/AdminDashboard/AdminClientNotBid">
            <div className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 ml-1">
            <FaCreativeCommonsNc />
          <a style={{"margin-left":"15px"}}> 
                client can't bid
            </a>
            </div> 
            </Link>
            <Link href="/AdminDashboard/AdminSellerBasic">
            <div className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 ml-1">
            <RiVerifiedBadgeFill />
          <a style={{"margin-left":"15px"}}> 
                Basic Seller
            </a>
            </div> 
            </Link>
            <Link href="/AdminDashboard/AdminSelerVip">
            <div  className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 ml-1">
            <FaCrown/>
            <a style={{"margin-left":"15px"}}>
               VIP Seller
            </a>
            </div>
            </Link>
            <Link href="/AdminDashboard/AdminReclamtion">
            <div  className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 ml-1">
            <FaInbox/>
            <a style={{"margin-left":"15px"}}>
               reclamation
            </a>
            </div>
            </Link>
        </nav>
    </div>
</div>
</div>
</div>
</div>

  )
  
}

export default sideBare