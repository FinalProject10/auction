"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { API_URL } from "../../../utils/api";

const ClientLogin = () => {
  // Pre-fill with test user credentials
  const [email, setEmail] = useState("testclient@test.com");
  const [pass, setPass] = useState("Test123@");
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // Quick fill test credentials
  const fillTestCredentials = () => {
    setEmail("testclient@test.com");
    setPass("Test123@");
  };
  
  // Quick fill saved user credentials
  const fillSavedCredentials = () => {
    setEmail("saveduser@test.com");
    setPass("Saved123@");
  };

  const log = async () => {
    if (!email || !pass) {
      setErr("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setErr("");

    try {
      const response = await axios.post(`${API_URL}/client/login`, {
        email,
        password: pass,
      });

      localStorage.setItem("role", "client");
      localStorage.setItem("user", response.data.token);
      localStorage.setItem("userId", response.data.user.id);
      
      // Check if there's a return URL (from bid attempt)
      const returnUrl = localStorage.getItem("returnUrl");
      if (returnUrl) {
        localStorage.removeItem("returnUrl");
        router.push(returnUrl);
      } else {
        router.push("/home");
      }
    } catch (error: any) {
      let errorMessage = "Connection error. Please check if the server is running.";
      if (error.response?.data) {
        errorMessage =
          typeof error.response.data === "string"
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
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Client Account</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your client account to continue</p>
          </div>

            <div className="space-y-6">
            {/* Test User Quick Fill */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-blue-800 font-medium">Test Accounts</span>
                </div>
                <button
                  type="button"
                  onClick={fillTestCredentials}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline"
                >
                  Quick Fill
                </button>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-blue-700">
                    <span className="font-semibold">Test:</span> testclient@test.com | Test123@
                  </p>
                  <button
                    type="button"
                    onClick={fillTestCredentials}
                    className="text-xs text-blue-600 hover:text-blue-800 underline ml-2"
                  >
                    Fill
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-blue-700">
                    <span className="font-semibold">Saved:</span> saveduser@test.com | Saved123@
                  </p>
                  <button
                    type="button"
                    onClick={fillSavedCredentials}
                    className="text-xs text-blue-600 hover:text-blue-800 underline ml-2"
                  >
                    Fill
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="testclient@test.com"
                className="form-input"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Test123@"
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
              <Link href={"/forget"} className="text-sm text-primary hover:underline font-medium">
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
                <Link href={"/register/client/firstStep"} className="text-primary font-semibold hover:underline">
                  Sign up as a client
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
          alt="Login"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary-dark/80" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Join Thousands of Bidders</h2>
            <p className="text-xl opacity-90">
              Access premium car auctions and find your dream vehicle
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;
