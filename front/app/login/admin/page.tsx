import React from 'react'
import axios from 'axios'
const Admin = () => {

  return (
    <div>
        <img className='absolute right-0 h-full w-1/2' src="https://static01.nyt.com/images/2023/09/21/multimedia/21sp-cli-stadium-02-mljv/21sp-cli-stadium-02-mljv-articleLarge.jpg?quality=75&auto=webp&disable=upscale" alt="" />
        <div className='absolute right-0 h-full w-1/2 bg-black opacity-70'></div>
        <div className='absolute z-10 right-0 top-1/2 text-white'>
            <h1>Welcome to Drivee</h1>
        </div>
        <div></div>
        <input type="email"
        placeholder='Email'
        /><br/>
        <input type="password"
        placeholder='Password'
        />
    </div>
  )
}

export default Admin