import React from 'react'
import Navbar from '../home/navbar'
import Link from 'next/link'
import Products from './products'
import Footer from '../footer/Footer'
const Page = () => {
  return (
    <div >
        <Navbar/>
        <div className='bg-[#F2F2F2] h-[170px] w-full'>
           <div className='pl-[4%] pt-[3%]'>
           <Link href={'/home'}> <h1 className='text-[#999999] inline-block mb-[2%]'>Home / </h1></Link><span className='text-[#999999]'>shop</span>
            <h1 className='text-[35px] font-[700]'>Auctions</h1>
            </div>

        </div>
        <Products/>
        
    
        <Footer/>
    </div>
  )
}

export default Page