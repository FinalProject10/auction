import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './selectCategory.css'
import '../withdraw/request.css'
import { Dispatch } from 'react';
interface RequestProps {
    addCategory:Dispatch<React.SetStateAction<boolean>>;
    setCategory:Dispatch<React.SetStateAction<string>>;
}
export default function Popup(props:RequestProps){
    const setRequest = props.addCategory
    return(
        <div className="overlay">
        <Box className="centered-box">
          {/* Header */}
          <AppBar position="static" sx={{ backgroundColor: 'red' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px',
              }}
            >
              {/* Left side */}
              <Typography sx={{ color: 'white' }}>Select A category</Typography>
  
              {/* Right side */}
              <IconButton color="inherit" edge="end">
                <CloseIcon sx={{ color: 'white' }} onClick={()=>{setRequest(false)}} />
              </IconButton>
            </Box>
          </AppBar>
  
          {/* Container */}
          <Box sx={{ borderBottom: '2px solid red' }}>
            {/* Body */}
            <Box  className='dok'>
           
          <div className="dokan-panel-default">
            <div className="dokan-panel-heading">
             
            </div>
            <div className="dokan-panel-body">
              <select onChange={(e)=>{props.setCategory(e.target.value)}} className="category-select" >
                
                <option value="Category 1">SUV</option>
                <option value="Category 2">Coupe</option>
                <option value="Category 3">Hatchback</option>
              </select>
              
            </div>
         
    </div>
             
            </Box>
          </Box>
        </Box>
      </div>
    )
}