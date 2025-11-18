"use client"
import React, { useState } from "react"
import Navbar from "../home/navbar"
import "../contactus/contact.css"

export default function Contact(){
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        telephone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Have a question or need assistance? We're here to help. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
                <div className="box-container rounded-xl shadow-xl overflow-hidden">
                    <div className="form-section rounded-lg p-8 md:p-10">
                        <div className="send-msg-text mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">Send Your Message</h1>
                            <p className="text-gray-600 mt-2">Fill out the form below and we'll get back to you shortly.</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                   
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block mb-2 text-sm font-semibold text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-2 text-sm font-semibold text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="telephone" className="block mb-2 text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block mb-2 text-sm font-semibold text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-semibold text-gray-700">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is this regarding?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-semibold text-gray-700">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              placeholder="Tell us how we can help you..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
              required
            />
          </div>
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="w-full md:w-auto px-10 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 uppercase tracking-wide"
          >
            Send Message
          </button>
        </div>
      </form>
                </div>
                <div className="text-section bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 md:p-10 rounded-lg">
                    <div className="texts">
                        <div className="mb-8">
                            <h2 className="heading text-2xl font-bold mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Email Address
                            </h2>
                            <p className="text-gray-300 hover:text-white transition-colors">office@autobid.modeltheme.com</p>
                            <p className="text-gray-300 hover:text-white transition-colors">sales@autobid.modeltheme.com</p>
                        </div>
                        <div className="border-t border-gray-700 my-8"></div>
                        <div className="mb-8">
                            <h2 className="heading text-2xl font-bold mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Headquarters
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                211 Ullamcorper St Roseville, New <br />
                                York, United States, 26483
                            </p>
                        </div>
                        <div className="border-t border-gray-700 my-8"></div>
                        <div className="mb-8">
                            <h2 className="heading text-2xl font-bold mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Phone Number
                            </h2>
                            <p className="text-gray-300">
                                Headquarters: <span className="text-white font-semibold">+20 000 000 000</span>
                                <br />Sales: <span className="text-white font-semibold">+20 000 000 000</span>
                            </p>
                        </div>
                        <div className="border-t border-gray-700 my-8"></div>
                        <div>
                            <h2 className="heading text-2xl font-bold mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Working Hours
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                Monday – Friday: <span className="text-white font-semibold">8AM to 8PM</span>
                                <br />
                                Saturday – Sunday: <span className="text-red-400">Closed</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    )
}