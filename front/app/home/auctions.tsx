'use client'
import React,{useState} from 'react'

const Auctions = () => {
    const[color,setColor]=useState([false,false,false])
  return (
    <div className='w-[90%] h-[100%] ml-[5%] '>
        <h1 className='float-start font-[800] text-[34px] mt-[10%] '>Auctions</h1>
        <div className='flex gap-[10px] mb-[10%] float-right mt-[10%] font-[700] text-[#666] cursor-pointer '> 
        <h1  style={{color:color[0]?'black':'#666'}} onClick={()=>setColor([true,false,false])}>Newly Listed</h1>
        <h1 style={{color:color[1]?'black':'#666'}} onClick={()=>setColor([false,true,false])}>Top Rated</h1>
        <h1 style={{color:color[2]?'black':'#666',marginRight:'2px'}} onClick={()=>setColor([false,false,true])}>Ending Soon</h1>
        </div>
    <div className='flex gap-[2%] absolute w-[90%] top-[150%]'>
        <div className=' w-[25%] h-[30%] rounded-3xl border-[2px]  shadow-2xl'>
            <img className='w-[350px] hover:w-[351px] transition-all rounded-t-3xl overflow-hidden' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-6-500x317.jpg" alt="" />
            <div className='p-[15px] text-[#333333]'>
            <h1 className='cursor-pointer hover:text-[#ff2800] text-[20px] font-[600]'>Tesla Model 3</h1>
            <h1 className='mb-[10px] font-[500]'>2018 · 121 787 km · 2 995 cm3 · Diesel</h1>
            <h1 className='font-[300] text-[13px]'>Auction Ended</h1>
            </div>
        </div>
        {/* <div className=' w-[25%] h-[30%] rounded-3xl border-[2px]'>
            <img className='w-[350px] hover:w-[351px] transition-all rounded-t-3xl overflow-hidden' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-6-500x317.jpg" alt="" />
            <div className='p-[15px] text-[#333333]'>
            <h1 className='cursor-pointer hover:text-[#ff2800] text-[20px] font-[600]'>Tesla Model 3</h1>
            <h1 className='mb-[10px] font-[500]'>2018 · 121 787 km · 2 995 cm3 · Diesel</h1>
            <h1 className='font-[300] text-[13px]'>Auction Ended</h1>
            </div>
        </div> */}
        {/* <div className=' w-[25%] h-[30%] rounded-3xl border-[2px]'>
            <img className='w-[350px] hover:w-[351px] transition-all rounded-t-3xl overflow-hidden' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-6-500x317.jpg" alt="" />
            <div className='p-[15px] text-[#333333]'>
            <h1 className='cursor-pointer hover:text-[#ff2800] text-[20px] font-[600]'>Tesla Model 3</h1>
            <h1 className='mb-[10px] font-[500]'>2018 · 121 787 km · 2 995 cm3 · Diesel</h1>
            <h1 className='font-[300] text-[13px]'>Auction Ended</h1>
            </div>
        </div>
        <div className=' w-[25%] h-[30%] rounded-3xl border-[2px]'>
            <img className='w-[350px] hover:w-[351px] transition-all rounded-t-3xl overflow-hidden' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-6-500x317.jpg" alt="" />
            <div className='p-[15px] text-[#333333]'>
            <h1 className='cursor-pointer hover:text-[#ff2800] text-[20px] font-[600]'>Tesla Model 3</h1>
            <h1 className='mb-[10px] font-[500]'>2018 · 121 787 km · 2 995 cm3 · Diesel</h1>
            <h1 className='font-[300] text-[13px]'>Auction Ended</h1>
            </div>
        </div> */}
       

    </div>
    </div>
  )
}

export default Auctions