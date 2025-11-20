"use client"
import React, { FC, useState } from 'react';
import { FaCheck, FaCrown, FaStore, FaStar, FaShieldAlt, FaHeadset, FaChartLine, FaCar, FaSearch, FaGavel } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Navbar from '../home/navbar'
import Footer from '../footer/Footer'
import { useRouter } from 'next/navigation';
import InfoTooltip from '../components/InfoTooltip';

interface Package {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  features: string[];
  popular?: boolean;
}

const Pricing: FC = () => {
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const router = useRouter();

  const packages: Package[] = [
    {
      name: 'Ligature',
      monthlyPrice: 39,
      yearlyPrice: 390,
      description: 'Perfect for buyers who want to participate in auctions',
      icon: <FaGavel className="text-4xl" />,
      gradient: 'from-blue-500 to-blue-600',
      features: [
        'Ability To Bid on Auctions',
        'Detailed Vehicle Information',
        '10 Virtual Tours per Month',
        'Comparative Tools & Analytics',
        'Extensive Vehicle Listings',
        '24/7 Customer Support',
        'Email Notifications',
        'Bid History Tracking',
      ],
    },
    {
      name: 'Seller Plan',
      monthlyPrice: 59,
      yearlyPrice: 590,
      description: 'Complete solution for sellers to list and manage vehicles',
      icon: <FaStore className="text-4xl" />,
      gradient: 'from-red-500 to-red-600',
      popular: true,
      features: [
        'All Ligature Features',
        'Add Unlimited Vehicles',
        'Unlimited Virtual Tours',
        'Advanced Analytics Dashboard',
        'Priority Listing Placement',
        'Dedicated Account Manager',
        'Marketing Tools & Promotions',
        'Revenue Reports & Insights',
      ],
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Unlock premium features and take your auction experience to the next level
            </p>
            
            {/* Toggle Switch */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-lg font-semibold transition-colors ${!isYearly ? 'text-white' : 'text-gray-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                  isYearly ? 'bg-red-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    isYearly ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-lg font-semibold transition-colors ${isYearly ? 'text-white' : 'text-gray-400'}`}>
                Yearly
              </span>
              {isYearly && (
                <span className="ml-2 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                  Save 17%
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                pkg.popular ? 'ring-4 ring-red-500 scale-105 md:scale-110' : ''
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 text-sm font-bold rounded-bl-lg shadow-lg z-10">
                  <FaStar className="inline mr-1" />
                  Most Popular
                </div>
              )}

              {/* Header with Gradient */}
              <div className={`bg-gradient-to-r ${pkg.gradient} text-white p-8 pb-12 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                <div className="relative z-10">
                  <div className="mb-4 opacity-90">{pkg.icon}</div>
                  <h3 className="text-3xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-white/90 text-sm">{pkg.description}</p>
                </div>
              </div>

              {/* Price */}
              <div className="px-8 pt-8 pb-4 border-b border-gray-200">
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-extrabold text-gray-900">
                    ${isYearly ? pkg.yearlyPrice : pkg.monthlyPrice}
                  </span>
                  <span className="text-gray-500 ml-2 text-lg">
                    /{isYearly ? 'year' : 'month'}
                  </span>
                </div>
                {isYearly && (
                  <p className="text-center text-sm text-gray-500 mt-2">
                    ${Math.round((isYearly ? pkg.yearlyPrice : pkg.monthlyPrice) / 12)}/month billed annually
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="px-8 py-6">
                <ul className="space-y-4">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <FaCheck className="text-green-500 text-lg" />
                      </div>
                      <span className="ml-3 text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="px-8 pb-8">
                <button
                  onClick={() => {
                    localStorage.setItem('membership', String(isYearly ? pkg.yearlyPrice : pkg.monthlyPrice));
                    localStorage.setItem('membershipType', pkg.name);
                    router.push('/payement');
                  }}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-2 border-gray-300 hover:border-red-500'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
              Why Choose AutoBid Premium?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <FaShieldAlt className="text-red-600 text-2xl" />
                </div>
                <h4 className="font-bold text-lg mb-2">Secure Platform</h4>
                <p className="text-gray-600 text-sm">Bank-level encryption and secure payment processing</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <FaHeadset className="text-blue-600 text-2xl" />
                </div>
                <h4 className="font-bold text-lg mb-2">24/7 Support</h4>
                <p className="text-gray-600 text-sm">Dedicated customer support whenever you need help</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <FaChartLine className="text-green-600 text-2xl" />
                </div>
                <h4 className="font-bold text-lg mb-2">Advanced Analytics</h4>
                <p className="text-gray-600 text-sm">Track your bids and sales with detailed insights</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  Can I switch plans later?
                  <InfoTooltip 
                    content="Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
                    position="top"
                    iconSize="sm"
                  />
                </h4>
                <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade at any time.</p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  What payment methods do you accept?
                  <InfoTooltip 
                    content="We accept all major credit cards, debit cards, and PayPal. All payments are processed securely through Stripe."
                    position="top"
                    iconSize="sm"
                  />
                </h4>
                <p className="text-gray-600 text-sm">We accept all major credit cards and PayPal.</p>
              </div>
              <div className="pb-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  Is there a free trial?
                  <InfoTooltip 
                    content="Currently, we don't offer a free trial, but you can cancel anytime. Your first month is risk-free with our money-back guarantee."
                    position="top"
                    iconSize="sm"
                  />
                </h4>
                <p className="text-gray-600 text-sm">No free trial, but you can cancel anytime with no commitment.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
