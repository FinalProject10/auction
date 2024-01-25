"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import dynamic from "next/dynamic";
const SideBare = dynamic(() => import("../AdminSidebar/page"));
interface Product {
    image: string;
    name: string;
    lastName: string;
    telNumb: string;
    cinNum: string;
    address: string;
    items: { images: [];
    name : string;
price : number }[];
  }
  
const sellerProduct = () => {
   const [oneProduct,setOneProduct]=useState <Product[]>([])


   
const adminId=localStorage.getItem('adminId')



   useEffect(() => {
    axios
      .get(`http://localhost:5000/dash/getOne/${adminId}`)
      .then((res) => {
        const Data: Product[] = res.data;
        setOneProduct(Data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  return (
    <div  className="flex-row lg:flex">
    <SideBare/>
    <div className="container mx-auto mt-4 lg:mt-12 overflow-y-scroll ">
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">

   
    <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"/>
<link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"/>

<main className="profile-page">
  <section className="relative block h-[400px]">
    <div className="absolute top-0 w-full h-full bg-center bg-cover" style=
            {{"background-image": "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80)"}}
          >
      <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
    </div>
    <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{"transform": "translateZ(0px)"}}>
      <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
        <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
      </svg>
    </div>
  </section>
  <section className="relative py-16 bg-blueGray-200">
    <div className="container mx-auto px-4">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
              <div className="relative">
                <img alt="..." src={oneProduct[0]?.image} className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"/>
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
              <div className="py-6 px-3 mt-32 sm:mt-0">
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4 lg:order-1">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{oneProduct[0]?.items.length}</span><span className="text-sm text-blueGray-400">Product</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
            {oneProduct[0]?.name} {oneProduct[0]?.lastName}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
              {oneProduct[0]?.address}
            </div>
            <div className="mb-2 text-blueGray-600 mt-10">
              <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>{oneProduct[0]?.telNumb}
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-address-card mr-2 text-lg text-blueGray-400"></i>{oneProduct[0]?.cinNum}
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
              


    <div className="grid grid-cols-5 gap-4">
      {oneProduct[0]?.items.map((el,i) => (
        <div>

                 {el.name}
                 {el.price }
            <img className="h-auto max-w-full rounded-lg" src={el.images[0]} alt=""/>
        </div>
      ))}
    </div>


                </p>
                <a href="#pablo" className="font-normal text-pink-500">Show more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap items-center md:justify-between justify-center">
      <div className="w-full md:w-6/12 px-4 mx-auto text-center">
      
      </div>
    </div>
  </div>
</footer>
  </section>
</main>

        
    {/* <div>
   
   <div>
    <img src= {oneProduct[0]?.image}alt="" />
     {oneProduct[0]?.name}
     {oneProduct[0]?.lastName}
     {oneProduct[0]?.telNumb}
     {oneProduct[0]?.cinNum}
     {oneProduct[0]?.address}
     {oneProduct[0]?.items.map((el,i) => (
       <div key={i}>
    <img src={el.images[0]} />  
    {el.name}
    {el.price }
       
       </div>
     ))}
   </div>

</div> */}
    </div>
    </div>
    </div>
  )
}

export default sellerProduct