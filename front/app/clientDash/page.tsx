'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../home/navbar'
import Link from 'next/link'
import Footer from '../footer/Footer'
import { GiFlatHammer } from "react-icons/gi";
import { IoStatsChart } from "react-icons/io5";
import { dividerClasses } from '@mui/material'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { API_URL } from '../../utils/api'

const Dashboard = () => {
  const[show,setShow]=useState([true,false,false,false])
  const[data,setData]=useState([true,false,false,false])
  const[fname,setFname]=useState("")
  const[lname,setLname]=useState("")
  const[email,setEmail]=useState('')
  const[newPass,setNewpass]=useState("")
  interface CarItem {
    id?: number;
    name: string;
    short_description?: string;
    images?: string[];
    timeEnd?: string | Date;
    [key: string]: any;
  }
  const[cars,setCars]=useState<CarItem[]>([])
  interface BidItem {
    createdAt?: string | Date;
    bidAmount?: number;
    item: {
      id?: number;
      name?: string;
      [key: string]: any;
    };
    [key: string]: any;
  }
  const[bids,setBids]=useState<BidItem[]>([])
  const[page,setPages]=useState(1)
  const[ended,setEnded]=useState<CarItem[]>([])
  const id=typeof window !== 'undefined' ? parseInt(localStorage.getItem('userId') || '0') : 0

  const add=()=>{
    axios.put(`${API_URL}/client/update/${id}`,{name:fname,lastName:lname,email,newPass:newPass}).then(r=>console.log(r))
    .catch(err=>console.log(err))
  }
  useEffect(()=>{
    axios.get(`${API_URL}/items/itemsBided/${id}`).then(r=>{
    setCars(r.data as CarItem[])
    
    })
    .catch(err=>console.log(err))
  },[])
  useEffect(()=>{
    axios.get(`${API_URL}/bid/fetch-items/${id}?page=${page}`)
    .then(r=>setBids((prev)=>[...prev,...(r.data as BidItem[])])).catch(err=>console.log(err))
  },[page])
  useEffect(()=>{
    axios.get(`${API_URL}/items/items-winner/${id}`).then(r=>setEnded(r.data as CarItem[]))
    .catch(err=>console.log(err))
  },[])
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
// console.log(currentTime)
//     return () => clearInterval(intervalId); // Clean up interval on component unmount
//   }, [currentTime]);
// console.log(cars)
  const router=useRouter()
  return (
    <div>
        <Navbar/>
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 border-b border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href={"/home"} className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Dashboard</span>
          </nav>
          <h1 className="text-4xl font-bold text-gray-900">My Account</h1>
        </div>
      </div>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid mb-10 gap-8 lg:grid-cols-[300px,1fr]'>
          <div className='card p-0 overflow-hidden'>
            <div 
              onClick={()=>{setShow([true,false,false,false]);setData([true,false,false,false])}} 
              className={`w-full px-4 py-4 cursor-pointer transition-all ${
                show[0] ? 'bg-primary text-white' : 'hover:bg-gray-50'
              }`}
            >
              <h1 className='font-semibold text-lg'>Dashboard</h1>
            </div>
            <div 
              onClick={()=>{setShow([false,true,false,false]);setData([false,true,false,false])}} 
              className={`w-full px-4 py-4 cursor-pointer transition-all border-t border-gray-200 ${
                show[1] ? 'bg-primary text-white' : 'hover:bg-gray-50'
              }`}
            >
              <h1 className='font-medium'>Account Details</h1>
            </div>
            <div 
              onClick={()=>{setShow([false,false,true,false]);setData([false,false,true,false])}} 
              className={`w-full px-4 py-4 cursor-pointer transition-all border-t border-gray-200 ${
                show[2] ? 'bg-primary text-white' : 'hover:bg-gray-50'
              }`}
            >
              <h1 className='font-medium'>My Auction Bids</h1>
            </div>
            <div 
              onClick={()=>{setShow([false,false,false,true]);setData([false,false,false,true])}} 
              className={`w-full px-4 py-4 cursor-pointer transition-all border-t border-gray-200 ${
                show[3] ? 'bg-primary text-white' : 'hover:bg-gray-50'
              }`}
            >
              <h1 className='font-medium'>My Auction Activity</h1>
            </div>
            <div 
              onClick={()=>{
                localStorage.clear()
                router.push('/')
              }} 
              className='w-full px-4 py-4 cursor-pointer transition-all border-t border-gray-200 hover:bg-red-50 hover:text-red-600'
            >
              <h1 className='font-medium'>Log Out</h1>
            </div>
          </div>
       {data[0]&& <div>
          <h1 className='mb-[2%]'>Hello {localStorage.getItem('role')} not {localStorage.getItem('role')} <Link href={'/'} onClick={()=>localStorage.clear()}>Log out</Link> </h1>
          <h1 className='mb-[3%]'>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</h1>
          <h1 className='font-[600] text-[30px] mb-[3%]'>Auction Quick Links</h1>
          <div className='flex gap-[10%]'>
            <div className='mb-[3%] flex justify-center items-center w-[219px] h-[118px] rounded-[8px] border-[1px] border-[#ddd]'>
            <div>
            <GiFlatHammer size={35} className='ml-[30%]'/>
           <Link href={''}> <h1 className='font-[600]' onClick={()=>{setShow([false,false,true,false]);setData([false,false,true,false])}}>My Auction Bids</h1></Link>
            </div>
            </div>
            <div className='flex justify-center items-center w-[219px] h-[118px] rounded-[8px] border-[1px] border-[#ddd]'>
            <div>
            <IoStatsChart size={35} className='ml-[30%]'/>
           <Link href={''}> <h1 className='font-[600]' onClick={()=>{setShow([false,false,false,true]);setData([false,false,false,true])}}>My Auction Activity</h1></Link>
            </div>
            </div>

          </div>
          {/* <div className=' w-full -[60px] border-[1px] border-gray-200 p-4 flex justify-between' >
              <div>
              <h1>Become a Vendor</h1>
              <h1>Vendors can sell products and manage a store with a vendor dashboard.</h1>
              </div>
              <button className='bg-[#242424] text-[#ff2800] text-[12px] h-[30px] mt-[20px] hover:text-[white] transition-all'>Become A Vendor</button>
          </div> */}
        </div>}
        {data[1]&& 
        <div>
          <div className='flex gap-[5%] mb-[5%]'>
            <div>
            <h1>First Name*</h1>
            <input 
            onChange={(e:any)=>setFname(e.target.value)}
            type="text" className='w-[431px] p-4 h-[52px] border-[1px] border-gray-300 rounded' />
            </div>
            <div>
            <h1>Last Name*</h1>
            <input 
            onChange={(e:any)=>setLname(e.target.value)}
            type="text" className='w-[431px] p-4 h-[52px] border-[1px] border-gray-300 rounded' />
            </div>
          </div>
          <div className='mb-[3%]'>
            <h1>Email Adress</h1>
            <input 
            onChange={(e:any)=>setEmail(e.target.value)}
            type="text" className='w-[925px] p-4 h-[52px] border-[1px] border-gray-300 rounded' />

          </div>
          <div >
            <h1 className='font-[600] text-[25px] text-gray-700 mb-[5%]' >Password Change</h1>
            <div >
            <h1>Current Password</h1>
            <input type="password" className='mb-[3%] w-[925px] p-4 h-[52px] border-[1px] border-gray-300 rounded' />

            </div>
            <div >
            <h1>New Password</h1>
            <input 
            onChange={(e:any)=>setNewpass(e.target.value)}
            type="password" className='mb-[3%] w-[925px] p-4 h-[52px] border-[1px] border-gray-300 rounded' />

            </div>
            <div >
            <h1>Confirm New Password</h1>
            <input type="password" className='mb-[3%] w-[925px] p-4 h-[52px] border-[1px] border-gray-300 rounded' />

            </div>
            <button 
            onClick={()=>add()}
            className='text-white font-[800] mt-[1%] bg-[#ff2800] rounded w-[132px] h-[43px] float-right hover:text-black hover:bg-white hover:border-[2px] hover:border-black hover:transition ease-in-out delay-50 ml-[15%]'>Save</button>

          </div>
          </div>
         } 
         {data[2]&&<div>

          <h1 className='font-[800] text-[20px] mb-[3%]'>Active Auctions</h1>
          <div className='flex gap-[2%]   w-[100%] h-auto top-[150%] flex-wrap '>
{/* map HERE */}
          
         {cars.length===0?<h1>No Product Yet</h1>:cars.map((el: CarItem, index: number) => ( <div key={el.id || index} className=' w-[23%] h-[30%] rounded-3xl mb-[2%] border-[2px]  shadow-2xl'>
            <img className='w-[350px] hover:w-[351px] transition-all rounded-t-3xl overflow-hidden' src={el.images&&el.images[0]} 
            alt="" />
            <div className='p-[15px] text-[#333333]'>
             <h1 className='cursor-pointer hover:text-[#ff2800] text-[20px] font-[600]'
            onClick={()=>router.push(`/item/${el.id}`)}
            >
              {el.name} 
              </h1>
            <h1 className='mb-[10px] font-[500]'>
            {el.short_description}
              </h1>
            <h1 className='font-[300] text-[13px]'>
               {el.timeEnd ? Math.floor(((new Date(el.timeEnd).getTime()-new Date().getTime())>0?(new Date(el.timeEnd).getTime()-new Date().getTime()):0)/3600000) : 0} 
              h</h1>
            </div>
            </div>))}
        </div>
          <h1 className='font-[800] text-[20px] mb-[]'>Won Auctions</h1>
          <div className='flex gap-[2%]   w-[100%] h-auto top-[150%] flex-wrap '>
            {/* map HERE */}

           {ended?.map((el: CarItem, index: number) => ( 
           <div key={el.id || index} className=' w-[23%] h-[30%] rounded-3xl mb-[2%] border-[2px]  shadow-2xl'>
            <img className='w-[350px] hover:w-[351px] transition-all rounded-t-3xl overflow-hidden' src={el.images&&el.images[0]} 
            alt="" />
            <div className='p-[15px] text-[#333333]'>
            <h1 className='cursor-pointer hover:text-[#ff2800] text-[20px] font-[600]'
        
            >
              {el.name}
              </h1>
            <h1 className='mb-[10px] font-[500]'>
              {el.short_description}
              </h1>
            <h1 className='font-[300] text-[13px]'>
               Auction
              </h1>
            </div>
        </div>))}
</div>
         </div>}
         {data[3]&&<div>
          <h1 className='font-[800] text-[20px] mb-[3%]'>My Auction Activity</h1>
          <div className='w-full flex font-[600] text-center'>
            <div className='w-[33%] h-[40px] border-[1px] border-gray-200'>Date</div>
            <div className='w-[33%] h-[40px] border-[1px] border-gray-200'>Auction</div>
            <div className='w-[33%] h-[40px] border-[1px] border-gray-200'>Bid</div>
          </div>
          {/* map HERE */}
          { bids.map((el: BidItem, index: number) => (
          <div key={index} className='w-full flex font-[600] bg-[#e5f2e5]'>
            <div className='w-[33%] h-[40px] border-[1px] border-gray-200 flex justify-center items-center'>{el.createdAt ? new Date(el.createdAt).toLocaleString() : ''}</div>
            <div className='w-[33%] h-[40px] border-[1px] border-gray-200 flex justify-center items-center text-[red] cursor-pointer' onClick={()=>router.push(`/item/${el.item.id}`)}>{el.item.name||''}</div>
            <div className='w-[33%] h-[40px] border-[1px] border-gray-200 flex justify-center items-center'>{el.bidAmount||0}$</div>
        
         
          </div>))}
          <button className='mt-[25px] bg-black text-white rounded w-[120px] h-[40px]' onClick={()=>setPages(page+1)}>See More</button>
          {/*  */}
         </div>}
        </div>
         
         
      </div>
    </div>
  )
}

export default Dashboard