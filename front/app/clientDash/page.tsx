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
const Dashboard = () => {
  const[show,setShow]=useState([true,false,false,false])
  const[data,setData]=useState([true,false,false,false])
  const[fname,setFname]=useState("")
  const[lname,setLname]=useState("")
  const[email,setEmail]=useState('')
  const[newPass,setNewpass]=useState("")
  const[cars,setCars]=useState([])
  const[bids,setBids]=useState([])
  const[page,setPages]=useState(1)
  const[ended,setEnded]=useState([])
  const id=parseInt(localStorage.getItem('userId'))

  const add=()=>{
    axios.put(`http://localhost:5000/client/update/${id}`,{name:fname,lastName:lname,email,newPass:newPass}).then(r=>console.log(r))
    .catch(err=>console.log(err))
  }
  useEffect(()=>{
    axios.get(`http://localhost:5000/items/itemsBided/${id}`).then(r=>{
    setCars(r.data)
    
    })
    .catch(err=>console.log(err))
  },[])
  useEffect(()=>{
    axios.get(`http://localhost:5000/bid/fetch-items/${id}?page=${page}`)
    .then(r=>setBids((prev)=>[...prev,...r.data])).catch(err=>console.log(err))
  },[page])
  useEffect(()=>{
    axios.get(`http://localhost:5000/items/items-winner/${id}`).then(r=>setEnded(r.data))
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
        <div className="bg-[#F2F2F2] h-[170px] w-full">
        <div className="pl-[6%] pt-[3%]">
          <Link href={"/home"}>
            {" "}
            <h1 className="text-[#999999] inline-block mb-[2%]">Home / </h1>
          </Link>
          <span className="text-[#999999]">dashboard</span>
          <h1 className="text-[35px] font-[700]">My Account</h1>
        </div>
      </div>
      <div className='grid mb-[10%] gap-[30px] grid-cols-[411px,auto] w-[90%] ml-[5%] mt-[5%]'>
        <div className=' shadow-2xl h-fit'>
          <div onClick={()=>{setShow([true,false,false,false]);setData([true,false,false,false])}} className='w-full h-[55px] hover:text-[#ff2800] hover:bg-white border-b-[1px] border-white  cursor-pointer' style={{color:show[0]?'#ff2800':'white',backgroundColor:show[0]?'white':'#ff2800'}}> <h1 className='p-3 font-[500] text-[20px]'>Dashboard</h1></div>
          <div onClick={()=>{setShow([false,true,false,false]);setData([false,true,false,false])}} className='w-full h-[55px] border-b-[1px] border-white cursor-pointer' style={{color:show[1]?'#ff2800':'white',backgroundColor:show[1]?'white':'#ff2800'}}> <h1 className='p-3 font-[400] text-[20px]'>Account Details</h1></div>
          <div onClick={()=>{setShow([false,false,true,false]);setData([false,false,true,false])}} className='w-full h-[55px] border-b-[1px] border-white cursor-pointer' style={{color:show[2]?'#ff2800':'white',backgroundColor:show[2]?'white':'#ff2800'}}> <h1 className='p-3 font-[400] text-[20px]'>My Auction Bids</h1></div>
          <div onClick={()=>{setShow([false,false,false,true]);;setData([false,false,false,true])}} className='w-full h-[55px] border-b-[1px] border-white cursor-pointer' style={{color:show[3]?'#ff2800':'white',backgroundColor:show[3]?'white':'#ff2800'}}> <h1 className='p-3 font-[400] text-[20px]'>My Auction Activity</h1></div>
<div onClick={()=>{
  localStorage.clear()
  router.push('/')}} className='w-full h-[55px] border-b-[1px] border-white cursor-pointer' style={{color:show[4]?'#ff2800':'white',backgroundColor:show[4]?'white':'#ff2800'}}> <h1 className='p-3 font-[400] text-[20px]'>Log Out</h1></div>
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
          
         {cars.length===0?<h1>No Product Yet</h1>:cars.map(el=>( <div className=' w-[23%] h-[30%] rounded-3xl mb-[2%] border-[2px]  shadow-2xl'>
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
               {Math.floor(((new Date(el.timeEnd)-new Date())>0?(new Date(el.timeEnd)-new Date()):0)/3600000)} 
              h</h1>
            </div>
            </div>))}
        </div>
          <h1 className='font-[800] text-[20px] mb-[]'>Won Auctions</h1>
          <div className='flex gap-[2%]   w-[100%] h-auto top-[150%] flex-wrap '>
            {/* map HERE */}

           {ended?.map(el=>( 
           <div className=' w-[23%] h-[30%] rounded-3xl mb-[2%] border-[2px]  shadow-2xl'>
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
          { bids.map(el=>(
          <div className='w-full flex font-[600] bg-[#e5f2e5]'>
            <div className='w-[33%] h-[40px] border-[1px] border-gray-200 flex justify-center items-center'>{el.createdAt&&el.createdAt}</div>
            <div className='w-[33%] h-[40px] border-[1px] border-gray-200 flex justify-center items-center text-[red] cursor-pointer' onClick={()=>router.push(`/item/${el.item.id}`)}>{el.item.name&&el.item.name}</div>
            <div className='w-[33%] h-[40px] border-[1px] border-gray-200 flex justify-center items-center'>{el.bidAmount&&el.bidAmount}$</div>
        
         
          </div>))}
          <button className='mt-[25px] bg-black text-white rounded w-[120px] h-[40px]' onClick={()=>setPages(page+1)}>See More</button>
          {/*  */}
         </div>}
         {data[4]&&localStorage.clear()&&router.push('/')}
         
         
      </div>
      <Footer/>
    </div>
  )
}

export default Dashboard