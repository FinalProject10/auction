import React from 'react';

import './ourproduct.css';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Link from 'next/link';

const OurProducts: React.FC = () => {
  return (<div className="container">
   
    <div className="my-orders-list">
      <div className="list-header">
        <div className="txt">
      < BusinessCenterIcon/>
        <h2 style={{color:'white'}} >Products</h2> 
        </div>
        <div className="add-product-btn">
            <Link  href='/sellerdashboard2/addproduct'>+ add new product</Link>
        </div>
      
      </div>
      <div className="list-item">
        <p>Total</p>
        <p className='p2'>0</p>
      </div>
      <div className="list-item">
        <p>Live</p>
        <p className='p2'>0</p>
      </div>
      <div className="list-item">
        <p>Offline</p>
        <p className='p2'>0</p>
      </div>
      <div className="list-item">
        <p>Pending Review</p>
        <p className='p2'>0</p>
      </div>
      
    </div>
    </div>
  );
};
export default OurProducts