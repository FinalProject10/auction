import React from 'react'
import "../editclientprofile/edit.css"
export default function EditProfile(){
    return (
        <>
        <div className='comp'>
           {/*
<div className="head">
                <div className="head1">Home/My Account</div>
                <div className="head2">Welcome!username</div>
            </div>
            <div className="sidebar">
                
                <h1>Manage my Account</h1>
                <div className="sidebar-blocks">
                <p>My Profile</p>
                <p>Address Book</p>
                <p>My Payment Options</p>
                
                </div>
              
                <h1>My Orders</h1>
                <div className="sidebar-blocks">
                <p>My Profile</p>
                <p>Address Book</p>
                <p>My Payment Options</p>
                
                </div>
                

            </div>
    */} 
        
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-6">Edit your Profile</h1>
      <form >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              
             
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-red-500"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-red-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              
              
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-red-500"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
             
              
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-red-500"
              required
            />
          </div>
          <div>
            <label htmlFor="telephone" className="block mb-1">
              Telephone
            </label>
            <input
              type="text"
              id="telephone"
              name="telephone"
              placeholder="Telephone"
             
              
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-red-500"
              required
            />
          </div>
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-2">Password Changes</h2>
            <div>
              <label htmlFor="oldPassword" className="block mb-1">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                placeholder="Old Password"
               
                
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-red-500"
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="New Password"
                
                
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-red-500"
                required
              />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="ml-3 border border-red-500 text-red-500 font-semibold py-2 px-4 rounded-md transition duration-300 hover:bg-red-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    </div>
      </>
    )
}