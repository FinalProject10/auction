import React from "react";
import "../createitem/createitem.css"
export default function CreateItem() {
  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center  ">
      <div className="mb-90 bg-gray-900 dark:bg-gray-800 shadow-lg rounded-lg p-6 text-white w-full md:w-96 box-container">
        <div className="h1">
        <h1 className=" text-xl font-semibold mb-10">Please fill in your Item's informations</h1>
        </div>

        <div className="mb-10  ">
          <input type="text" placeholder="Image" className="border p-2 rounded w-full bg-gray-700" />
        </div>
        <div className="mb-10">
          <input type="text" placeholder="Name" className="border p-2 rounded w-full bg-gray-700" />
        </div>
        <div className="mb-10">
          <input type="text" placeholder="Price" className="border p-2 rounded w-full bg-gray-700" />
        </div>
        <div className="mb-10">
          <input type="text" placeholder="Time Start" className="border p-2 rounded w-full bg-gray-700" />
        </div>
        <div className="mb-10">
          <input type="text" placeholder="Time End" className="border p-2 rounded w-full bg-gray-700" />
        </div>

        <button
          type="button"
          id="theme-toggle"
          className="py-2 rounded bg-red-500 text-white hover:bg-red-600 focus:outline-none transition-colors w-full"
        >
          Post your Item
        </button>
      </div>
    </div>
  );
}