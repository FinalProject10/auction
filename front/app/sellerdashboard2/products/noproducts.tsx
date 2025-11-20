import Link from 'next/link';

import SideBar from '../sidebar/page'

import './noproducts.css'

const NoProductsFound = () => {
  return (
    <div className="container">
        <SideBar h={800}/>
    <div className="no-products-container">
      <img
        src="/images/empty/no-product-found.svg"
        alt="No Products Found"
      />
      <h2>No Products Found!</h2>
      <p>Ready to start selling something awesome?</p>
      <Link href='addproduct'>
      <button className="add-product-button">+ Add New Product</button>
      </Link>
    </div>
    </div>
  );
};

export default NoProductsFound;