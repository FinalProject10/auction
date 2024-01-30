import React from 'react';
import './orders.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const MyOrdersList: React.FC = () => {
  return (
    <div className="my-orders-list">
      <div className="list-header">
        <div className="text-icon">
      < ShoppingCartIcon className='shop-icon'/>
        <h2>Orders</h2> 
        </div>
      </div>
      <div className="list-item">Total <span>(0)</span></div>
      <div className="list-item">Completed <span>(0)</span></div>
      <div className="list-item">Pending <span>(0)</span></div>
      <div className="list-item">Processing <span>(0)</span></div>
      <div className="list-item">Cancelled <span>(0)</span></div>
      <div className="list-item">Refunded <span>(0)</span></div>
      <div className="list-item">Onhold <span>(0)</span></div>
    </div>
  );
};
export default MyOrdersList