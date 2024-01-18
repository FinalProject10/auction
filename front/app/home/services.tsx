import Link from 'next/link'
import React from 'react'

const Services = () => {
  return (
    <>
    <div className='mt-[40px] bg-auto' style={{background:'url(https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-main_about.jpg?id=6765)',backgroundSize:'cover',height:'600px'}}>
   <div className=' w-[90%] ml-[5%] mb-[10%] grid grid-cols-[30%_70%]'  >
    <div className='mt-[50%]'>
        <h1 className='text-[#ff2800] font-[700] tracking-wider'>Find out Now</h1>
        <h1 className='text-[30px] font-[700] mb-[20%]'>User Testimonials: What Our Customers Are Saying</h1>
        <Link href={'/membershipCard'}><button className='text-black font-[800] border-[2px] border-black  mt-[1%] bg-white rounded w-[132px] h-[43px] hover:text-white hover:bg-[#ff2800] hover:border-none hover:transition ease-in-out delay-50 ' >Our Services</button></Link>

    </div>
    <div >
        <div className='w-[95%] ml-[8%] h-[90%]  mt-[15%] bg-white shadow-xl rounded-[20px] '>

        </div>
    </div>
   </div>
   

    </div>

<div className='bg-[#f7f7f7] w-full h-[100px]   flex justify-center items-center'>
<h1 className='text-[20px] font-[600] mr-[5%]'>Are You Certified Seller?</h1>
<Link href={'register/seller/firstStep'}><button className='text-white font-[800]  bg-[#ff2800] rounded w-[190px] h-[43px] float-right hover:text-black hover:bg-white hover:border-[2px] hover:border-black  hover:transition ease-in-out delay-50 '>Register As Vendor</button></Link>

</div>
</>
  )
}

export default Services