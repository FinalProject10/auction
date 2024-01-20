import React from 'react';
import './ourproduct.css';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

const Products: React.FC = () => {
  return (
    <div className="my-orders-list">
      <div className="list-header">
        <div className="txt">
      < BusinessCenterIcon/>
        <h2>Products</h2> 
        </div>
        <div className="add-product-btn">
            <p>+ add new product</p>
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
  );
};
export default Products