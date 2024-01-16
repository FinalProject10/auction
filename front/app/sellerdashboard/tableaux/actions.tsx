"use client"
import React,{useState} from "react"
interface ActionsProps {
    action:string;
    setAction:React.Dispatch<React.SetStateAction<string>>;
    setIsEdit:React.Dispatch<React.SetStateAction<boolean>>;
    setIsDelete:React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Actions(props:ActionsProps){
    const [hidden,setHidden]=useState(true)
    const setIsDelete=props.setIsDelete
    const setIsEdit=props.setIsEdit
    const action=props.action
    const setAction = props.setAction
    const show=()=>{
        setHidden(!hidden)
    }
    const handleClick =(act:ActionsProps["action"])=>{
        setAction(act)
        if(act==="Delete"){
            setIsDelete(true)
            setIsEdit(false)
        }
        else if(act==="Edit"){
            setIsEdit(true)
            setIsDelete(false)
        }
    }
   return(
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
        <div>
            <button onClick={()=>{show()}} id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500
             bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4
              focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800
               dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600
                dark:focus:ring-gray-700" type="button">
                <span className="sr-only">Action button</span>
                Action
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            {!hidden&& <div id="dropdownAction" className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul className="py-1 cursor-pointer text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                    <li onClick={()=>{handleClick("Edit")}}>
                        <p className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Update</p>
                    </li>
                    
                    <li onClick={()=>{handleClick("Delete")}}>
                        <p className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</p>
                    </li>
                   
                   
                </ul>
                
                </div>
           
        }

        </div>
        <label  className="sr-only">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="text" id="table-search-users" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
        </div>
    </div>
    </div>
   ) 
}