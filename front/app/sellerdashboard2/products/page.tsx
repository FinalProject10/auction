"use client"
import {useState,useEffect} from 'react'
import axios from 'axios'

import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../../home/navbar"));
const Header = dynamic(() => import("../header/page"));
const Products = dynamic(() => import("./products"));
const NoProductsFound = dynamic(() => import("../products/noproducts"));
const  Footer = dynamic(() => import("../../footer/Footer"));

export default function MainProducts(){
    const [products,setProducts]=useState<[]>([])
    
    const fetchAll = ()=>{
        axios.get('http://localhost:5000/items/fetch-items/').then((result)=>{
            setProducts(result.data)
        }).catch((err)=>{
            console.log(err)
        }) 
       }
    useEffect(()=>{
        fetchAll()
          },[])
   
    return(
        <div>
            <Navbar/>
            <Header/>
           {products.length ?  <Products setProducts={setProducts} products={products} /> : <NoProductsFound/>}
            <Footer/>
        </div>
    )
}