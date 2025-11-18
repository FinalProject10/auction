"use client"
import {useState,useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link'
import './table.css'
interface Product {
    name:string;
    category:string;
    price:number;
}
export default function Table(){
    const [products,setProducts]=useState<[]>([])
   const fetchAll = ()=>{
    axios.get('http://localhost:5001/items//fetch-items/').then((result)=>{
        setProducts(result.data)
    }).catch((err)=>{
        console.log(err)
    })
   }
   useEffect(()=>{
    fetchAll()
    
   },[])
   console.log(products)
    return(
      
        <div className="table max-w-2xl mx-auto">
	<div className="flex flex-col">
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Product Name
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Category
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Price
                            </th>
                            <th scope="col" className="p-4">
                                <p >Edit</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                       { 
                        products.map((e:Product,i)=>{
                            return (
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                           
                            
                                
                                <td className="p-4 w-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label  className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"> {e.name} </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white"> {e.category} </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"> {e.price} </td>
                            <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                <Link href="/sellerdashboard2/edit/product" className="text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                            </td>
                           
                            </tr>
                          
                            )
                       })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

	
</div>
    )
}