import React from "react"
import Navbar from "../../home/navbar"
import Header from "../header/page"
import SideBar from '../sidebar/page'
import Footer from "../../footer/Footer"
import './page.css'

const Formulaire=()=>{
    return (
        <div>
           
            < Navbar/>
            <Header/>
        <div className="container">
            <div className="sidebar">
            <SideBar h={817} />
            </div>
          
        <div className="form-container">
            <div className="header-container">
                Edit Account Details
            </div>
            <div className="names-email">
                <div className="first-last-names">
                    <div className="first-name">
                        <label >
                            First Name
                            <span>*</span>
                        </label>
                        <input type="text"  className='input-style'/>
                    </div>
                    <div className="last-name">
                    <label >
                            Last Name
                            <span>*</span>
                        </label>
                        <input type="text"  className='input-style'/>
                    </div>
                </div>
                <div className="email">
                    <label>
                        Email Address
                        <span>*</span>
                    </label>
                    <input type="text"  className='input-style email'/>
                </div>
            </div>
            <div className="passwords-btn">
                <div className="header">Password Changes</div>
             <div className="current">
                <label >Current Password (leave blank to leave unchanged)</label>
                <input type="text"  className='input-style'/>

             </div>
             <div className="new">
                <label >New Password (leave blank to leave unchanged)</label>
                <input type="text"  className='input-style'/>
             </div>
             <div className="confirm">
                <label >Confirm New Password</label>
                <input type="text"  className='input-style'/>
             </div>
            </div>
            <div className="save-changes">
                <button>Save changes</button>
            </div>
        </div>
        
        </div>
        <Footer/>
        </div>
    )
}
export default Formulaire