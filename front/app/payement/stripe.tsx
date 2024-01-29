"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import '../payement/chek.css'

const stripePromise = loadStripe('pk_test_51Oa23kFgyHOf8MRLCpOxilmegVe8iPiOSt91sLXtveMRE8zLgyVOFofgKCUKNsRTzirOhr0psYY3aBqh89GML3Ep006HA3dFsH');

const Payment = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
const membership=localStorage.getItem('membership')

      const response = await axios.post('http://localhost:5000/create-checkout-session', {
        id: parseInt(membership)>60?(parseInt(membership)===590?'item4':'item3'):(parseInt(membership)===59?'item2':'item1'),  // Replace with the actual item ID
        quantity: 5,
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
  const memb=localStorage.getItem('memb')
const membe=localStorage.getItem('membe')
const date = localStorage.getItem('date')
  return (
    <div>
    
    <div class="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
  <img
    src="https://images.ctfassets.net/fzn2n1nzq965/6JEjxpwMd1OIIk6RosReNU/3d5c5f5217a7cce4af750ebfe599b6fc/Payments-social-card.png?q=80"
    class="max-w-xs w-[250px] transition duration-300 ease-in-out hover:scale-110"
    alt="Louvre" onClick={handleClick} />
   
</div>
</div>   
  );
};

export default Payment;

