"use client"
import React, { useEffect, useState } from 'react'

import dynamic from "next/dynamic";
const SideBare = dynamic(() => import("../AdminSidebar/page"));
import axios from 'axios'
// interface reclam{
//   message:string
// }
const Inbox = () => {
  const [reclamtion,setReclamatio]= useState <[]>([])
  const [mess,setMess] =useState(null)
  const [refresh , setRefrech]= useState (true)

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/dash/getReclam')
      .then((res) => {
        const Data: [] = res.data;
        setReclamatio(Data);
       
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);
  const remove =async (id:number) => {
    try {
      await axios.delete(`http://localhost:5000/dash/removeRec/${id}`)
      setRefrech(!refresh)
    } catch  (err) {
      console.log(err);
    } 
  }
  const Msg = (id: number, email: string, image: string, name: string, lastName: string, message: string) => {
    setMess({ id, email, image, name, lastName, message });
  };
  
  return (
    <div  className="flex-row lg:flex">
    <SideBare/>
    <div className="container mx-auto mt-4 lg:mt-12 overflow-y-auto">
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 ">
   
<main className="flex w-[100%] h-[10%] ml-[5%] mt-[-2%] ">
  
    <section className="flex flex-col pt-3 w-4/12 bg-gray-50 h-full ">
      <label className="px-3">
        <input className="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
          placeholder="Search..." />
      </label>
      {reclamtion.map((el=>(
        <ul className="mt-6 overflow-y-scroll" onClick={()=>{Msg(el.Client.id,el.Client.email,el.Client.image,el.Client.name,el.Client.lastName,el.message)}}>
        <li className="py-5 border-b px-3 transition hover:bg-indigo-100">
          <a href="#" className="flex justify-between items-center">
            <h3 className="text-lg font-semibold" >{el.Client?.name}</h3>
            <p className="text-md text-gray-400">{new Date(el.createdAt).getHours()}:{new Date(el.createdAt).getMinutes()}mn</p>
          </a>
        </li>
      </ul>
      )))}
    </section>
    <section className="w-6/12 px-4 flex flex-col bg-white rounded-r-3xl">
      <div className="flex justify-between items-center h-48 border-b-2 mb-8">
        <div className="flex space-x-4 items-center">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img src="https://shorturl.at/eosQ1"
   className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg">{mess?.name} {mess?.lastName}</h3>
            <p className="text-light text-gray-400">{mess?.email}</p>
          </div>
        </div>
        <div>
        </div>
      </div>
      <section>
        
        <article className="mt-8 text-gray-500 leading-7 tracking-wider">
          
          <p>{mess?.message}</p>
          <footer className="mt-12">
           
          </footer>
        </article>
       
      
      </section>
      <section className="mt-6 border rounded-xl bg-gray-50 mb-3">
        <textarea className="w-full bg-gray-50 p-2 rounded-xl" placeholder="Type your reply here..." rows="3"></textarea>
        <div className="flex items-center justify-between p-2">
        
          <button className="bg-purple-600 text-white px-6 py-2 rounded-xl" >Reply</button>
        </div>
      </section>
    </section>
  </main>
      </div>
       </div>
       </div>
  )
}

export default Inbox