import Link from 'next/link';
import Navbar from '../../home/navbar';
import SideBar from '../sidebar/page'
import Footer from '../../footer/Footer';

import './noproducts.css'

const NoProductsFound = () => {
  return (
    <>
    
    <div className="container">
        <SideBar h={800}/>
    <div className="no-products-container">
      <img
        src="https://autobid.modeltheme.com/wp-content/plugins/dokan-lite/assets/images/no-product-found.svg"
        alt="No Products Found"
      />
      <h2>No Products Found!</h2>
      <p>Ready to start selling something awesome?</p>
      <Link href='addproduct/product/add'>
      <button className="add-product-button">+ Add New Product</button>
      </Link>
    </div>
    </div>
   
    </>
  );
};

export default NoProductsFound;