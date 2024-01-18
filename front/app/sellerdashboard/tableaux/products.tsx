"use client"
import EditIcon from '@mui/icons-material/Edit';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import React,{useState,useEffect} from "react"
import Actions from "./actions"
export default function AddedProducts(){
    const [action,setAction]=useState("")
    const [isDelete,setIsDelete]=useState<boolean>(false)
    const [isEdit,setIsEdit]=useState<boolean>(false)
    useEffect(()=>{
        ()=>{console.log("component rerenderd due to operation change.")}
    },[isDelete,isEdit])
   return( <>
   <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
    <Actions setIsDelete={setIsDelete} setIsEdit={setIsEdit} action ={action} setAction ={setAction} />
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                <th scope="col" className="px-6 py-3">
                    Qty
                </th>
                <th scope="col" className="px-6 py-3">
                    Initial Price
                </th>
                <th scope="col" className="px-6 py-3">
                   Time Start
                </th>
                <th scope="col" className="px-6 py-3">
                   Time End
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                    <img src="/docs/images/products/apple-watch.png" className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch"/>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    Apple Watch
                </td>
                <td className="px-6 py-4">
                    
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    $599
                </td>
                <td className="px-6 py-4">
                    <p>12/20/2320</p>
                </td>
                <td className="px-6 py-4">
                    <p>12/20/2320</p>
                </td>
                <td className="px-6 py-4">
                    {
                       isEdit&&<EditIcon/> ||isDelete&&<DeleteSharpIcon/>
                    }
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                    <img src="/docs/images/products/imac.png" className="w-16 md:w-32 max-w-full max-h-full" alt="Apple iMac"/>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    iMac 27"
                </td>
                <td className="px-6 py-4">
                    
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    $2499
                </td>
                
                <td className="px-6 py-4">
                    <p>12/20/2320</p>
                </td>
                <td className="px-6 py-4">
                    <p>12/20/2320</p>
                </td>
                <td className="px-6 py-4">
                    {
                       isEdit&&<EditIcon/> ||isDelete&&<DeleteSharpIcon/>
                    }
                </td>
               
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                    <img src="/docs/images/products/iphone-12.png" className="w-16 md:w-32 max-w-full max-h-full" alt="iPhone 12"/>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    IPhone 12 
                </td>
                <td className="px-6 py-4">
                   
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    $999
                </td>
                <td className="px-6 py-4">
                    <p>12/20/2320</p>
                </td>
                <td className="px-6 py-4">
                    <p>12/20/2320</p>
                </td>
                <td className="px-6 py-4">
                    {
                       isEdit&&<EditIcon/> ||isDelete&&<DeleteSharpIcon/>
                    }
                </td>
            </tr>
        </tbody>
    </table>
</div>
</div>
</>)
}