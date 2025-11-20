'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../home/navbar'
import Link from 'next/link'
import Footer from '../footer/Footer'
import { useRouter } from 'next/navigation'
import { useLoadingNavigation } from '../hooks/useLoadingNavigation'
import axios from 'axios'
import { API_URL } from '../../utils/api'
import { 
  FaGavel, 
  FaChartLine, 
  FaUser, 
  FaSignOutAlt, 
  FaWallet,
  FaTrophy,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
  FaEdit,
  FaEye
} from 'react-icons/fa'
import { motion } from 'framer-motion'
import Image from 'next/image'
import InfoTooltip from '../components/InfoTooltip'

export const dynamic = 'force-dynamic';

  interface CarItem {
    id?: number;
    name: string;
    short_description?: string;
    images?: string[];
    timeEnd?: string | Date;
  price?: number;
    [key: string]: any;
  }

  interface BidItem {
    createdAt?: string | Date;
    bidAmount?: number;
    item: {
      id?: number;
      name?: string;
      [key: string]: any;
    };
    [key: string]: any;
  }

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [email, setEmail] = useState('')
  const [newPass, setNewpass] = useState("")
  const [currentPass, setCurrentPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [cars, setCars] = useState<CarItem[]>([])
  const [bids, setBids] = useState<BidItem[]>([])
  const [page, setPages] = useState(1)
  const [ended, setEnded] = useState<CarItem[]>([])
  const [id, setId] = useState(0)
  const [loading, setLoading] = useState(true)
  const [successMessage, setSuccessMessage] = useState("")
  const router = useRouter()
  const { navigateWithLoading } = useLoadingNavigation()
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userId')
      const role = localStorage.getItem('role')
      
      if (!userId || role !== 'client') {
        router.push('/login/client')
        return
      }
      
      setId(parseInt(userId || '0'))
    }
  }, [router])

  useEffect(() => {
    if (id > 0) {
      fetchDashboardData()
    }
  }, [id])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const [carsRes, bidsRes, endedRes] = await Promise.all([
        axios.get(`${API_URL}/items/itemsBided/${id}`),
        axios.get(`${API_URL}/bid/fetch-items/${id}?page=${page}`),
        axios.get(`${API_URL}/items/items-winner/${id}`)
      ])
      setCars(carsRes.data || [])
      setBids((prev) => [...prev, ...(bidsRes.data || [])])
      setEnded(endedRes.data || [])
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateAccount = async () => {
    try {
      await axios.put(`${API_URL}/client/update/${id}`, {
        name: fname,
        lastName: lname,
        email,
        newPass: newPass || undefined
      })
      setSuccessMessage("Account updated successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (err) {
      console.error('Error updating account:', err)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getTimeRemaining = (timeEnd: string | Date) => {
    if (!timeEnd) return '0h'
    const end = new Date(timeEnd).getTime()
    const now = new Date().getTime()
    const diff = Math.max(0, end - now)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(hours / 24)
    if (days > 0) return `${days}d ${hours % 24}h`
    return `${hours}h`
  }

  const tabs = [
    { id: 0, name: 'Dashboard', icon: FaChartLine },
    { id: 1, name: 'Account Details', icon: FaUser },
    { id: 2, name: 'My Bids', icon: FaGavel },
    { id: 3, name: 'Bid History', icon: FaClock },
  ]

  const totalBids = bids.length
  const activeAuctions = cars.length
  const wonAuctions = ended.length
  const totalSpent = bids.reduce((sum, bid) => sum + (bid.bidAmount || 0), 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/home" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Dashboard</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold">My Account Dashboard</h1>
          <p className="text-gray-300 mt-2">Manage your account, bids, and auction activity</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[280px,1fr] gap-8">
          {/* Sidebar */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-fit sticky top-8">
            <nav className="p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                )
              })}
              <Link
                href="/clientDash/deposit"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 text-gray-700 hover:bg-gray-100 transition-all"
              >
                <FaWallet className="text-lg" />
                <span className="font-medium">Deposit Account</span>
              </Link>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') localStorage.clear()
                  router.push('/')
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
              >
                <FaSignOutAlt className="text-lg" />
                <span className="font-medium">Log Out</span>
              </button>
            </nav>
            </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Dashboard Overview */}
            {activeTab === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Stats Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">Active Bids</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{activeAuctions}</p>
                      </div>
                      <div className="bg-blue-100 rounded-full p-4">
                        <FaGavel className="text-blue-600 text-2xl" />
                      </div>
                    </div>
            </div>

                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">Won Auctions</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{wonAuctions}</p>
            </div>
                      <div className="bg-green-100 rounded-full p-4">
                        <FaTrophy className="text-green-600 text-2xl" />
            </div>
            </div>
          </div>

                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
            <div>
                        <p className="text-gray-600 text-sm font-medium">Total Bids</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{totalBids}</p>
                      </div>
                      <div className="bg-purple-100 rounded-full p-4">
                        <FaChartLine className="text-purple-600 text-2xl" />
                      </div>
            </div>
            </div>

                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                    <div className="flex items-center justify-between">
            <div>
                        <p className="text-gray-600 text-sm font-medium">Total Spent</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(totalSpent)}</p>
                      </div>
                      <div className="bg-orange-100 rounded-full p-4">
                        <FaWallet className="text-orange-600 text-2xl" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setActiveTab(2)}
                      className="flex items-center justify-between p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-2 border-red-200 hover:border-red-500 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-red-100 rounded-full p-4 group-hover:bg-red-500 transition-colors">
                          <FaGavel className="text-red-600 group-hover:text-white text-2xl transition-colors" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-gray-900 text-lg">My Auction Bids</h3>
                          <p className="text-gray-600 text-sm">View active and won auctions</p>
                        </div>
                      </div>
                      <FaArrowRight className="text-gray-400 group-hover:text-red-500 transition-colors" />
                    </button>

                    <button
                      onClick={() => setActiveTab(3)}
                      className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 hover:border-blue-500 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 rounded-full p-4 group-hover:bg-blue-500 transition-colors">
                          <FaChartLine className="text-blue-600 group-hover:text-white text-2xl transition-colors" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-gray-900 text-lg">Bid History</h3>
                          <p className="text-gray-600 text-sm">Track all your bidding activity</p>
                        </div>
                      </div>
                      <FaArrowRight className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </button>
            </div>
            </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                  {bids.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No recent activity</p>
                  ) : (
                    <div className="space-y-4">
                      {bids.slice(0, 5).map((bid, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="bg-red-100 rounded-full p-2">
                              <FaGavel className="text-red-600" />
          </div>
              <div>
                              <p className="font-semibold text-gray-900">{bid.item?.name || 'Unknown Item'}</p>
                              <p className="text-sm text-gray-600">
                                {bid.createdAt ? new Date(bid.createdAt).toLocaleDateString() : ''}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-red-600">{formatCurrency(bid.bidAmount || 0)}</p>
                            <button
                              onClick={() => navigateWithLoading(`/item/${bid.item?.id}`, "Loading item...")}
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              View Item
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Account Details */}
            {activeTab === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Details</h2>
                
                {successMessage && (
                  <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
                    {successMessage}
              </div>
                )}

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
        <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name
                      </label>
            <input 
                        type="text"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                        placeholder="Enter first name"
                      />
            </div>
            <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name
                      </label>
            <input 
                        type="text"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                        placeholder="Enter last name"
                      />
            </div>
          </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
            <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={currentPass}
                          onChange={(e) => setCurrentPass(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                          placeholder="Enter current password"
                        />
          </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={newPass}
                          onChange={(e) => setNewpass(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                          placeholder="Enter new password"
                        />
            </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Confirm New Password
                        </label>
            <input 
                          type="password"
                          value={confirmPass}
                          onChange={(e) => setConfirmPass(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                          placeholder="Confirm new password"
                        />
                      </div>
            </div>
            </div>

            <button 
                    onClick={handleUpdateAccount}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-lg font-bold hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}

            {/* My Bids */}
            {activeTab === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Active Auctions */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Active Auctions</h2>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {cars.length} Active
                    </span>
                  </div>
                  {cars.length === 0 ? (
                    <div className="text-center py-12">
                      <FaGavel className="text-gray-300 text-5xl mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No active auctions</p>
                      <Link href="/shop" className="text-red-600 hover:text-red-700 font-semibold mt-2 inline-block">
                        Browse Auctions →
                      </Link>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {cars.map((car) => (
                        <div
                          key={car.id}
                          className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-red-500 transition-all shadow-md hover:shadow-xl group cursor-pointer"
                          onClick={() => navigateWithLoading(`/item/${car.id}`, "Loading item...")}
                        >
                          <div className="relative h-48 overflow-hidden">
                            {car.images && car.images[0] ? (
                              <Image
                                src={car.images[0]}
                                alt={car.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <FaCar className="text-gray-400 text-4xl" />
                              </div>
                            )}
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                              {getTimeRemaining(car.timeEnd || '')} left
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-1">
                              {car.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {car.short_description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-red-600 font-bold">
                                {car.price ? formatCurrency(car.price) : 'N/A'}
                              </span>
                              <button className="text-red-600 hover:text-red-700 font-semibold text-sm flex items-center gap-1">
                                View <FaArrowRight className="text-xs" />
                              </button>
                            </div>
          </div>
          </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Won Auctions */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Won Auctions</h2>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {ended.length} Won
                    </span>
                  </div>
                  {ended.length === 0 ? (
                    <div className="text-center py-12">
                      <FaTrophy className="text-gray-300 text-5xl mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No won auctions yet</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {ended.map((car) => (
                        <div
                          key={car.id}
                          className="bg-white border-2 border-green-200 rounded-xl overflow-hidden hover:border-green-500 transition-all shadow-md hover:shadow-xl group cursor-pointer"
                          onClick={() => navigateWithLoading(`/item/${car.id}`, "Loading item...")}
                        >
                          <div className="relative h-48 overflow-hidden">
                            {car.images && car.images[0] ? (
                              <Image
                                src={car.images[0]}
                                alt={car.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <FaCar className="text-gray-400 text-4xl" />
                              </div>
                            )}
                            <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              <FaCheckCircle /> Won
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-1">
                              {car.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {car.short_description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-green-600 font-bold">
                                {car.price ? formatCurrency(car.price) : 'N/A'}
                              </span>
                              <button className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1">
                                View <FaArrowRight className="text-xs" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
            </div>
                  )}
        </div>
              </motion.div>
            )}

            {/* Bid History */}
            {activeTab === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-8 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">Bid History</h2>
                  <p className="text-gray-600 mt-1">Track all your bidding activity</p>
                </div>
                {bids.length === 0 ? (
                  <div className="text-center py-12">
                    <FaClock className="text-gray-300 text-5xl mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No bid history yet</p>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              Date & Time
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              Auction Item
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              Bid Amount
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {bids.map((bid, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {bid.createdAt ? new Date(bid.createdAt).toLocaleString() : 'N/A'}
                              </td>
                              <td className="px-6 py-4 text-sm">
                                <button
                                  onClick={() => navigateWithLoading(`/item/${bid.item?.id}`, "Loading item...")}
                                  className="text-red-600 hover:text-red-700 font-semibold hover:underline"
                                >
                                  {bid.item?.name || 'Unknown Item'}
                                </button>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600">
                                {formatCurrency(bid.bidAmount || 0)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button
                                  onClick={() => navigateWithLoading(`/item/${bid.item?.id}`, "Loading item...")}
                                  className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                                >
                                  <FaEye /> View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
            </div>
                    <div className="p-6 border-t border-gray-200 text-center">
                      <button
                        onClick={() => {
                          setPages(page + 1)
                          fetchDashboardData()
                        }}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold transition-colors"
                      >
                        Load More
                      </button>
</div>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Dashboard
