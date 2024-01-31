"use client"
import {useState} from "react"
import {Dispatch} from "react"
import MainProducts from './page'
import './products.css'
import SideBar from '../sidebar/page'
import Table from './table'
import Link from 'next/link'
interface PropsProduct {
    products:[];
    setProducts:Dispatch<React.SetStateAction<[]>>;
}
export default function Products({products, setProducts}){
    const [name,setName]=useState<string>("")
   const search=(name)=>{
    setProducts(products.filter((e,i)=>{
        return e.name===name
    }))
   }
   
    return(
        <div className="cont-products">
            <div className="side">
                <SideBar h={1000} />
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
                <Link  href="/sellerdashboard2/addproduct/product/add" >
                <div className="add-product-button">
                    
                + Add New Product
              
                </div>
                </Link>
            </div>
             <div className="filter-reset-search">
                    <div className="filter-reset">
                    <div className="select-container">
    <select id="selectBox" className="select-box">
      <option value="" disabled selected>Select a category</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
  </div>

                    <div className="select-container">
    <select id="selectBox" className="select-box">
      <option value="" disabled selected>All Dates</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
  </div>
                        <button>filter</button>
                        <button>reset</button>
                    </div>
                    <div className="search">
                    <input onChange={(e)=>{setName(e.target.value)}} type="text" className='nice-input' />
                        <button onClick={()=>{search(name)}} >search</button>
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