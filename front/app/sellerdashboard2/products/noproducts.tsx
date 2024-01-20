import React from 'react';
import SideBar from '../sidebar/page'
import './noproducts.css'

const NoProductsFound = () => {
  return (
    <div className="container">
        <SideBar/>
    <div className="no-products-container">
      <img
        src="https://autobid.modeltheme.com/wp-content/plugins/dokan-lite/assets/images/no-product-found.svg"
        alt="No Products Found"
      />
      <h2>No Products Found!</h2>
      <p>Ready to start selling something awesome?</p>
      <button className="add-product-button">+ Add New Product</button>
    </div>
    </div>
  );
};

export default NoProductsFound;