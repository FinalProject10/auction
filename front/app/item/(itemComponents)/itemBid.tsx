"use client";
import React, { useState } from "react";
import "./style/itemBid.css";

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
                  <svg width="12" height="4" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <path
                        d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z"
                        id="a"
                      />
                    </defs>
                    <use fill="#FF7E1B" fillRule="nonzero" xlinkHref="#a" />
                  </svg>
                </button>
                <input
                  type="text"
                  value={quant}
                  onChange={handleInputChange}
                  className="priceinput"
                />{" "}
                DT
                {/* <p>{quant}</p> */}
                <button
                  className="plus"
                  onClick={addQuant}
                  /* disabled={resetQuant === 100} */
                >
                  <svg
                    width="12"
                    height="12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <path
                        d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z"
                        id="b"
                      />
                    </defs>
                    <use fill="#FF7E1B" fillRule="nonzero" xlinkHref="#b" />
                  </svg>
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
