
"use client"
import React from 'react'
import "./cart.css"
// import  NavBar  from '../navbar/NavBar'

const Cart = () => {
  return (

    <div className='body_cart'>
    
      <div className='content_cart'>
<h4 className='page_cart'>Home / Cart</h4>
<h3 className='title_cart'>Cart</h3>


    <div className='step_cart'>
      <div className='first_step'>1</div>
      <div className='cart_space'></div>
      <div className='other_step'>2</div>
      <div className='other_space'></div>
      <div className='other_step'>3</div>
    </div>
<div className='text_step_cart'>
<h5 className='text_step'>MY CART</h5>
<h5 className='text_step'>CHECKOUT</h5>
<h5 className='text_step'>ORDER SUMMARY</h5>
</div>

    <div className="line-container"></div>
<div className='acount_stat'>
  <h5 className='text_cart'>Your cart is currently empty.</h5>
</div>
<button className='button_cart'>Return To Shop</button>
</div>

    </div>
  )
}

export default Cart
