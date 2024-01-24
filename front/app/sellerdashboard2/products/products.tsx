"use client"
import {useState,useEffect} from 'react'
import axios from 'axios'

import './products.css'
import SideBar from '../sidebar/page'
import Table from './table'
import Link from 'next/link'

export default function Products(){
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
        <div className="container">
            <div className="side">
                <SideBar h={756} />
            </div>
            <div className="main">
            <div className="header">
                <div className="stats">
                    <div className="all">
                    <p>All</p>
                    <span>{(products.length)}</span>
                    </div>
                    <div className="all">
                    <p>Pending Review</p>
                    <span>{(products.length)}</span>
                    </div>
                    <div className="all">
                    <p>In stock</p>
                    <span>{(products.length)}</span>
                    </div>
                    
                </div>
                <Link  href="/sellerdashboard2/addproduct" >
                <div className="add-product-button">
                    
                + Add New Product
              
                </div>
                </Link>
            </div>
             <div className="filter-reset-search">
                    <div className="filter-reset">
                        <input type="text" className='nice-input' />
                        <input type="text" className='nice-input' />
                        <button>filter</button>
                        <button>reset</button>
                    </div>
                    <div className="search">
                    <input type="text" className='nice-input' />
                        <button>search</button>
                    </div>
                </div> 
                <div className="apply">
                    <input type="text" className='nice-input' />
                    <button>Apply</button>
                </div>
                <div className="table">
                <Table products={products} />
                </div>
                </div>
        </div>
            
    )
}