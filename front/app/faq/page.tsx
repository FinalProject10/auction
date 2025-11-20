"use client"
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import './faq.css'
const Navbar = dynamic(() => import("../home/navbar"), { ssr: false })
const Footer = dynamic(() => import('../footer/Footer'))
import { motion } from 'framer-motion'
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import Link from 'next/link'
import InfoTooltip from '../components/InfoTooltip'

interface AccordionItem {
  id: number
  title: string
  content: string
  expanded: boolean
}

const FAQ: React.FC = () => {
  const [accordionItems, setAccordionItems] = useState<AccordionItem[]>([
    {
      id: 1,
      title: 'How does the bidding process work on your website?',
      content: 'The bidding process involves placing monetary offers on vehicles. The highest bid at the auction\'s end wins. You can place bids manually or use our proxy bidding feature to automatically bid up to your maximum amount.',
      expanded: false,
    },
    {
      id: 2,
      title: 'What types of vehicles are available for bidding on your website?',
      content: 'We offer a variety of vehicles for bidding, including cars, trucks, SUVs, and more. Each vehicle comes with detailed information, images, and specifications to help you make informed decisions.',
      expanded: false,
    },
    {
      id: 3,
      title: 'What is the bidding increment, and how does it affect the auction?',
      content: 'The bidding increment is the minimum amount by which a bid must increase. It ensures a fair and structured auction. Increments vary based on the current bid amount: under $100 (+$5), $100-$999 (+$10), $1,000-$9,999 (+$50), and $10,000+ (+$100).',
      expanded: false,
    },
    {
      id: 4,
      title: 'Is there a reserve price, and how does it influence the auction?',
      content: 'Yes, there may be a reserve price set by the seller. If the reserve price is not met, the item won\'t be sold. This encourages competitive bidding and protects sellers while ensuring fair market value.',
      expanded: false,
    },
    {
      id: 5,
      title: 'What measures are in place to ensure the security and authenticity?',
      content: 'We employ strict security measures and authentication processes to guarantee a safe and genuine auction environment. This includes encrypted transactions, verified seller accounts, vehicle history checks, and secure payment processing.',
      expanded: false,
    },
    {
      id: 6,
      title: 'Are there any buyer\'s premiums or additional fees associated with winning a bid?',
      content: 'Yes, winning bids may have buyer\'s premiums or additional fees. The auction fee is typically a percentage of the winning bid amount. It\'s important to check the terms and conditions for each auction to understand all associated costs before bidding.',
      expanded: false,
    },
    {
      id: 7,
      title: 'How do deposits and bidding power work?',
      content: 'Deposits are required to participate in auctions. Your bidding power is calculated as your total deposits multiplied by 10. For example, a $100 deposit gives you $1,000 in bidding power. This ensures all bidders have sufficient funds.',
      expanded: false,
    },
    {
      id: 8,
      title: 'Can I cancel a bid after placing it?',
      content: 'Bids are generally final once placed. However, if you placed a bid in error, please contact our support team immediately. We may be able to assist depending on the circumstances and timing.',
      expanded: false,
    }
  ])

  const toggleAccordion = (id: number) => {
    setAccordionItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, expanded: !item.expanded } : { ...item, expanded: false }
      )
    )
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <header>
        <Navbar />
      </header>
      <div className="faq-page-container">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <nav className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-4">
              <Link href="/home" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">FAQ</span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Find answers to common questions about our auction platform, bidding process, and services
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Accordion */}
        <div className="max-w-4xl mx-auto">
          {accordionItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg mb-4 overflow-hidden transition-all duration-300 hover:shadow-xl border-2 border-gray-100 hover:border-red-200"
            >
              <button
                onClick={() => toggleAccordion(item.id)}
                aria-expanded={item.expanded}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    item.expanded ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <FaQuestionCircle />
                  </div>
                  <span className="text-lg font-semibold text-gray-900 pr-4">{item.title}</span>
                </div>
                <div className={`flex-shrink-0 transition-transform duration-300 ${
                  item.expanded ? 'rotate-180' : ''
                }`}>
                  {item.expanded ? (
                    <FaChevronUp className="text-red-600 text-xl" />
                  ) : (
                    <FaChevronDown className="text-gray-400 text-xl" />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  item.expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 pt-2 ml-14">
                  <p className="text-gray-700 leading-relaxed">{item.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Help Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-16"
        >
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl shadow-xl p-8 md:p-12 text-center border-2 border-red-100">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
              <FaQuestionCircle className="text-red-600 text-3xl" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Still have questions?</h3>
            <p className="text-gray-700 mb-8 text-lg max-w-2xl mx-auto">
              Can't find the answer you're looking for? Please reach out to our friendly support team. We're here to help!
            </p>
            <Link
              href="/getInTouch"
              className="inline-block px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-12"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/Howitwork"
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all border-2 border-gray-100 hover:border-red-200 group"
            >
              <div className="text-3xl mb-3 group-hover:text-red-600 transition-colors">📖</div>
              <h4 className="font-bold text-gray-900 mb-2">How It Works</h4>
              <p className="text-gray-600 text-sm">Learn about our auction process</p>
            </Link>
            <Link
              href="/aboutUs"
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all border-2 border-gray-100 hover:border-red-200 group"
            >
              <div className="text-3xl mb-3 group-hover:text-red-600 transition-colors">ℹ️</div>
              <h4 className="font-bold text-gray-900 mb-2">About Us</h4>
              <p className="text-gray-600 text-sm">Discover our story and mission</p>
            </Link>
            <Link
              href="/shop"
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all border-2 border-gray-100 hover:border-red-200 group"
            >
              <div className="text-3xl mb-3 group-hover:text-red-600 transition-colors">🚗</div>
              <h4 className="font-bold text-gray-900 mb-2">Browse Auctions</h4>
              <p className="text-gray-600 text-sm">Explore available vehicles</p>
            </Link>
          </div>
        </motion.div>
      </div>
      </div>

      <Footer />
    </div>
  )
}

export default FAQ
