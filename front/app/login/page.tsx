"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FaUser, FaStore, FaArrowRight } from 'react-icons/fa'

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<'client' | 'seller' | null>(null)
  const router = useRouter()

  const handleRoleSelect = (role: 'client' | 'seller') => {
    setSelectedRole(role)
    // Small delay for visual feedback, then redirect
    setTimeout(() => {
      router.push(`/login/${role}`)
    }, 300)
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-2xl">
            AutoBid Login
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">
            Select your account type to sign in
          </p>
          <p className="text-lg text-gray-400">
            Choose whether you're logging in as a buyer or seller
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Client Card */}
          <div
            onClick={() => handleRoleSelect('client')}
            className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden cursor-pointer transform transition-all duration-300 ${
              selectedRole === 'client' 
                ? 'scale-105 ring-4 ring-red-500' 
                : 'hover:scale-105 hover:shadow-3xl'
            }`}
          >
            <div className="relative h-64 bg-gradient-to-br from-blue-600 to-blue-800">
              <Image
                src="https://dealerdotcom.webdamdb.com/embeddables/display.php?size=550&webid=gVE5hZYd9nT72gKZ"
                alt="Client Login"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-6 right-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <FaUser className="text-white text-2xl" />
                </div>
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">I'm a Buyer</h2>
              <p className="text-gray-600 mb-6 text-lg">
                Sign in to your client account to browse auctions and place bids on vehicles.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Client Account
                </span>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  selectedRole === 'client'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 group-hover:bg-red-500 group-hover:text-white'
                }`}>
                  <span className="font-semibold">Sign In</span>
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Seller Card */}
          <div
            onClick={() => handleRoleSelect('seller')}
            className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden cursor-pointer transform transition-all duration-300 ${
              selectedRole === 'seller' 
                ? 'scale-105 ring-4 ring-red-500' 
                : 'hover:scale-105 hover:shadow-3xl'
            }`}
          >
            <div className="relative h-64 bg-gradient-to-br from-green-600 to-green-800">
              <Image
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&q=80"
                alt="Seller Login"
                fill
                className="object-cover opacity-80"
                onError={(e) => {
                  // Fallback to gradient background if image fails
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-6 right-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <FaStore className="text-white text-2xl" />
                </div>
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">I'm a Seller</h2>
              <p className="text-gray-600 mb-6 text-lg">
                Sign in to your seller account to manage your listings and track your auctions.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Seller Account
                </span>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  selectedRole === 'seller'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 group-hover:bg-red-500 group-hover:text-white'
                }`}>
                  <span className="font-semibold">Sign In</span>
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm mb-2">
            Don't have an account?{' '}
            <span className="text-white font-semibold">Select a role above to sign up</span>
          </p>
          <a href="/" className="text-gray-400 hover:text-white text-sm inline-flex items-center gap-1 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
