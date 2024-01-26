"use client"
import {useState} from "react"
import './formulaire.css'

import { useParams } from 'next/navigation'
import axios from "axios"
import Confirm from "./confirmedit"
import Navbar from "../../home/navbar"
import Header from "../header/page"
import SideBar from '../sidebar/page'
import Footer from "../../footer/Footer"

interface FormulaireProps {
    head:string;
    objectToEdit:{}
    newPass:string;
    confirmpass:string;
}

const Formulaire=(props:FormulaireProps)=>{
    const [firstName,setFirstName]=useState<string>("")
    const [lastName,setLastName]=useState<string>("")
    const [email,setEmail]=useState<string>("")
    const [currentpass,setCurrentpass]=useState<string>("")
    const [newPass,setNewPass]=useState<string>("")
    const [confirmpass,setConfirmpass]=useState<string>("")
    const [open,setOpen]=useState<boolean>(false)
    const [valid,setValid]=useState<boolean>(false)
    const params=useParams()
    const header = props.head
    const objectToEdit=props.objectToEdit
    const compare=()=>{
        if(!(props.confirmpass===props.newPass)){
            setValid(false)
        }
    }
    const update=()=>{
        setOpen(true)
        axios.put(`http://localhost:5000/seller/edit/${params.id}`, objectToEdit).then((result)=>{
            console.log(result.data)
        }).catch((err)=>{
            console.log(err.message)
        })
    }
    return (
        <div>
           {open&&<Confirm update={update} setOpen={setOpen} open={open} /> }
            < Navbar/>
            <Header/>
        <div className="container">
            <div className="sidebar">
            <SideBar h={817} />
            </div>
          
        <div className="form-container">
            <div className="header-container">
                {header}
            </div>
            <div className="names-email">
                <div className="first-last-names">
                    <div className="first-name">
                        <label >
                            First Name
                            <span>*</span>
                        </label>
                        <input onChange={(e)=>{setFirstName(e.target.value)}} type="text"  className='input-style'/>
                    </div>
                    <div className="last-name">
                    <label >
                            Last Name
                            <span>*</span>
                        </label>
                        <input onChange={(e)=>{setLastName(e.target.value)}} type="text"  className='input-style'/>
                    </div>
                </div>
                <div className="email">
                    <label>
                        Email Address
                        <span>*</span>
                    </label>
                    <input onChange={(e)=>{setEmail(e.target.value)}} type="text"  className='input-style email'/>
                </div>
            </div>
            <div className="passwords-btn">
                <div className="header">Password Changes</div>
             <div className="current">
                <label >Current Password (leave blank to leave unchanged)</label>
                <input type="password" onChange={(e)=>{setCurrentpass(e.target.value)}}  className='input-style'/>

             </div>
             <div className="new">
                <label >New Password (leave blank to leave unchanged)</label>
                <input onChange={(e)=>{setNewPass(e.target.value)}} type="password"  className='input-style'/>
             </div>
             <div className="confirm">
                <label >Confirm New Password</label>
                <input  onChange={(e)=>{setConfirmpass(e.target.value);compare()}} type="password"  className='input-style'/>
             </div>
            </div>
            <div className="save-changes">
                <button onClick={()=>{update()}} >Save changes</button>
            </div>
        </div>
        
        </div>
        <Footer/>
        </div>
    )
}
export default Formulaire