"use client"
import React, { useEffect, useState } from 'react'

import dynamic from "next/dynamic";
const SideBare = dynamic(() => import("../AdminSidebar/page"));
import '../AdminClientNotBid/bt.css'
import axios from 'axios'
import { Refresh } from '@mui/icons-material'


interface productPro{
  images:string
  name : string 
  price :number 
  timeStart :TimeRanges 
  timeEnd :TimeRanges 
  reviews:number
  views :number 
  watching :number
  description: string 
  longitude :string
  lattitude: string
  sold :number 
  sellers_id: number
}
const listPro = () => {
    const [data,setData]= useState <productPro[]>([])
    const[refrech,setRefrech]=useState(false)

 useEffect(() => {
  axios
    .get('http://localhost:5000/dash/getAllProduc')
    .then((res) => {
      const Data: productPro[] = res.data;
      setData(Data);
    })
    .catch((err) => {
      console.log(err);
    });
}, [refrech]);
const remove= async (id)=>
{
  try {
    await axios.delete(`http://localhost:5000/dash/removeProduct/${id}`);
    setRefrech(!refrech);
  } catch (err) {
    console.log(err);
  } 
}
  return (
    <div className="flex-row lg:flex"> 
    <SideBare/>
    <div className="container mx-auto mt-4 lg:mt-12 overflow-y-auto">
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
            product list
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
<div className="container">

	<table className="text-left w-full">
		<thead className=" w-full">
			<tr className="flex w-full mb-4">
				<th className="p-4 w-1/4">IMAGE</th>
				<th className="p-4 w-1/4">NAME</th>
				<th className="p-4 w-1/4">PRICE</th>
				<th className="p-4 w-1/4">TIME START</th>
        <th className="p-4 w-1/4">TIME END</th>
				<th className="p-4 w-1/4"> REVIE</th>
				<th className="p-4 w-1/4">VIEWS</th>
				<th className="p-4 w-1/4">SOLD</th>
				<th className="p-4 w-1/4"> </th>
				

			</tr>
		</thead>
		<tbody className="bg-grey-light flex flex-col items-center overflow-y-scroll w-full" style={{"height": "74vh"}}>
    {data.map((el)=>
            (
			<tr className="flex w-full mb-4">
				<td className="p-4 w-1/4"> <img src={el.images[0]} alt="" /> </td>
				<td className="p-4 w-1/4">{el.name}</td>
				<td className="p-4 w-1/4">{el.price}</td>
				<td className="p-4 w-1/4"> {el.timeStart}</td>
        <td className="p-4 w-1/4">{el.timeEnd}</td>
				<td className="p-4 w-1/4">{el.reviews}</td>
				<td className="p-4 w-1/4">{el.views}</td>
        <td className="p-4 w-1/4">{el.watching}</td>
        <td className="p-4 w-1/4">{el.sold}</td>
        <td className="p-4 w-1/4">
        <button className="btn" onClick={() => {
        if (new Date(el.timeStart) > new Date() && new Date(el.timeEnd) < new Date()) {
          alert('You can\'t delete this product');
        } else {
          remove(el.id);
        }
      }}>
  <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" className="icon">
  <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
</svg>
</button>
          </td>       
			</tr>
          ))}
		</tbody>
	</table>
</div>
       
            
            
        </div>
      </div>
  </div>
  </div>
  )
}

export default listPro