"use client"
import React, { FC, useState } from 'react';
import { FcInfo } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { fadeIn } from './fadeIn.tsx';

interface Package {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  green: string;
}

const Pricing: FC = () => {
  const [isYearly, setIsYearly] = useState<boolean>(false);

  const packages: Package[] = [
    {
      name: 'Trial',
      monthlyPrice: 19,
      yearlyPrice: 199,
      description: 'Ready to revolutionize the way you buy and sell cars? Try our platform FREE for one month and unlock a world of features designed to make your journey seamless.',
      green: '/src/assets/green-dot.png',
      features: [
        '5 Notification Alerts',
        '5 Detailed Vehicle Information',
        '5 Virtual Tours or Test Drives',
        'Comparative Tools',
        'Extensive Vehicle Listings',
        'Customer Support',
      ],
    },
    {
      name: 'Pro',
      monthlyPrice: 39,
      yearlyPrice: 390,
      description: 'Ready to revolutionize the way you buy and sell cars? Try our platform FREE for one month and unlock a world of features designed to make your journey seamless.',
      green: '/src/assets/green-dot.png',
      features: [
        '10 Notification Alerts',
        '10 Detailed Vehicle Information',
        '10 Virtual Tours or Test Drives',
        'Comparative Tools',
        'Extensive Vehicle Listings',
        'Customer Support',
      ],
    },
    {
      name: 'Premium',
      monthlyPrice: 59,
      yearlyPrice: 590,
      description: 'Ready to revolutionize the way you buy and sell cars? Try our platform FREE for one month and unlock a world of features designed to make your journey seamless..',
      green: '/src/assets/green-dot.png',
      features: [
        'Unlimited Notification Alerts',
        'Unlimited Detailed Vehicle ',
        'Unlimited Virtual Tours',
        'Comparative Tools',
        'Extensive Vehicle Listings',
        'Customer Support',
      ],
    },
  ];


  return (
    <div className="py-10 md:px-14 p-4 max-w-screen-2xl mx-auto" id="pricing">
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
            className={`border py-10 md:px-6 px-4 rounded-lg shadow-md ${pkg.name === 'Premium' ? 'bg-black text-white' : ''
              }`}
          >
            <h3 className="text-3xl font-bold text-center text-[#010851]">{pkg.name}</h3>
            <p className="text-tertiary text-center my-6">{pkg.description}</p>
            {pkg.features && (
              <ul className="mt-4 space-y-2 px-4">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <FcInfo className="mr-2 text-xl" />
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
              <button className="mt-6 px-10 text-secondary py-2 border border-secondary hover:bg-secondary hover:text-white font-semibold py-2 rounded-lg transition duration-300 ease-in-out">
                Get Started
              </button>
            </div>
          </div>
        ))}

      </motion.div>
      <div className="bg-orange-500 p-200 mt-6000   right-0 left-0 w-full">
        <img src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-newsletter_pic.png" width={600} alt="car" />
      </div>



    </div>
  );
};

export default Pricing;