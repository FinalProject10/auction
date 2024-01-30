import React from 'react'
import Sales from './sales'

const Dashboard = () => {
  return (
    <div>
        <div className='grid grid-cols-[526px,556px] gap-[20px]'>
        <div>
        <div className='w-[526px] shadow-xl h-auto bg-white mb-[20px]  '>
                <h1 className='text-center mb-[20px]'>Net Sales</h1>
                <h1 className='text-center mb-[10px]'>0,00 £</h1>
                <hr className='w-[90%] ml-[5%] mb-[10px]'/>
                <h1 className='text-center mb-[20px]'>Earning</h1>
                <h1 className='text-center mb-[10px]'>0,00 £</h1>
                <hr className='w-[90%] ml-[5%] mb-[10px]'/>
                <h1 className='text-center mb-[20px]'>Pageview</h1>
                <h1 className='text-center mb-[10px]'>0</h1>
                <hr className='w-[90%] ml-[5%] mb-[10px]'/>
              
                </div>
                <div className='w-[526px] shadow-xl h-auto bg-white mb-[20px]'>
                <div className='w-full p-2 bg-[#ff2800] h-[40px] text-white font-[600] text-center flex justify-between'>
                   <h1>PRODUCTS</h1> 
                   <h1 className='cursor-pointer'>Add New Product +</h1>
                    </div>
                <div className='flex justify-between border-b-[1px] p-4 text-[#606060] cursor-pointer'>
                    <h1>Total</h1>
                    <h1>0</h1>
                </div>
                <div className='flex justify-between border-b-[1px] p-4 text-[#606060] cursor-pointer'>
                    <h1>Live</h1>
                    <h1>0</h1>
                </div>
                <div className='flex justify-between border-b-[1px] p-4 text-[#606060] cursor-pointer'>
                    <h1>Offline</h1>
                    <h1>0</h1>
                </div>
                <div className='flex justify-between border-b-[1px] p-4 text-[#606060] cursor-pointer'>
                    <h1>Pending Review</h1>
                    <h1>0</h1>
                </div>
                </div>
        </div>
        <Sales/>
        </div>
    </div>
  )
}

export default Dashboard