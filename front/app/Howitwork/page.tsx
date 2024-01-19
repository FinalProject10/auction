"use client"
import React, { FC, useCallback } from 'react'

const page = () => {  const onHeaderContainer1Click = useCallback(() => {
}, []);

  return (
  <div className="abou">
<div style="position: relative;">
  <img src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/Autobid-about.jpg?id=7148" width="3000" alt="" className="cov" />
  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 20px; font-weight: bold;">
    WHO WE ARE
  </div>
</div>

      <div className="our-story-paren">
        <div className="our-stor">Our Mission in Company</div>
        <div className="launced-in-2015-exclusive-is-paren">
          <div className="launced-in-201">{`Welcome to AutoBid, where passion meets possibility in every bid. Explore a world of curated auctions, where treasures await discovery and bidding is an art form. Unleash the thrill of winning as you navigate through our diverse marketplace of unique items. Join us on the journey where auctions become more than transactions – they become stories. `}</div>
          <div className="exclusive-has-mor">
          Uncover rare finds, embrace the excitement of competitive bidding, and redefine your shopping experience. We curate a marketplace where enthusiasts, collectors, and seekers of extraordinary come together. Explore, engage, and embark on a journey of exclusive auctions that redefine the way you acquire and appreciate the extraordinary.

    <p><img src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/Autobid-24.png" width={80} height={80} alt="24"  />Years on the Market</p>
<p>
Our platform is a dynamic fusion of curated collections, spirited bidding, and unbeatable excitement.</p>
    </div>
    </div>
        </div>
      </div>
  )
}

export default page