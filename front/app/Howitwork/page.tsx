"use client"
import React from 'react'
import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import("../home/navbar"), { ssr: false })
const Footer = dynamic(() => import('../footer/Footer'))
import { motion } from 'framer-motion'
import { FaUserPlus, FaSearch, FaGavel, FaCheckCircle, FaShieldAlt, FaBell, FaHeart, FaFilter } from 'react-icons/fa'
import Image from 'next/image'
import InfoTooltip from '../components/InfoTooltip'

const Howitwork = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const steps = [
    {
      id: 1,
      title: 'Registration And Account',
      description: 'Create your account in minutes and start your journey. Our secure registration process ensures your information is protected.',
      features: [
        'Effortless Registration: Simply fill in your details, and you\'re ready to dive into our world of vehicles.',
        'Real-Time Updates: Receive updates on your bids, auction status, and exclusive offers.',
        'Personalized Account: Save your favorite vehicles, track your bidding history, and set custom alerts.',
        'Secure Profile Management: Your personal information and transactions are safeguarded.'
      ],
      image: '/images/how-it-works/autobid-how-it-works-2.jpg',
      icon: FaUserPlus,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Browse And Select A Vehicle',
      description: 'Explore our extensive collection of vehicles with advanced filtering and comparison tools.',
      features: [
        'Intuitive Interface: Effortlessly browse through a wide variety of vehicles.',
        'Comprehensive Information: Detailed specifications, features, and high-quality images for each vehicle.',
        'Advanced Filters: Narrow down options by make, model, year, price range, and more.',
        'Compare and Contrast: Easily compare multiple vehicles side by side.'
      ],
      image: '/images/how-it-works/autobid-how-it-works-3.jpg',
      icon: FaSearch,
      color: 'from-red-500 to-red-600',
      reverse: true
    },
    {
      id: 3,
      title: 'Place Your Bid',
      description: 'Participate in live auctions with real-time bidding and automatic notifications.',
      features: [
        'Live Bidding: Place bids in real-time during active auctions.',
        'Proxy Bidding: Set your maximum bid and let the system bid for you automatically.',
        'Bid Notifications: Get instant alerts when you\'re outbid or when you win.',
        'Bidding Power: Manage your deposits to increase your bidding capacity.'
      ],
      image: '/images/how-it-works/lamborghini.jpg',
      icon: FaGavel,
      color: 'from-green-500 to-green-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <header>
        <Navbar />
      </header>
      
      {/* Hero Section */}
      <div 
        className="relative h-[500px] md:h-[600px] flex items-center justify-center text-white"
        style={{
          backgroundImage: 'url(/images/how-it-works/autobid-hiw-banner-v2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">How It Works</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Discover, Bid, and Win – Your Gateway to Exceptional Auction Experiences!
          </p>
        </motion.div>
      </div>

      {/* Steps Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`mb-24 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-20`}></div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${step.color} text-white rounded-full mb-6`}>
                      <Icon className="text-2xl" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{step.title}</h2>
                    <p className="text-gray-600 text-lg mb-6">{step.description}</p>
                    
                    <div className="space-y-4">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className={`flex-shrink-0 mt-1 bg-gradient-to-r ${step.color} text-white rounded-full p-1`}>
                            <FaCheckCircle className="text-sm" />
                          </div>
                          <p className="text-gray-700 leading-relaxed">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Features Grid */}
      <div className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose AutoBid?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience a trusted platform designed for seamless vehicle auctions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: FaShieldAlt, title: 'Secure Platform', description: 'Bank-level encryption and secure transactions' },
              { icon: FaBell, title: 'Real-Time Updates', description: 'Instant notifications on bids and auction status' },
              { icon: FaHeart, title: 'Save Favorites', description: 'Bookmark vehicles you\'re interested in' },
              { icon: FaFilter, title: 'Advanced Search', description: 'Find exactly what you\'re looking for quickly' }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all border-2 border-gray-100 hover:border-red-200"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <Icon className="text-red-600 text-2xl" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-[400px] md:h-auto">
              <Image
                src="/images/how-it-works/lamborghini.jpg"
                alt="Trusted Platform"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="p-8 md:p-12 text-white flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">A Trusted Platform</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                A trusted website is characterized by its reliability, credibility, and security. It consistently provides accurate information, maintains a transparent and ethical approach, and ensures the privacy and safety of its users. Verified by reputable sources, a trusted website fosters user confidence through a track record of dependability and a commitment to delivering a secure and valuable online experience.
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <FaShieldAlt className="text-2xl" />
                </div>
                <div>
                  <p className="font-semibold">100% Secure</p>
                  <p className="text-sm text-gray-300">Your data is protected</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

export default Howitwork
