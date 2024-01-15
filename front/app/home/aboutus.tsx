import React from 'react'
import Image from 'next/image'
import img1 from '../images/img2.png'
const Aboutus = () => {
  return (
    <div className='w-full h-[700px] bg-[#f2f2f2] mt-[50%] grid grid-cols-2 mb-[20%]'>
        <div className=''>
        <Image className='h-[600px] w-[700px] mt-[10%]' src={img1} alt="" />
        </div>
        <div className='mt-[15%]'>
        <p className='font-bold text-[#ff2800] tracking-wider text-[14px] mb-[20%]'>About Us</p>
        <p className='text-[#262626] font-[400] leading-[24px]'>At Autobid, we redefine the car-buying experience by merging cutting-edge technology with the excitement of live auctions. Our user-friendly interface allows you to browse an extensive inventory of carefully curated vehicles, from sleek sedans to powerful trucks and everything in between.</p>
        <ul className='list-disc ml-[70px] mt-[50px]'>
            <li><h1 className='font-[700] inline-block'>Diverse Inventory: </h1>Explore a wide range of vehicles, each meticulously.</li>
            <li><h1 className='font-[700] inline-block'>Live Auctions: </h1>Immerse yourself in the excitement of real-time bidding.</li>
            <li><h1 className='font-[700] inline-block'>Transparency: </h1>We believe in openness and provide detailed information.</li>
            <li><h1 className='font-[700] inline-block'>User-Friendly Platform: </h1>Navigate effortlessly through our website.</li>
            <li><h1 className='font-[700] inline-block'>Secure Transactions: </h1>Bid with confidence, knowing that your transactions are secure.</li>
            
        </ul>
        <img className='w-[200px]' src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-signature.png" alt="" />
        </div>

    </div>
  )
}

export default Aboutus