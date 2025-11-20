"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import '../payement/check.css'
import { getApiUrl } from '../../utils/api';

export const dynamic = 'force-dynamic';

const stripePromise = loadStripe('pk_test_51Oa23kFgyHOf8MRLCpOxilmegVe8iPiOSt91sLXtveMRE8zLgyVOFofgKCUKNsRTzirOhr0psYY3aBqh89GML3Ep006HA3dFsH');

const Payment = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [memb, setMemb] = useState<string | null>(null);
  const [membe, setMembe] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [membership, setMembership] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMemb(localStorage.getItem('memb'));
      setMembe(localStorage.getItem('membe'));
      setDate(localStorage.getItem('date'));
      setMembership(localStorage.getItem('membership'));
    }
  }, []);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const membershipValue = typeof window !== 'undefined' ? localStorage.getItem('membership') : null;
      if (!membershipValue) {
        console.error('Membership not found');
        return;
      }

      const response = await axios.post(getApiUrl('create-checkout-session'), {
        id: parseInt(membershipValue)>60?(parseInt(membershipValue)===590?'item4':'item3'):(parseInt(membershipValue)===59?'item2':'item1'),  // Replace with the actual item ID
        quantity: membershipValue,
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
    
    <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
   <img
     src="/images/payment/stripe-logo.png"
     className="max-w-xs w-[250px] transition duration-300 ease-in-out hover:scale-110"
    alt="Louvre" onClick={handleClick} />
   
</div>
</div>   
  );
};

export default Payment;

