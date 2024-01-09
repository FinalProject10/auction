import React from 'react'
import axios from 'axios'
import Link from 'next/link'
const Admin = () => {

  return (
    <div>
        <img className='absolute right-0 h-full w-1/2' src="https://static01.nyt.com/images/2023/09/21/multimedia/21sp-cli-stadium-02-mljv/21sp-cli-stadium-02-mljv-articleLarge.jpg?quality=75&auto=webp&disable=upscale" alt="" />
        <div className='absolute right-0 h-full w-1/2 bg-black opacity-70'></div>
        <div className='flex items-center ml-[10%] mt-[6%]'>
        <div className=''>
        <h1 className='text-[45px] mb-10'>Sign in</h1>
       <h1 className='mb-5'>Email Address</h1>
        <input type="email"
        placeholder='Enter Your Email'
        className=' w-[450px] h-[45px] bg-gray-50 pl-5 mb-5'
        /><br/>
        <h1 className='mb-5'>Password</h1>
        <input type="password"
        placeholder='Enter Your Password'
        className=' w-[450px] h-[45px] bg-gray-50 pl-5 mb-5'
        />
        <div className='flex flex-nowrap'>
            <input type="checkbox" className='inline-block w-4 mr-2 '/>
            <h1 className='inline-block mr-[40%] font-bold'>remember me</h1>
            <Link href={'/forget'} className=' text-blue-600'>forget password ?</Link>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Admin