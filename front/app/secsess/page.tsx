"use client"
import React from 'react'
import axios from 'axios'
const seccess = () => {

  setTimeout(() => {
    const id= localStorage.getItem('userId')
    const role=localStorage.getItem('role')
    
  
    if(role==='client'){
      axios.post(`http://localhost:5001/client/addMembership`,{price:localStorage.getItem('membership'),type:"Ligature",ClientId:id})
      .then(r=>localStorage.setItem('bid','true')).catch(err=>console.log(err))
      console.log('done')}
      else if(role==="seller"){
        axios.post(`http://localhost:5001/client/addMembership`,{price:localStorage.getItem('membership'),type:"Seller Plan",sellerId:id})
      .then(r=>localStorage.setItem('add','true')).catch(err=>console.log(err))
      }

  }, 1000)

  return (
    <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
    <div className="flex">
      <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
      <div>
        <p className="font-bold">we received your payment</p>
        <p className="text-sm">you can bid now </p>
      </div>
    </div>
  </div>
  )
}

export default seccess