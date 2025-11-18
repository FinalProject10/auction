"use client"
import { useState } from 'react'
import React from 'react'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { API_URL } from "../../../utils/api";

const SellerLogin = () => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [err, setErr] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const log = async () => {
    if (!email || !pass) {
      setErr("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setErr("");

    try {
      const response = await axios.post(`${API_URL}/seller/login`, { email, password: pass })
      localStorage.setItem('role', 'seller')
      localStorage.setItem('user', response.data.token || response.data)
      if (response.data.user) {
        localStorage.setItem('userId', response.data.user.id)
      }
      router.push('/home')
    } catch (error: any) {
      let errorMessage = "Connection error. Please check if the server is running.";
      if (error.response?.data) {
        errorMessage = typeof error.response.data === 'string'
          ? error.response.data
          : error.response.data.message || JSON.stringify(error.response.data);
      } else if (error.message) {
        errorMessage = error.message;
      }
      setErr(errorMessage);
      console.error("Login error:", error);
      
      // Check if it's a database connection error
      if (errorMessage.includes("Database connection failed") || errorMessage.includes("ECONNREFUSED")) {
        setErr("Cannot connect to database. Please make sure the database server is running.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">Seller Account</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Seller Portal</h1>
            <p className="text-gray-600">Sign in to your seller account to manage your auctions</p>
          </div>

          <div className="space-y-6">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="form-input"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={pass}
                onChange={(e: any) => setPass(e.target.value)}
                placeholder="Enter your password"
                className="form-input"
                disabled={isLoading}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    log();
                  }
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                <span className="text-sm text-gray-700 font-medium">Remember me</span>
              </label>
              <Link href={'/forget'} className="text-sm text-primary hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            {err && (
              <div className="alert alert-error">
                <span className="font-semibold">Error:</span> {err}
              </div>
            )}

            <button
              onClick={log}
              disabled={isLoading}
              className="btn btn-primary w-full py-3 text-lg"
            >
              {isLoading ? (
                <>
                  <span className="spinner mr-2"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600 mb-2">
                Not a member?{" "}
                <Link href={'/register/seller/firstStep'} className="text-primary font-semibold hover:underline">
                  Sign up as a seller
                </Link>
              </p>
              <Link href={"/"} className="text-sm text-gray-500 hover:text-gray-700 inline-flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to role selection
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block w-1/2 relative">
        <Image
          src="https://static01.nyt.com/images/2023/09/21/multimedia/21sp-cli-stadium-02-mljv/21sp-cli-stadium-02-mljv-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
          alt="Seller Login"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary-dark/80" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Sell Your Vehicles</h2>
            <p className="text-xl opacity-90">
              Reach thousands of buyers and maximize your sales
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerLogin
