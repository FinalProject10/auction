"use client"

import React, { useState } from 'react';
import './faq.css';
import Navbar from "../home/navbar"
interface AccordionItem {
  id: number;
  title: string;
  content: string;
  expanded: boolean;
}

const FAQ: React.FC = () => {
  const [accordionItems, setAccordionItems] = useState<AccordionItem[]>([
    {
      id: 1,
      title: 'How does the bidding process work on your website?',
      content: 'The bidding process involves placing monetary offers on vehicles. The highest bid at the auctions end wins.',
      expanded: false,
    },
    {
      id: 2,
      title: 'What types of vehicles are available for bidding on your website?',
      content: 'We offer a variety of vehicles for bidding, including cars, trucks, and more. ',
      expanded: false,
    },
    {
        id: 3,
        title: 'What is the bidding increment, and how does it affect the auction?',
        content: ' The bidding increment is the minimum amount by which a bid must increase. It ensures a fair and structured auction.',
        expanded: false,
      },
      {
        id: 4,
        title: 'Is there a reserve price, and how does it influence the auction?',
        content: 'Yes, there may be a reserve price. If its not met, the item wont be sold. It encourages competitive bidding.',
        expanded: false,
      },
      {
        id: 5,
        title: 'What measures are in place to ensure the security and authenticity?',
        content: 'We employ strict security measures and authentication processes to guarantee a safe and genuine auction environment.',
        expanded: false,
      },
      {
        id: 6,
        title: 'Are there any buyer s premiums or additional fees associated with winning a bid?',
        content: 'Yes, winning bids may have buyers premiums or additional fees. Its important to check the terms and conditions for details.',
        expanded: false,
      }
   
  ]);

  const toggleAccordion = (id: number) => {
    setAccordionItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className='content_cart mb-8'>
          <div className='cartt bg-gray-100 rounded-lg p-6'>
            <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <a href="/home" className="hover:text-red-500 transition-colors">Home</a>
              <span>/</span>
              <span className="text-gray-900 font-medium">FAQ</span>
            </nav>
            <h3 className='title_cart text-4xl font-bold text-gray-900'>FAQ</h3>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our auction platform, bidding process, and services.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-4xl mx-auto">
          {accordionItems.map((item, index) => (
            <div 
              className="accordion-item bg-white rounded-lg shadow-md mb-4 overflow-hidden transition-all duration-300 hover:shadow-lg" 
              key={item.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button 
                onClick={() => toggleAccordion(item.id)}
                aria-expanded={item.expanded}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="accordion-title text-lg font-semibold text-gray-900 pr-4">{item.title}</span>
                <span 
                  className={`icon text-2xl font-bold text-red-500 transition-transform duration-300 ${
                    item.expanded ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                >
                  {item.expanded ? '−' : '+'}
                </span>
              </button>
              <div 
                className={`accordion-content overflow-hidden transition-all duration-300 ${
                  item.expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 pt-2">
                  <p className="text-gray-700 leading-relaxed">{item.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help Section */}
        <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
          <p className="text-gray-700 mb-6">Can't find the answer you're looking for? Please reach out to our friendly team.</p>
          <a 
            href="/getInTouch" 
            className="inline-block px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
