"use client"
import React,{useEffect,useState} from 'react';

import './ourproduct.css';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Link from 'next/link';
import axios from "axios"
const OurProducts: React.FC = () => {
  const [products,setProducts]=useState<[]>([])
useEffect(()=>{
  axios.get("http://localhost:5000/items/fetch-items").then((response)=>{
    setProducts(response.data)
  }).catch((err)=>{
    console.log(err.message)
  })
})

  return (<div className="container">
   
    <div className="my-orders-list">
      <div className="list-header">
        <div className="txt">
      < BusinessCenterIcon/>
        <h2 style={{color:'white'}} >Products</h2> 
        </div>
        <div className="add-product-btn">
            <Link  href='/sellerdashboard2/addproduct/product/add'>+ add new product</Link>
        </div>
      
      </div>
      <div className="list-item">
        <p>Total</p>
        <p className='p2'> {products.length} </p>
      </div>
      <div className="list-item">
        <p>Live</p>
        <p className='p2'> {products.length} </p>
      </div>
      <div className="list-item">
        <p>Offline</p>
        <p className='p2'> {products.length} </p>
      </div>
      <div className="list-item">
        <p>Pending Review</p>
        <p className='p2'> {products.length} </p>
      </div>
      
    </div>
    </div>
  );
};
export default OurProducts