"use client";
import React, { useState } from "react";
import "./style/itemBid.css";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const ItemBid = () => {
  const [quant, setQuant] = useState(5000);

  const addQuant = () => {
    setQuant(quant + 5);
  };

  const removeQuant = () => {
    if (quant > 0) {
      setQuant(quant - 1);
    }
  };

  const handleInputChange = (e) => {
    setQuant(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Bid for ${quant} units`);
  };

  return (
    <div className="summary">
      <p className="price">
        <span className="auction-price">
          <span className="current">Starting bid:</span>
          <span className="current currentc">2.500,00£</span>
        </span>
      </p>
      <div className="auction">
        <div className="auction-time  ">
          Time left:
          <div className="main-auction auction-time-countdown hasCountdown">
            <span className="countdown_row curren">
              <span className="countdown_section">
                <span className="countdown_amount">11</span>
                <br />
                Months
              </span>
              <span className="countdown_section">
                <span className="countdown_amount">0</span>
                <br />
                Weeks
              </span>
              <span className="countdown_section">
                <span className="countdown_amount">0</span>
                <br />
                Days
              </span>
              <span className="countdown_section">
                <span className="countdown_amount">6</span>
                <br />
                Hours
              </span>
              <span className="countdown_section">
                <span className="countdown_amount">33</span>
                <br />
                Minutes
              </span>
              <span className="countdown_section">
                <span className="countdown_amount">29</span>
                <br />
                Seconds
              </span>
            </span>
          </div>
        </div>
        <p className="auction-end">
          Auction ends: December 12, 2024 12:00 am <br />
          Timezone: UTC 0
        </p>
        <div className="bidFlex mb-4">
          <form
            className="countdown_row  h-10 px-6 font-semibold"
            onSubmit={handleSubmit}
          >
            <div className="quantity buttons_added  ">
              <div className="amount w-12">
                <button
                  className="minus"
                  onClick={removeQuant}
                  disabled={quant === 0}
                >
                  <FaMinus size={25} className="text-red-700 cursor-pointer" />
                </button>
                <input
                  type="text"
                  value={quant}
                  onChange={handleInputChange}
                  className="priceinput"
                />{" "}
                {/* <p>{quant}</p> */}
                <button
                  className="plus"
                  onClick={addQuant}
                  /* disabled={resetQuant === 100} */
                >
                  <FaPlus size={25} className="text-red-700 cursor-pointer" />
                </button>
              </div>
            </div>
          </form>
          <div className="bid ml-24">
            <button
              type="submit"
              className="bg-red-500 text-white text-sm leading-6 font-bold py-2 px-4 rounded-lg hover:bg-red-700"
            >
              Bid
            </button>
          </div>
        </div>
      </div>
      <div className="product_meta mb-4 ml-3">
        <p className="sku_wrapper">
          SKU: <span className="sku">ab-08</span>
        </p>
        <p className="">Category: Cars</p>
        <p className="">Tags: cars driving road</p>
      </div>
    </div>
  );
};

export default ItemBid;
