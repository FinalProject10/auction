import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './request.css'
import './page.css'
import { Dispatch } from 'react';
interface RequestProps {
    request:Dispatch<React.SetStateAction<boolean>>;
}
export default function Request(props:RequestProps){
    const setRequest = props.request
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
              <Typography sx={{ color: 'white' }}>Header Text</Typography>
  
              {/* Right side */}
              <IconButton color="inherit" edge="end">
                <CloseIcon sx={{ color: 'white' }} onClick={()=>{setRequest(false)}} />
              </IconButton>
            </Box>
          </AppBar>
  
          {/* Container */}
          <Box sx={{ borderBottom: '2px solid red' }}>
            {/* Body */}
            <Box>
              {/* First div */}
              <div>
              <div className="dokan-panel dokan-panel-default">
          <div className="dokan-panel-heading">
            <h3>Balance</h3>
          </div>
          <div className="dokan-panel-body">
            <p>Your Balance: $0.00</p>
            <button className="withdraw-button" >Request Withdraw</button>
          </div>
        </div>
              </div>
  
              {/* Second div */}
              <div>
              <div>
              <div className="dokan-panel dokan-panel-default">
          <div className="dokan-panel-heading">
            <h3>Balance</h3>
          </div>
          <div className="dokan-panel-body">
            <p>Your Balance: $0.00</p>
            <button className="withdraw-button" >Request Withdraw</button>
          </div>
        </div>
              </div>
              </div>
            </Box>
          </Box>
        </Box>
      </div>
    )
}