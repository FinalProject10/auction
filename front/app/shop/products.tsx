"use client"
import { FaHammer } from "react-icons/fa";
import Footer from "../footer/Footer";
import React, { useEffect, useState } from 'react'
import { TbLayoutGrid } from "react-icons/tb";
import { FaRegListAlt } from "react-icons/fa";
import { Select, Option } from "@material-tailwind/react";
import { dividerClasses } from "@mui/material";
import Image from "next/image";
import axios from 'axios'
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";
const Products = () => {
    const[flex,setFlex]=useState(true)
    const [open, setOpen] =useState(-1);
    const[data,setData]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:5000/items/getAll').then(r=>setData(r.data))
    },[])
    console.log(data)

    const handleOpen = (value:any) => setOpen(open === value ? 0 : value);
  return (
    <>
    <div className='w-[90%] ml-[5%] mt-[5%]  h-auto flex gap-[5%] mb-auto'>
        <div className='w-[30%] h-auto shadow-2xl rounded-[20px] p-[3%] inline-block'>
        <h1 className=' font-[700] text-[30px] mb-[3%]'>Filters:</h1>
        <h1 className="font-[700] text-[20px] mb-[5%]">Car Models</h1>
        <div className='flex justify-between mt-[10%] mb-[5%] cursor-pointer'>
            <h1 >Audi </h1>
            <h1>(5)</h1>
            </div>
            <hr className=' border-dotted mb-[2%]'/>
            <div className='flex justify-between mb-[5%] cursor-pointer'>
            <h1>BMW </h1>
            <h1>(6)</h1>
            </div>
            <hr className=' border-dotted mb-[2%]'/>
            <div className='flex justify-between mb-[5%] cursor-pointer'>
            <h1>Dacia </h1>
            <h1>(3)</h1>
            </div>
            <hr className=' border-dotted mb-[2%]'/>
            <div className='flex justify-between mb-[5%] cursor-pointer'>
            <h1>Ford </h1>
            <h1>(3)</h1>
            </div>
            <hr className=' border-dotted mb-[2%]'/>
            <div className='flex justify-between mb-[5%] cursor-pointer'>
            <h1>Lamborghini </h1>
            <h1>(1)</h1>
            </div>
            <hr className=' border-dotted mb-[2%]'/>
            <div className='flex justify-between mb-[5%] cursor-pointer'>
            <h1>Mazda</h1>
            <h1>(0)</h1>
            </div>
            <hr className=' border-dotted mb-[2%]'/>
            <div className='flex justify-between mb-[5%] cursor-pointer'>
            <h1>Mercedes-Benz </h1>
            <h1>(4)</h1>
            </div>
            <hr className=' border-dotted mb-[2%]'/>
            <div className='flex justify-between mb-[5%] cursor-pointer'>
            <h1>Mitsubishi </h1>
            <h1>(1)</h1>
            </div>
            <hr className=' border-dotted mb-[2%]'/>
            <div className='flex justify-between mb-[5%] cursor-pointer'>
            <h1>Seat </h1>
            <h1>(1)</h1>
            </div>
            <hr className=' border-dotted mb-[2%]'/>
            <div className='flex justify-between mb-[5%] cursor-pointer'>
            <h1>Tesla </h1>
            <h1>(2)</h1>
            </div>
            <hr className=' border-dotted mb-[2%]'/>
            <div className='flex justify-between mb-[5%] cursor-pointer'>
            <h1>Toyota </h1>
            <h1>(0)</h1>
            </div>
            <hr className=' border-dotted mb-[2%]'/>
            <div className='flex justify-between mb-[5%] cursor-pointer'>
            <h1>Volkswagen </h1>
            <h1>(2)</h1>
            </div>
            <hr className="mb-[3%]"/>
            <div >
            <Accordion placeholder={""} open={open === 1}>
        <div className="flex justify-between">

        <AccordionHeader placeholder={""} onClick={() => handleOpen(1)}>Product Airbags</AccordionHeader>
        <h1 className="mt-[4%] text-[25px]">+</h1>
        </div>
        <AccordionBody>
          <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Curtains</h1>
          </div>
          <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Frontal</h1>
          </div>
          <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Knee</h1>
          </div>
          <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Side-Impact</h1>
          </div>
          



        </AccordionBody>
      </Accordion>
            </div>
<div >
<Accordion placeholder={""} open={open === 2}>
        <div className="flex justify-between">

        <AccordionHeader placeholder={""} onClick={() => handleOpen(2)}>Product Climatisation</AccordionHeader>
        <h1 className="mt-[4%] text-[25px]">+</h1>
        </div>
        <AccordionBody>
        <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Automatic Climate Control</h1>
          </div>
          <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Dual-Zone Climate Control</h1>
          </div>
          <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Manual Climate Control</h1>
          </div>
          <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Multi-Zone Climate Control</h1>
          </div>
          


        </AccordionBody>
      </Accordion>
            </div>
           
            <div >
            <Accordion placeholder={""} open={open === 3}>
        <div className="flex justify-between">

        <AccordionHeader placeholder={""} onClick={() => handleOpen(3)}>Product Body</AccordionHeader>
        <h1 className="mt-[4%] text-[25px]">+</h1>
        </div>
        <AccordionBody>
        <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Convertible</h1>
          </div>
          <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Coupe</h1>
          </div><div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Crossover</h1>
          </div><div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Hatchback</h1>
          </div><div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Sedan</h1>
          </div><div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>SUV</h1>
          </div>  
          






        </AccordionBody>
      </Accordion>
            </div>
            <div className='flex justify-between font-[500] text-[20px] mb-[3%]'>
            <Accordion placeholder={""} open={open === 4}>
        <div className="flex justify-between">

        <AccordionHeader placeholder={""} onClick={() => handleOpen(4)}>Product Color</AccordionHeader>
        <h1 className="mt-[4%] text-[25px]">+</h1>
        </div>
        <AccordionBody>
        <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Yellow</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>White</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Tan</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Silver</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Red</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Green</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Gray</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Blue</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Black</h1>
          </div> 
                </AccordionBody>
      </Accordion>
            </div>
            <div >
            <Accordion placeholder={""} open={open === 5}>
        <div className="flex justify-between">

        <AccordionHeader placeholder={""} onClick={() => handleOpen(5)}>Product Cubic Capacity</AccordionHeader>
        <h1 className="mt-[4%] text-[25px]">+</h1>
        </div>
        <AccordionBody>
        <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>1.0L</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>1.5L</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>2.0L</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>2.5L</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>3.0L</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>3.5L</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>4.0L</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>4.5L</h1>
          </div> 
          <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Electric</h1>
          </div> 
    

        </AccordionBody>
      </Accordion>
            </div>
            <div >
            <Accordion placeholder={""} open={open === 6}>
        <div className="flex justify-between">

        <AccordionHeader placeholder={""} onClick={() => handleOpen(6)}>Product Door Count</AccordionHeader>
        <h1 className="mt-[4%] text-[25px]">+</h1>
        </div>
        <AccordionBody>
        <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>2-Door</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>3-Door</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>4-Door</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>5-Door</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>6-Door</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Convertible</h1>
          </div>

        </AccordionBody>
      </Accordion>
            </div>
            <div className='flex justify-between font-[500] text-[20px] mb-[3%]'>
            <Accordion placeholder={""} open={open === 7}>
        <div className="flex justify-between">

        <AccordionHeader placeholder={""} onClick={() => handleOpen(7)}>Product Emission Class</AccordionHeader>
        <h1 className="mt-[4%] text-[25px]">+</h1>
        </div>
        <AccordionBody>
        <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Electric</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Euro3</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Euro4</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Euro5</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Euro6</h1>
          </div>

        </AccordionBody>
      </Accordion>
            </div>
            <div >
            <Accordion placeholder={""} open={open === 8}>
        <div className="flex justify-between">

        <AccordionHeader placeholder={""} onClick={() => handleOpen(8)}>Product Fuel</AccordionHeader>
        <h1 className="mt-[4%] text-[25px]">+</h1>
        </div>
        <AccordionBody>
        <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>
Diesel
</h1>
          </div><div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Gasoline</h1>
          </div>
        </AccordionBody>
      </Accordion>
            </div>
            <div >
            <Accordion placeholder={""} open={open === 9}>
        <div className="flex justify-between">

        <AccordionHeader placeholder={""} onClick={() => handleOpen(9)}>Product Gearbox</AccordionHeader>
        <h1 className="mt-[4%] text-[25px]">+</h1>
        </div>
        <AccordionBody>
        <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Automatic</h1>
          </div>
          <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>Manual</h1>
          </div>


        </AccordionBody>
      </Accordion>
            </div>
            <div className='flex justify-between font-[500] text-[20px] mb-[3%]'>
            <Accordion placeholder={""} open={open === 10}>
        <div className="flex justify-between">

        <AccordionHeader placeholder={""} onClick={() => handleOpen(10)}>Product Power</AccordionHeader>
        <h1 className="mt-[4%] text-[25px]">+</h1>
        </div>
        <AccordionBody>
        <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>10000</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>12500</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>15000</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>17500</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>75000</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>100000</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>225000</h1>
          </div> <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>250000</h1>
          </div>
            </AccordionBody>
      </Accordion>
            </div>
            <div >
            <Accordion placeholder={""} open={open === 11}>
        <div className="flex justify-between">

        <AccordionHeader placeholder={""} onClick={() => handleOpen(11)}>Product Mileage</AccordionHeader>
        <h1 className="mt-[4%] text-[25px]">+</h1>
        </div>
        <AccordionBody>
        <div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>75</h1>
          </div><div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>100</h1>
          </div><div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>125</h1>
          </div><div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>150</h1>
          </div><div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>175</h1>
          </div><div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>200</h1>
          </div><div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>225</h1>
          </div><div className="flex w-[280px] h-[56px] justify-center items-center border-[1px] border-gray-200 rounded-[15px] cursor-pointer hover:border-[#ff2800] hover:text-[#ff2800] mb-[3%]">
            <h1>250</h1>
          </div>








        </AccordionBody>
      </Accordion>
            </div>
            <Image className="cursor-pointer mt-[20%]" width={250} height={250} alt="" src={"https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-sidebar_pic-922x1024.jpg"}/>





        </div>
    <div className='w-[1190px] h-[1500px] '>
    <div className='flex justify-between'>
    <div className='flex gap-[20px]' >
    <div className='flex cursor-pointer'>

    <div className=' w-[40px] h-[31px] bg-[#ff2800] flex justify-center items-center rounded-l-[3px] '>
    <TbLayoutGrid size={20} color='white' onClick={()=>{setFlex(true)}}/>
        </div>
        <div className='w-[40px] h-[31px] bg-white flex justify-center items-center rounded-r-[3px] hover:bg-[#ff2800] hover:text-white transition-all'>
    <FaRegListAlt size={20} className='text-[#ff2800] hover:text-white' onClick={()=>{setFlex(false)}}/>
    </div>
    </div> 
    <h1>       Showing</h1>
    </div>
    <div className="mr-[20px]">
    <Select  placeholder={'qs'} label='Default Sorting'>
        <Option>Sort by popularity</Option>
        <Option>Sort by average rating</Option>
        <Option>Sort by latest</Option>
        <Option>Sort by price: high to low</Option>
        <Option>Sort by current bid: Low to high</Option>
        <Option>Sort by current bid: High to low</Option>
        <Option>Sort auction by ending soonest</Option>
        <Option>Sort auction by recently started</Option>
<Option>Sort auction by most activeA</Option>
      </Select>
    </div>


    </div>
    {flex?
    <div className='flex justify-start gap-[17px] mt-[3%] flex-wrap w-full '>
    {data.map((el,i)=>(
    
    <div className=' w-[32%] bg-white rounded-3xl  shadow-2xl'>
            <div style={{background:`url(${el.images[0]})`,backgroundSize:'cover'}}  className='w-full h-[190px]  rounded-t-3xl overflow-hidden'>
            <div className="flex justify-between mt-[56%]">
            <div>
                <h1 className="text-white font-[700]">{Math.floor((new Date(el.timeEnd) - new Date(el.timeStart))/3600000)}H</h1>
            </div>
            <div className="flex justify-center items-center  w-[30px] h-[30px] rounded-[5px] hover:bg-[#ff2800]  transition-all">
            <FaHammer   size={25} className='text-white cursor-pointer'/>
            </div>

            </div>
            </div>
            <div className='p-[15px] text-[#333333]'>
            <h1 className='cursor-pointer hover:text-[#ff2800] text-[20px] font-[600]'>{el.name}</h1>
            <h1 className='mb-[10px] font-[500]'>2018 · 121 787 km · 2 995 cm3 · Diesel</h1>
            

            <h1 className='font-[300] text-[13px]'>Auction Ended</h1>
            </div>
    </div>
    
 
    ))}</div>:<div className="grid w-full">
    {data.map((el,i)=>(
    <div className="w-full h-[198px]  rounded-[10px] bg-white flex shadow-2xl">
        <div 
        className="w-[313px] h-full rounded-l-[10px] inline-block"
        style={{background:`url(${el.images[0]})`,backgroundSize:'cover'}}>
            <div className="flex justify-center items-center rounded-[10px] w-[100px] h-[40px]  ml-[5%]  backdrop-blur-[50px]	text-white">
                <h1 >{Math.floor((new Date(el.timeEnd) - new Date(el.timeStart))/3600000)}H</h1>
                </div>
        </div>
        <div className="mt-[5%] ml-[5%]">
        <h1 className='cursor-pointer hover:text-[#ff2800] text-[20px] font-[600]'>{el.name}</h1>

        <h1 className='mb-[10px] font-[500]'>2018 · 121 787 km · 2 995 cm3 · Diesel</h1>
        <h1 className='font-[300] text-[13px]'>Auction Ended</h1>
        <div className="flex justify-center items-center  w-[30px] h-[30px] rounded-[5px] hover:bg-[#ff2800] hover:text-white ml-[170%]  transition-all">
            <FaHammer   size={25} className='text-black cursor-pointer'/>
            </div>
        </div>
    </div>))}
    
        </div>}
    
        </div>
    </div>
     
    </>
  )
}

export default Products