"use client"
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const Home = () => {
    const router=useRouter()
    useEffect(()=>{
        const role=localStorage.getItem('role')
        const token=localStorage.getItem('user')
        if(role==='client'){
        axios.get(`http://localhost:5000/client/home`,{headers:{Authorization:`Bearer ${token}`}})
        .then(r=>console.log('r')).catch(err=>router.push('/register/client'))}
        else if(role==='seller'){
        axios.get(`http://localhost:5000/seller/home`,{headers:{Authorization:`Bearer ${token}`}})
        .then(r=>console.log("r")).catch(err=>router.push('/register/seller'))
        }
        else if(role==='admin'){
          axios.get(`http://localhost:5000/admin/home`,{headers:{Authorization:`Bearer ${token}`}})
          .then(r=>console.log("r")).catch(err=>router.push('/register/seller'))
          }
    },[])
  return (
    <div>Home</div>
  )
}

export default Home