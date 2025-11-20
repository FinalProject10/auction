"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaPhoneAlt } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { MdAccessTime } from "react-icons/md";
import { MdArrowDownward } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

const Navbar = () => {
  const [home, setHome] = useState(false)
  const [platform, setPlatform] = useState(false)
  const router = useRouter()
  const [shop, setShop] = useState(false)
  const [pages, setPages] = useState(false)
  const [account, setAccount] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobilePlatformOpen, setMobilePlatformOpen] = useState(false)
  const [mobilePagesOpen, setMobilePagesOpen] = useState(false)
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const ripitiw = () => {
    const ra = localStorage.getItem('role')
    if (ra === "seller") {
      return '/sellerDash'
    }
    return '/clientDash'
  }

  return (
    <>
      {/* Top Bar - Hidden on mobile */}
      <div className={`hidden md:block w-full h-[54px] overflow-hidden border-b border-gray-200 bg-white transition-all duration-300 ${isScrolled ? 'hidden md:block' : ''}`}>
        <div className="container mx-auto h-full flex items-center justify-between text-sm text-gray-700">
          <div className="flex items-center gap-0">
            <div className="px-6 border-x border-gray-200 h-full flex items-center justify-center gap-2">
              <FaPhoneAlt className="text-primary" />
              <span>+216 97 152 240</span>
            </div>
            <div className="px-6 border-r border-gray-200 h-full flex items-center justify-center gap-2">
              <CgMail className="text-primary" />
              <span>auctionBid@gmail.tn</span>
            </div>
            <div className="px-6 border-r border-gray-200 h-full flex items-center justify-center gap-2">
              <MdAccessTime className="text-primary" />
              <span>Mon - Fri: 10:00 - 18:00</span>
            </div>
          </div>
          <div className="relative">
            <div
              className="px-6 border-l border-gray-200 h-full flex items-center justify-center gap-2 cursor-pointer hover:text-primary transition-colors"
              onMouseEnter={() => setAccount(true)}
            >
              <span className="font-semibold">My Account</span>
              <MdArrowDownward size={12} className={`transition-transform ${account ? 'rotate-180' : ''}`} />
            </div>
            {account && (
              <div
                className="absolute right-0 top-full mt-2 bg-white w-[200px] shadow-xl rounded-lg py-2 z-50 animate-fade-in"
                onMouseLeave={() => setAccount(false)}
              >
                <Link href={`${ripitiw()}`} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors">
                  <RiDashboardFill className="text-primary" />
                  <span className="font-semibold text-gray-700 hover:text-primary transition-colors">Dashboard</span>
                </Link>
                <Link href={'/membershipCard'} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors">
                  <IoPersonOutline className="text-primary" />
                  <span className="font-semibold text-gray-700 hover:text-primary transition-colors">Services</span>
                </Link>
                <Link href={'/'} onClick={() => localStorage.clear()} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors">
                  <CiLogout className="text-primary" />
                  <span className="font-semibold text-gray-700 hover:text-primary transition-colors">Log out</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`bg-white border-b border-gray-200 sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 md:h-20 px-2 md:px-4">
            {/* Logo */}
            <Link href="/home" className="flex items-center flex-shrink-0">
              <Image
                className="h-8 md:h-12 w-auto"
                width={120}
                height={48}
                src="https://autobid.modeltheme.com/wp-content/themes/autobid/images/logo-autobid.svg"
                alt="AutoBid Logo"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                href={'/home'}
                className="text-gray-700 font-semibold hover:text-primary transition-colors relative group"
                onMouseEnter={() => { setHome(true); setPlatform(false); setShop(false); setPages(false) }}
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>

              <div className="relative">
                <button
                  className="text-gray-700 font-semibold hover:text-primary transition-colors relative group flex items-center gap-1"
                  onMouseEnter={() => { setPlatform(true); setHome(false); setShop(false); setPages(false) }}
                >
                  Platform
                  <MdArrowDownward size={14} className={`transition-transform ${platform ? 'rotate-180' : ''}`} />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </button>
                {platform && (
                  <div
                    className="absolute top-full left-0 mt-2 bg-white w-[900px] rounded-xl shadow-2xl overflow-hidden animate-fade-in"
                    onMouseLeave={() => setPlatform(false)}
                  >
                    <div className="grid grid-cols-2 p-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-bold text-2xl mb-4 text-gray-900">Search Cars</h3>
                          <div className="space-y-3">
                            {[
                              { icon: "https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-1.png", label: "Body", filter: { body: 'Convertible' } },
                              { icon: "https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-2.png", label: "Color", filter: { Color: 'Black' } },
                              { icon: "https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-4.png", label: "Capacity", filter: { Capacity: '1.0L' } },
                              { icon: "https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-3.png", label: "Gearbox", filter: { Gearbox: 'automatic' } },
                              { icon: "https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-5.png", label: "Climatisation", filter: { Climatisation: 'Automatic Climate Control' } },
                            ].map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-3 cursor-pointer group/item hover:text-primary transition-colors"
                                onClick={() => {
                                  Object.entries(item.filter).forEach(([key, value]) => {
                                    localStorage.setItem(key, value as string)
                                  })
                                  router.push('/shop')
                                }}
                              >
                                <img className="w-5 h-5" src={item.icon} alt={item.label} />
                                <span className="font-semibold text-gray-700 group-hover/item:text-primary">{item.label}</span>
                              </div>
                            ))}
                            <Link href={'/shop'} className="inline-block mt-4 font-bold text-primary hover:underline">
                              Explore All Categories →
                            </Link>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-2xl mb-4 text-gray-900">Search Parts</h3>
                          <div className="space-y-3">
                            {['Appointment', 'Dimensions', 'Manufacturer', 'Material', 'Weight'].map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3 cursor-pointer group/item hover:text-primary transition-colors">
                                <img className="w-5 h-5" src={`https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-${6 + idx}.png`} alt={item} />
                                <span className="font-semibold text-gray-700 group-hover/item:text-primary">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div
                        className="bg-cover bg-center rounded-r-xl"
                        style={{
                          backgroundImage: 'url(https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <Link
                href={'/shop'}
                className="text-gray-700 font-semibold hover:text-primary transition-colors relative group"
                onMouseEnter={() => { setShop(true); setHome(false); setPlatform(false); setPages(false) }}
              >
                Shop
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>

              <div className="relative">
                <button
                  className="text-gray-700 font-semibold hover:text-primary transition-colors relative group flex items-center gap-1"
                  onMouseEnter={() => { setPages(true); setHome(false); setPlatform(false); setShop(false) }}
                >
                  Pages
                  <MdArrowDownward size={14} className={`transition-transform ${pages ? 'rotate-180' : ''}`} />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </button>
                {pages && (
                  <div
                    className="absolute top-full left-0 mt-2 bg-white w-[200px] rounded-lg shadow-xl py-2 z-50 animate-fade-in"
                    onMouseLeave={() => setPages(false)}
                  >
                    {[
                      { href: '/Howitwork', label: 'How It Works' },
                      { href: '/membershipCard', label: 'Pricing Services' },
                      { href: '/aboutUs', label: 'About us' },
                      { href: '/faq', label: 'FAQ' },
                      { href: '/404', label: '404 Not Found' },
                    ].map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="block px-4 py-2 font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href={'/getInTouch'}
                className="text-gray-700 font-semibold hover:text-primary transition-colors relative group"
              >
                Get In Touch
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>

              <Link
                href={'/createitem'}
                className="btn btn-primary ml-4"
              >
                Sell Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4 animate-slide-down max-h-[calc(100vh-64px)] overflow-y-auto">
              <div className="flex flex-col gap-2 px-4">
                <Link 
                  href="/home" 
                  className="text-gray-700 font-semibold hover:text-primary transition-colors py-2 px-2 rounded-md hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                
                {/* Platform Dropdown */}
                <div className="flex flex-col">
                  <button
                    className="text-gray-700 font-semibold hover:text-primary transition-colors py-2 px-2 rounded-md hover:bg-gray-50 flex items-center justify-between"
                    onClick={() => setMobilePlatformOpen(!mobilePlatformOpen)}
                  >
                    <span>Platform</span>
                    <MdArrowDownward size={16} className={`transition-transform ${mobilePlatformOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobilePlatformOpen && (
                    <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200">
                      <div className="mb-3">
                        <h4 className="font-bold text-sm text-gray-900 mb-2">Search Cars</h4>
                        <div className="space-y-2">
                          {[
                            { icon: "https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-1.png", label: "Body", filter: { body: 'Convertible' } },
                            { icon: "https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-2.png", label: "Color", filter: { Color: 'Black' } },
                            { icon: "https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-4.png", label: "Capacity", filter: { Capacity: '1.0L' } },
                            { icon: "https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-3.png", label: "Gearbox", filter: { Gearbox: 'automatic' } },
                            { icon: "https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-5.png", label: "Climatisation", filter: { Climatisation: 'Automatic Climate Control' } },
                          ].map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-gray-50"
                              onClick={() => {
                                Object.entries(item.filter).forEach(([key, value]) => {
                                  localStorage.setItem(key, value as string)
                                })
                                router.push('/shop')
                                setMobileMenuOpen(false)
                              }}
                            >
                              <img className="w-4 h-4" src={item.icon} alt={item.label} />
                              <span className="text-sm text-gray-700">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 mb-2">Search Parts</h4>
                        <div className="space-y-2">
                          {['Appointment', 'Dimensions', 'Manufacturer', 'Material', 'Weight'].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-gray-50">
                              <img className="w-4 h-4" src={`https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-icon-v2-${6 + idx}.png`} alt={item} />
                              <span className="text-sm text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Link 
                  href="/shop" 
                  className="text-gray-700 font-semibold hover:text-primary transition-colors py-2 px-2 rounded-md hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shop
                </Link>

                {/* Pages Dropdown */}
                <div className="flex flex-col">
                  <button
                    className="text-gray-700 font-semibold hover:text-primary transition-colors py-2 px-2 rounded-md hover:bg-gray-50 flex items-center justify-between"
                    onClick={() => setMobilePagesOpen(!mobilePagesOpen)}
                  >
                    <span>Pages</span>
                    <MdArrowDownward size={16} className={`transition-transform ${mobilePagesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobilePagesOpen && (
                    <div className="pl-4 mt-2 space-y-1 border-l-2 border-gray-200">
                      {[
                        { href: '/Howitwork', label: 'How It Works' },
                        { href: '/membershipCard', label: 'Pricing Services' },
                        { href: '/aboutUs', label: 'About us' },
                        { href: '/faq', label: 'FAQ' },
                        { href: '/404', label: '404 Not Found' },
                      ].map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          className="block py-2 px-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link 
                  href="/getInTouch" 
                  className="text-gray-700 font-semibold hover:text-primary transition-colors py-2 px-2 rounded-md hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get In Touch
                </Link>

                {/* Mobile Account Menu */}
                <div className="flex flex-col border-t border-gray-200 pt-2 mt-2">
                  <button
                    className="text-gray-700 font-semibold hover:text-primary transition-colors py-2 px-2 rounded-md hover:bg-gray-50 flex items-center justify-between"
                    onClick={() => setMobileAccountOpen(!mobileAccountOpen)}
                  >
                    <span>My Account</span>
                    <MdArrowDownward size={16} className={`transition-transform ${mobileAccountOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileAccountOpen && (
                    <div className="pl-4 mt-2 space-y-1 border-l-2 border-gray-200">
                      <Link 
                        href={`${ripitiw()}`} 
                        className="flex items-center gap-2 py-2 px-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <RiDashboardFill className="text-primary" />
                        Dashboard
                      </Link>
                      <Link 
                        href={'/membershipCard'} 
                        className="flex items-center gap-2 py-2 px-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <IoPersonOutline className="text-primary" />
                        Services
                      </Link>
                      <Link 
                        href={'/'} 
                        onClick={() => {
                          localStorage.clear()
                          setMobileMenuOpen(false)
                        }} 
                        className="flex items-center gap-2 py-2 px-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <CiLogout className="text-primary" />
                        Log out
                      </Link>
                    </div>
                  )}
                </div>

                <Link 
                  href="/createitem" 
                  className="btn btn-primary w-full mt-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sell Now
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar
