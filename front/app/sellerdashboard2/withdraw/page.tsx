"use client"
import {useState} from 'react'
import Navbar from "../../home/navbar";
import Header from "../header/page";
import SideBar from "../sidebar/page";
// import './page.css'
import Request from './request';
import LocalAtmTwoToneIcon from '@mui/icons-material/LocalAtmTwoTone';
export default function Withdraw(){
  const [requestWithdraw,setRequestWithdraw]=useState<boolean>(false)
  const request=()=>{
    setRequestWithdraw(true)
  }
    return (
      <div>
      {  requestWithdraw && <Request request={setRequestWithdraw} />}
        <Navbar/>
       < Header/>
       <div className="container">
        <div className="side">
          <SideBar h={756} />
        </div>
      <div className="cards">
        <div className="dokan-panel dokan-panel-default">
          <div className="dokan-panel-heading">
            <h3>Balance</h3>
          </div>
          <div className="dokan-panel-body">
            <p>Your Balance: $0.00</p>
            <button className="withdraw-button" onClick={()=>{request()}}>Request Withdraw</button>
          </div>
        </div>
        <div className="dokan-panel dokan-panel-default">
          <div className="dokan-panel-heading">
            <h3>Payment Details</h3>
          </div>
          <div className="dokan-panel-body">
            <div className='payment'>
              <h4>Last Payment</h4>
            <p>You do not have any approved withdraw yet.</p>
            </div>
            <button className="withdraw-button">View Payments</button>
          </div>
        </div>
        <div className="dokan-panel dokan-panel-default">
          <div className="dokan-panel-heading">
            <h3>Payments Methods</h3>
          </div>
          <div className="dokan-panel-body">
           <div className="methods">
           <LocalAtmTwoToneIcon/>
   
           <p> <span> PayPal </span> ( F***************@g****.com ) </p>
                   </div>
            <button className="withdraw-button">Default</button>
          </div>
        </div>
        </div>
        </div>
       
        </div>
      );
}