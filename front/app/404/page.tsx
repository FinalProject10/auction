"use client"
import React from 'react'
import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import('../home/navbar'), { ssr: false })
const Footer = dynamic(() => import('../footer/Footer'))
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaHome, FaSearch, FaExclamationTriangle } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const Custom404: React.FC = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col">
      <header>
        <Navbar />
      </header>
      
      <div className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* 404 Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <h1 className="text-9xl md:text-[12rem] font-extrabold bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                404
              </h1>
              <div className="absolute -top-4 -right-4 animate-bounce">
                <FaExclamationTriangle className="text-red-500 text-4xl" />
              </div>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Sorry! The page you were looking for could not be found.
              <br />
              Try searching for it or browse through our website.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/home"
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FaHome /> Return Home
            </Link>
            <Link
              href="/shop"
              className="flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg border-2 border-gray-300 hover:border-red-500 hover:text-red-600 transition-all shadow-md hover:shadow-lg"
            >
              <FaSearch /> Browse Auctions
            </Link>
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-red-600 font-semibold px-8 py-4 transition-colors"
            >
              Go Back
            </button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16"
          >
            <p className="text-gray-600 mb-6">You might be looking for:</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { href: '/shop', label: 'Shop', icon: '🚗' },
                { href: '/Howitwork', label: 'How It Works', icon: '📖' },
                { href: '/faq', label: 'FAQ', icon: '❓' },
                { href: '/getInTouch', label: 'Contact', icon: '📧' }
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-all border-2 border-gray-100 hover:border-red-200 group"
                >
                  <div className="text-2xl mb-2">{link.icon}</div>
                  <p className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                    {link.label}
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Custom404
