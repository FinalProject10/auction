"use client"
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import('../home/navbar'), { ssr: false })
const Footer = dynamic(() => import('../footer/Footer'))
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaClock, FaPaperPlane } from 'react-icons/fa'
import { motion } from 'framer-motion'
import InfoTooltip from '../components/InfoTooltip'

export default function GetInTouch() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    telephone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you! Your message has been sent successfully.')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        telephone: '',
        subject: '',
        message: ''
      })
      setIsSubmitting(false)
      setTimeout(() => setSubmitMessage(''), 5000)
    }, 1000)
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
              Get In Touch
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              We're here to help! Reach out to us with any questions or concerns
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Your Message</h2>
            
            {submitMessage && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    Email Address
                    <InfoTooltip 
                      content="We'll use this email to respond to your inquiry"
                      position="top"
                      iconSize="sm"
                    />
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="telephone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="+1 234 567 8900"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main Street, City, State"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 rounded-full p-4 flex-shrink-0">
                    <FaEnvelope className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      Email Address
                      <InfoTooltip 
                        content="Send us an email anytime and we'll respond within 24 hours"
                        position="top"
                        iconSize="sm"
                      />
                    </h3>
                    <a href="mailto:khelifisalmen9@gmail.com" className="text-red-600 hover:text-red-700 font-semibold">
                      khelifisalmen9@gmail.com
                    </a>
                    <br />
                    <a href="mailto:support@autobid.com" className="text-red-600 hover:text-red-700 font-semibold">
                      support@autobid.com
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 rounded-full p-4 flex-shrink-0">
                      <FaMapMarkerAlt className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        Headquarters
                        <InfoTooltip 
                          content="Visit our office during business hours"
                          position="top"
                          iconSize="sm"
                        />
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        211 Ullamcorper St Roseville, New York,<br />
                        United States, 26483
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 rounded-full p-4 flex-shrink-0">
                      <FaPhoneAlt className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        Phone Number
                        <InfoTooltip 
                          content="Call us during business hours for immediate assistance"
                          position="top"
                          iconSize="sm"
                        />
                      </h3>
                      <a href="tel:+84961566302" className="text-red-600 hover:text-red-700 font-semibold block">
                        Headquarters: +84961566302
                      </a>
                      <a href="tel:+84961566302" className="text-red-600 hover:text-red-700 font-semibold">
                        Sales: +84961566302
                      </a>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 rounded-full p-4 flex-shrink-0">
                      <FaClock className="text-purple-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        Working Hours
                        <InfoTooltip 
                          content="Our support team is available during these hours"
                          position="top"
                          iconSize="sm"
                        />
                      </h3>
                      <p className="text-gray-700">
                        Monday – Friday: 8AM to 8PM<br />
                        Saturday – Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl shadow-lg p-8 border-2 border-red-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Need Immediate Help?</h3>
              <p className="text-gray-700 mb-4">
                For urgent matters, please call us directly. Our team is ready to assist you.
              </p>
              <a
                href="tel:+84961566302"
                className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
