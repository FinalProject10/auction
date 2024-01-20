import React from 'react'
import Link from 'next/link'
import Products from './products'
const Page = () => {
  return (
    <div >
        <div className='bg-[#F2F2F2] h-[170px] w-full'>
           <div className='pl-[6%] pt-[3%]'>
           <Link href={'/home'}> <h1 className='text-[#999999] inline-block mb-[2%]'>Home / </h1></Link><span className='text-[#999999]'>shop</span>
            <h1 className='text-[35px] font-[700]'>Auctions</h1>
            </div>

        </div>
        <Products/>
    
       
    </div>
  )
}

export default Page