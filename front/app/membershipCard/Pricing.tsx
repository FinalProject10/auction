"use client"
import React, { FC, useState } from 'react';
import { FcInfo } from 'react-icons/fc';
import { GrValidate } from "react-icons/gr";
import { motion } from 'framer-motion';
import Navbar from '../home/navbar'
import { fadeIn } from './fadeIn';
import "./mem.css"
import axios from 'axios'
import { userAgent } from 'next/server.js';
import { useRouter } from 'next/navigation.js';
interface Package {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description?: string;
  green: string;
  features?: string[];
}

const Pricing: FC = () => {
  const [isYearly, setIsYearly] = useState<boolean>(false);

  const packages: Package[] = [
   
    {
      name: 'Ligature ',
      monthlyPrice: 39,
      yearlyPrice: 390,
      green: '/src/assets/green-dot.png',
      description: '',
      features: [
        'Ability To Bid',
        'Detailed Vehicle Information',
      '10 Virtual Tours',
        'Comparative Tools',
        'Extensive Vehicle Listings',
        'Customer Support',
      ],
    },
    {
      name: 'Seller Plan',
      monthlyPrice: 59,
      yearlyPrice: 590,
      green: '/src/assets/green-dot.png',
      description: '',
      features: [
        'All In Ligature',
        'Add A Vehicule To Buy ',
        'Unlimited Virtual Tours',
        'Comparative Tools',
        'Extensive Vehicle Listings',
        'Customer Support',
      ],
    },
  ];
  const router=useRouter()
  // const add=(value:any,price:any)=>{
  //   const id=localStorage.getItem('id')
  //   axios.post(`http://localhost:5001/Membership/add`,{id,type:"ea",price:isYearly?pkg.yearlyPrice:pkg.monthlyPrice})
  // }
  return (
    <div id="pricing">
      <div className='nav'>
        <Navbar />
      </div>
      <div className="text-center">
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg mb-8">
          <h2 className="md:text-5xl text-2xl font-extrabold text-gray-900 mb-2">Pricing Services</h2>
          <p className="text-tertiary md:w-1/3 mx-auto">
            Becoming a premium member, you will gain a lot of benefits.
          </p>
        </div>

        <div className="mt-16">
          <label htmlFor="toggle" className="inline-flex items-center cursor-pointer">
            <span className="mr-8 text-2xl font-semibold">Monthly</span>
            <div className="w-14 h-6 transition duration-200 bg-gray-300 ease-in-out rounded-full">
              <div
                className={`w-6 h-6 transition duration-200 ease-in-out rounded-full ${isYearly ? 'bg-primary ml-8' : 'bg-orange-500'
                  }`}
              ></div>
            </div>
            <span className="ml-8 text-2xl font-semibold">Yearly</span>
          </label>
          <input
            type="checkbox"
            id="toggle"
            className="hidden"
            checked={isYearly}
            onChange={() => setIsYearly(!isYearly)}
          />
        </div>
      </div>
      <motion.div
        variants={fadeIn('up', 0.3)}
        initial="hidden"
        whileInView={'show'}
        viewport={{ once: false, amount: 0.2 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-10 mt-20 md:w-11/12 mx-auto"
      >
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`mb-10 border py-10 md:px-6 px-4 rounded-lg shadow-md ${
              pkg.name === 'Premium' ? 'bg-black text-white' : ''
            }`}
          >
            <h3 className="text-3xl font-bold text-center text-[#]">{pkg.name}</h3>
            <p className="text-tertiary text-center my-6">{pkg.description}</p>
            {pkg.features && (
              <ul className="mt-4 space-y-2 px-4">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <GrValidate className="mr-2 text-xl notification-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-5 text-center text-secondary text-4xl font-bold">
              {isYearly ? `$${pkg.yearlyPrice}` : `$${pkg.monthlyPrice}`}
              <span className="text-base text-tertiary font-medium">/{isYearly ? 'year' : 'month'}</span>
            </p>
            <div className="w-full mx-auto flex items-center justify-center mt-5">
              <button
                className={`mt-6 px-10 text-black ${isYearly ? 'bg-white border-white' : 'bg-orange-500 border-orange-500'} hover:bg-orange-600 hover:border-orange-600 font-semibold py-2 rounded-lg transition duration-300 ease-in-out`}
                  onClick={()=>{
            
                    localStorage.setItem('membership',String(isYearly?pkg.yearlyPrice:pkg.monthlyPrice))
                    router.push('/payement')}}
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Pricing;