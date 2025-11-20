"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Flouci from './flouci'
import Strip from './stripe'
import { getApiUrl } from '../../utils/api';

export const dynamic = 'force-dynamic';

const stripePromise = loadStripe('pk_test_51Oa23kFgyHOf8MRLCpOxilmegVe8iPiOSt91sLXtveMRE8zLgyVOFofgKCUKNsRTzirOhr0psYY3aBqh89GML3Ep006HA3dFsH');

const Payment = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const membership = typeof window !== 'undefined' ? localStorage.getItem('membership') : null
      if (!membership) {
        console.error('Membership not found');
        return;
      }

      const response = await axios.post(getApiUrl('create-checkout-session'), {
        id: parseInt(membership)>60?(parseInt(membership)===590?'item4':'item3'):(parseInt(membership)===59?'item2':'item1'),  // Replace with the actual item ID
        quantity: membership,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error(response.data.error || 'Failed to create checkout session');
      }

      const { sessionId } = response.data;

      const stripe = await stripePromise; // Use await to wait for the promise
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        throw new Error(error.message || 'Failed to redirect to checkout');
      }
    } catch (error) {
      console.error('Checkout failed:', error.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex" >
       <div className="w-full h-screen" style={{"backgroundImage":"url('/images/backgrounds/coming-soon.jpg')"}}>
    <div className="w-full h-screen flex flex-col items-center justify-between bg-black bg-opacity-70 py-8">
        <div className="flex-1 flex flex-col items-center justify-center">
            <div className="bg-white bg-opacity-10 px-4 py-2 rounded-xl flex items-center justify-center text-cyan-100 space-x-2 lg:space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 lg:h-8 xl:h-10 w-6 lg:w-8 xl:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                </svg>
                <span className="text-xl lg:text-2xl xl:text-3xl font-bold">WELCOME TO MEMBERSHIP PAYMENT</span>
            </div>
           
            <h5 className=" text-6xl lg:text-7xl xl:text-8xl text-gray-200 tracking-wider font-bold font-serif mt-12 text-center">
            </h5>
            
            <div className="flex flex-col items-center space-y-4 mt-24">
                <p className="text-gray-300 uppercase text-sm">Choose Your Payment Method</p>
                <form className="w-full flex items-center">
                <Flouci/>
      <Strip/>
                </form>
            </div>
        </div>
       
    </div>
</div>

      
    </div>
  );
};

export default Payment;
