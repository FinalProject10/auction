"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Oa23kFgyHOf8MRLCpOxilmegVe8iPiOSt91sLXtveMRE8zLgyVOFofgKCUKNsRTzirOhr0psYY3aBqh89GML3Ep006HA3dFsH');

const Payment = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post('http://localhost:5000/create-checkout-session', {
        id: 'item4',  // Replace with the actual item ID
        quantity: 590 ,
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
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Checkout'}
      </button>
    </div>
  );
};

export default Payment;
