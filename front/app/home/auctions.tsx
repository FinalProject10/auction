'use client'
import React,{useState} from 'react'

const Auctions = () => {
    const[color,setColor]=useState([false,false,false])
  return (
    <div className='w-[90%] h-[100%] ml-[5%]'>
        <h1 className='float-start font-[800] text-[34px] mt-[10%]'>Auctions</h1>
        <div className='flex gap-[10px] mb-[10%] float-right mt-[10%] font-[700] text-[#666] cursor-pointer '
        
        > 
        <h1  style={{color:color[0]?'black':'#666'}} onClick={()=>setColor([true,false,false])}>Newly Listed</h1>
        <h1 style={{color:color[1]?'black':'#666'}} onClick={()=>setColor([false,true,false])}>Top Rated</h1>
        <h1 style={{color:color[2]?'black':'#666'}} onClick={()=>setColor([false,false,true])}>Ending Soon</h1>
        </div>

    </div>
  )
}

export default Auctions