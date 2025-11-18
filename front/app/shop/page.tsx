import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Products = dynamic(() => import("./products"));

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-gray-200 py-8 sm:py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href={"/home"} className="hover:text-red-500 transition-colors duration-200">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-semibold">Shop</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">Auctions</h1>
          <p className="text-gray-600 text-lg">Browse our premium car auction listings</p>
        </div>
      </div>
      <Products />
    </div>
  );
};

export default Page;
