import React from "react"


export default function CreateItem() {
    return (
        <div>
            <div className=" bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
    <div className="container mx-auto p-4">
        <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6">
            <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Personal Information</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Use a permanent address where you can receive mail.</p>
          
               
                <div className="mb-4">
                    <input type="email" placeholder="Image" className="border p-2 rounded w-full"/>
                </div>
                <div className="mb-4">
                <input type="text" placeholder="Name" className="border p-2 rounded w-full"/>
                </div>
                <div className="mb-4">
                    <input type="text" placeholder="Price" className="border p-2 rounded w-full"/>
                </div>
                <div className="mb-4">
                    <input type="text" placeholder="Time Start" className="border p-2 rounded w-full"/>
                </div>
                <div className="mb-4">
                    <input type="text" placeholder="Time End" className="border p-2 rounded w-full"/>
                </div>
                
                <button type="button" id="theme-toggle" className="ml-60%-4 py-2 rounded bg-red-500 text-white hover:bg-red-600
             focus:outline-none transition-colors w-full text-center">
                    Post your Item
                </button>
            
        </div>
        </div>
    </div>
    </div>
       
        
    )
}