// "use client"
// import React from 'react'
// import { useEffect } from 'react'
// import axios from 'axios'
// import { useRouter } from 'next/navigation'
// import Nav from './navbar'
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import Auctions from './auctions'
// import Aboutus from './aboutus'
// import StartNow from './startNow'
// import Offers from './offers'
// import Style from './style'
// import Services from './services'
// import Footer from '../footer/Footer'
// const Home = () => {
//   const currencies = [
//     {
//       value: 'USD',
//       label: '$',
//     },
//     {
//       value: 'EUR',
//       label: '€',
//     },
//     {
//       value: 'BTC',
//       label: '฿',
//     },
//     {
//       value: 'JPY',
//       label: '¥',
//     },
//   ];
//     // useEffect(()=>{
//     //     const role=localStorage.getItem('role')
//     //     const token=localStorage.getItem('user')
//     //     if(role==='client'){
//     //     axios.get(`http://localhost:5000/client/home`,{headers:{Authorization:`Bearer ${token}`}})
//     //     .then(r=>console.log('r')).catch(err=>router.push('/register/client'))}
//     //     else if(role==='seller'){
//     //     axios.get(`http://localhost:5000/seller/home`,{headers:{Authorization:`Bearer ${token}`}})
//     //     .then(r=>console.log("r")).catch(err=>router.push('/register/seller'))
//     //     }
//     //     else if(role==='admin'){
//     //       axios.get(`http://localhost:5000/admin/home`,{headers:{Authorization:`Bearer ${token}`}})
//     //       .then(r=>console.log("r")).catch(err=>router.push('/register/seller'))
//     //       }
//     // },[])
//   return (
//     <div>
//       <Nav/>
//       <div style={{ 
//   height: '720px', 
//   width: '100%', 
//   backgroundImage: 'url(https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)', 
//   backgroundSize: 'cover' }}>

        
//         </div>
//         {/* <div className='w-[90%] flex ml-[5%] h-[31%] shadow-xl bg-white absolute top-[100%] rounded-[20px] items-center justify-center'>
//             <div className='ml-[10px] mt-[10px]'>
//             <h1>Car Maker</h1>
//             <Box
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
     
     
//         <TextField
//           id="filled-select-currency"
//           select
//           label="Car Marker"
//           defaultValue="Car Marker"
//           helperText="Please select a category"
//           variant="filled"
//         >
//           {currencies.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </TextField>
        
      
      
//     </Box>
//             </div>
//             <div className='ml-[10px] mt-[10px]'>
//             <h1>Car Model</h1>
//             <Box
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
     
     
//         <TextField
//           id="filled-select-currency"
//           select
//           label="Car Model"
//           defaultValue="Car Model"
//           helperText="Please select a category"
//           variant="filled"
//         >
//           {currencies.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </TextField>
        
      
      
//     </Box>
//             </div>
//             <div className='ml-[10px] mt-[10px] '>
//             <h1>Mileage from, to (km)</h1>
//            <div className='flex'>
//             <Box
            
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 1, width: '100px' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
     
     
//         <TextField
//         className='w-[10%]'
//           id="filled-select-currency"
//           select
//           label="Car Marker"
//           defaultValue="Car Marker"
//           helperText="Please select a category"
//           variant="filled"
//         >
//           {currencies.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </TextField>
        
      
      
//     </Box>
//     <Box
            
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 1, width: '100px' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
     
     
//         <TextField
//         className='w-[10%]'
//           id="filled-select-currency"
//           select
//           label="Car Marker"
//           defaultValue="Car Marker"
//           helperText="Please select a category"
//           variant="filled"
//         >
//           {currencies.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </TextField>
        
      
      
//     </Box></div>
//             </div>
//             <div className='ml-[10px] mt-[10px] '>
//             <h1>Power from, to (HP)</h1>
//            <div className='flex'>
//             <Box
            
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 1, width: '100px' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
     
     
//         <TextField
//         className='w-[10%]'
//           id="filled-select-currency"
//           select
//           label="Car Marker"
//           defaultValue="Car Marker"
//           helperText="Please select a category"
//           variant="filled"
//         >
//           {currencies.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </TextField>
        
      
      
//     </Box>
//     <Box
            
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 1, width: '100px' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
     
     
//         <TextField
//         className='w-[10%]'
//           id="filled-select-currency"
//           select
//           label="Car Marker"
//           defaultValue="Car Marker"
//           helperText="Please select a category"
//           variant="filled"
//         >
//           {currencies.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </TextField>
        
      
      
//     </Box>
//     </div>
//             </div>
//             <button className='absolute text-white font-[800] mt-[1%] bg-[#ff2800] rounded w-[132px] h-[43px] float-right hover:text-black hover:bg-white hover:border-[2px] hover:border-black hover:w-[136px] hover:h-[47px] hover:transition ease-in-out delay-50 '>Search</button>
//         </div> */}
// <Auctions/>
// <Aboutus/>
// <StartNow/>
// <Offers/>
// <Style/>
// <Services/>
// <Footer/>
//     </div>
//   )
// }

// export default Home