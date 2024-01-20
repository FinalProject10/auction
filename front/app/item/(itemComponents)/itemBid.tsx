"use client";
import React, { useState } from "react";
import "./style/itemBid.css";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import AuctionTimer from "./auctionTimer";
import socket from "./bid/socket";
const ItemBid = ({ items }) => {
  const [quant, setQuant] = useState(
    items[0]?.bids[items[0]?.bids.length - 1]?.bidAmount
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const adjustQuant = (amount) => {
    setQuant((prevQuant) => prevQuant + amount);
  };

  const handleInputChange = (e) => {
    setQuant(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentItemId = items[0].id;
    const clientId = 1;

    const lastBidAmount =
      items[0]?.bids[items[0]?.bids.length - 1]?.bidAmount || 0;

    if (quant > lastBidAmount && items[0]?.price < quant) {
      console.log(`Bid for ${quant} units in room ${currentItemId}`);
      socket.emit("send_bid", {
        bidAmount: quant,
        itemId: currentItemId,
        ClientId: clientId,
      });

      setErrorMessage("");
      setSuccessMessage("Bid submitted successfully!");
    } else {
      setErrorMessage("Bid amount must be greater than the last bid.");
      setSuccessMessage("");
    }
  };
  return (
    <div className="summary">
      {items.map((item) => (
        <div key={item.id}>
          <p className="price">
            <span className="auction-price">
              <span className="current">Starting bid:</span>
              <span className="current currentc ">
                <span className="text-red-500"> {item.price}£</span>
              </span>
            </span>
          </p>
          <div className="auction-time">
            Time left:{" "}
            <AuctionTimer startTime={item.timeStart} endTime={item.timeEnd} />
          </div>
          <div className="auction">
            <p className="auction-end">
              Auction ends:{item.timeEnd} <br />
              Timezone: UTC +2
            </p>

            <div className="bidFlex mb-4">
              <form
                className="countdown_row  h-10 px-6 font-semibold"
                onSubmit={handleSubmit}
              >
                <div className="quantity buttons_added  ">
                  <div className="amount w-12">
                    <button
                      type="button"
                      className="minus"
                      onClick={() => adjustQuant(-5)}
                      disabled={quant === 0}
                    >
                      <FaMinus
                        size={25}
                        className="text-red-700 cursor-pointer"
                      />
                    </button>
                    <input
                      type="text"
                      value={quant}
                      onChange={handleInputChange}
                      className="priceinput"
                    />{" "}
                    {/* <p>{quant}</p> */}
                    <button
                      type="button"
                      className="plus"
                      onClick={() => adjustQuant(5)}
                      /* disabled={resetQuant === 100} */
                    >
                      <FaPlus
                        size={25}
                        className="text-red-700 cursor-pointer"
                      />
                    </button>
                  </div>
                </div>
                <div className="bid ml-24">
                  <button
                    type="submit"
                    className="bg-red-500 text-white text-sm leading-6 font-bold py-2 px-4 rounded-lg hover:bg-red-700"
                  >
                    Bid
                  </button>
                </div>
              </form>
              {successMessage && (
                <div className="text-green-500 mt-2 ml-24">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="text-red-500 mt-2 ml-24">{errorMessage}</div>
              )}
            </div>
          </div>

          <div className="product_meta mb-4 ml-3">
            <p className="">Category:{item.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemBid;
