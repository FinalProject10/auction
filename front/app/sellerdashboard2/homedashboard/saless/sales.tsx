import React from 'react';
import './sales.css';

interface SalesListItemProps {
  name: string;
  price: string;
}

const SalesListItem: React.FC<SalesListItemProps> = ({ name, price }) => (
  <div className="sales-list-item">
    <div className="name">{name}</div>
    <div className="price">{price}</div>
  </div>
);

const SalesList: React.FC = () => {
  return (
    <div className="sales-list">
      <SalesListItem name="Net sales" price="$50.00" />
      <SalesListItem name="earning" price="$30.00" />
      <SalesListItem name="PageReview" price="$20.00" />
      <SalesListItem name="Order" price="$20.00" />

    </div>
  );
};

export default SalesList;