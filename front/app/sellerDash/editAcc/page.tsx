"use client"
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { getApiUrl } from '../../../utils/api'
const Edit = () => {
    const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [newPass, setNewpass] = useState("");
  const id=localStorage.getItem('userId')
    const add = () => {
        axios
          .put(getApiUrl(`seller/edit/${id}`), {
            name: fname,
            lastName: lname,
            email,
            newPass: newPass,
          })
          .then((r) => console.log(r))
          .catch((err) => console.log(err));
      };
  return (
    <div>
            <div className="flex gap-[5%] mb-[5%]">
              <div>
                <h1>First Name*</h1>
                <input
                  onChange={(e: any) => setFname(e.target.value)}
                  type="text"
                  className="w-[431px] p-4 h-[52px] border-[1px] border-gray-300 rounded"
                />
              </div>
              <div>
                <h1>Last Name*</h1>
                <input
                  onChange={(e: any) => setLname(e.target.value)}
                  type="text"
                  className="w-[431px] p-4 h-[52px] border-[1px] border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="mb-[3%]">
              <h1>Email Adress</h1>
              <input
                onChange={(e: any) => setEmail(e.target.value)}
                type="text"
                className="w-[925px] p-4 h-[52px] border-[1px] border-gray-300 rounded"
              />
            </div>
            <div>
              <h1 className="font-[600] text-[25px] text-gray-700 mb-[5%]">
                Password Change
              </h1>
              <div>
                <h1>Current Password</h1>
                <input
                  type="password"
                  className="mb-[3%] w-[925px] p-4 h-[52px] border-[1px] border-gray-300 rounded"
                />
              </div>
              <div>
                <h1>New Password</h1>
                <input
                  onChange={(e: any) => setNewpass(e.target.value)}
                  type="password"
                  className="mb-[3%] w-[925px] p-4 h-[52px] border-[1px] border-gray-300 rounded"
                />
              </div>
              <div>
                <h1>Confirm New Password</h1>
                <input
                  type="password"
                  className="mb-[3%] w-[925px] p-4 h-[52px] border-[1px] border-gray-300 rounded"
                />
              </div>
              <button
                onClick={() => add()}
                className="text-white mr-[10%] font-[800] mt-[1%] bg-[#ff2800] rounded w-[132px] h-[43px] float-right hover:text-black hover:bg-white hover:border-[2px] hover:border-black hover:transition ease-in-out delay-50"
              >
                Save
              </button>
            </div>
          </div>
  )
}

export default Edit