import React from 'react';
import './orders.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const MyOrdersList: React.FC = () => {
  return (
    <div className="my-orders-list">
      <div className="list-header">
      < ShoppingCartIcon/>
        <h2>Orders</h2> 
      
      </div>
      <div className="list-item">Total</div>
      <div className="list-item">Completed</div>
      <div className="list-item">Pending</div>
      <div className="list-item">Processing</div>
      <div className="list-item">Cancelled</div>
      <div className="list-item">Refunded</div>
      <div className="list-item">Onhold</div>
    </div>
  );
};
export default MyOrdersList