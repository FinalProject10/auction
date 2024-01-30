"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../home/navbar";
import Link from "next/link";
import { GiFlatHammer } from "react-icons/gi";
import { IoStatsChart } from "react-icons/io5";
import { dividerClasses } from "@mui/material";
import { useRouter } from "next/navigation";
import Dash from './dashboard/page'
import axios from "axios";
import Prod from "./products.tsx/page";
import Edit from './editAcc/page'
const Dashboard = () => {
  const [show, setShow] = useState([true, false, false, false]);
  const [data, setData] = useState([true, false, false, false]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [newPass, setNewpass] = useState("");
  const [cars, setCars] = useState([]);
  const [bids, setBids] = useState([]);
  const [page, setPages] = useState(1);
  const [ended, setEnded] = useState([]);


  
  //   const [currentTime, setCurrentTime] = useState(new Date());

  //   useEffect(() => {
  //     const intervalId = setInterval(() => {
  //       setCurrentTime(new Date());
  //     }, 1000);
  // console.log(currentTime)
  //     return () => clearInterval(intervalId); // Clean up interval on component unmount
  //   }, [currentTime]);
  // console.log(cars)
  const router = useRouter();
  return (
    <div>
      <Navbar />
      <div className="bg-[#F2F2F2] h-[170px] w-full">
        <div className="pl-[6%] pt-[3%]">
          <Link href={"/home"}>
            {" "}
            <h1 className="text-[#999999] inline-block mb-[2%]">Home / </h1>
          </Link>
          <span className="text-[#999999]">dashboard</span>
          <h1 className="text-[35px] font-[700]">Dashboard</h1>
        </div>
      </div>
      <div className="grid mb-[10%] gap-[30px] grid-cols-[260px,auto] w-[90%] h-auto ml-[5%] mt-[5%]">
        <div className=" shadow-2xl h-fit">
          <div
            onClick={() => {
              setShow([true, false, false, false]);
              setData([true, false, false, false]);
            }}
            className="w-full h-[55px] hover:text-[#ff2800] hover:bg-white border-b-[1px] border-white  cursor-pointer"
            style={{
              color: show[0] ? "#ff2800" : "white",
              backgroundColor: show[0] ? "white" : "#ff2800",
            }}
          >
            {" "}
            <h1 className="p-3 font-[500] text-[20px]">DASHBOARD</h1>
          </div>
          <div
            onClick={() => {
              setShow([false, true, false, false]);
              setData([false, true, false, false]);
            }}
            className="w-full h-[55px] border-b-[1px] border-white cursor-pointer"
            style={{
              color: show[1] ? "#ff2800" : "white",
              backgroundColor: show[1] ? "white" : "#ff2800",
            }}
          >
            {" "}
            <h1 className="p-3 font-[400] text-[20px]">PRODUCTS</h1>
          </div>
          <div
            onClick={() => {
              setShow([false, false, true, false]);
              setData([false, false, true, false]);
            }}
            className="w-full h-[55px] border-b-[1px] border-white cursor-pointer"
            style={{
              color: show[2] ? "#ff2800" : "white",
              backgroundColor: show[2] ? "white" : "#ff2800",
            }}
          >
            {" "}
            <h1 className="p-3 font-[400] text-[20px]">WITHDRAW</h1>
          </div>
          <div
            onClick={() => {
              setShow([false, false, false, true]);
              setData([false, false, false, true]);
            }}
            className="w-full h-[55px] border-b-[1px] border-white cursor-pointer"
            style={{
              color: show[3] ? "#ff2800" : "white",
              backgroundColor: show[3] ? "white" : "#ff2800",
            }}
          >
            {" "}
            <h1 className="p-3 font-[400] text-[20px]">SETTINGS</h1>
          </div>
          <div
            onClick={() => {
              localStorage.clear();
              router.push("/");
            }}
            className="w-full h-[55px] border-b-[1px] border-white cursor-pointer"
            style={{
              color: show[4] ? "#ff2800" : "white",
              backgroundColor: show[4] ? "white" : "#ff2800",
            }}
          >
            {" "}
            <h1 className="p-3 font-[400] text-[20px]">Log Out</h1>
          </div>
        </div>
        {data[0]&&<Dash/>}
        {data[1]&&<Prod/>}
        {data[2]&&<Edit/>}
        </div>
        
    </div>
  );
};

export default Dashboard;
