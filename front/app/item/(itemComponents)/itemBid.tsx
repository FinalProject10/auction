"use client";
import React, { useState, useEffect } from "react";
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
  const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    if (isPopupVisible) {
      const hideTimeout = setTimeout(() => {
        setPopupVisible(false);
        setErrorMessage("");
        setSuccessMessage("");
      }, 10000);

      return () => clearTimeout(hideTimeout);
    }
  }, [isPopupVisible]);
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

    if (
      quant !== lastBidAmount &&
      quant > lastBidAmount &&
      items[0]?.price < quant
    ) {
      console.log(`Bid for ${quant} units in room ${currentItemId}`);
      socket.emit("send_bid", {
        bidAmount: quant,
        itemId: currentItemId,
        ClientId: clientId,
      });

      setErrorMessage("");
      setSuccessMessage("Bid submitted successfully!");
      setPopupVisible(true);
    } else {
      setSuccessMessage("");

      if (quant <= lastBidAmount) {
        setErrorMessage("Bid amount must be greater than the last bid.");
      } else if (quant === lastBidAmount) {
        setErrorMessage("Please enter a different bid amount.");
      } else {
        setErrorMessage("Bid amount exceeds the item's price.");
      }

      setPopupVisible(true);
    }
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
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
              <div className="flex justify-center items-center">
                {successMessage && (
                  <div
                    className={`bg-green-500 border-t-4 border-green-700 rounded-b text-white px-4 py-3 shadow-md ${
                      isPopupVisible
                        ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        : "hidden"
                    }`}
                    role="alert"
                  >
                    <div className="flex">
                      <div className="py-1">
                        <svg
                          className="fill-current h-6 w-6 mr-4 cursor-pointer"
                          onClick={handlePopupClose}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.7 6.7a1 1 0 011.4 0L10 8.6l1.9-1.9a1 1 0 111.4 1.4L11.4 10l1.9 1.9a1 1 0 01-1.4 1.4L10 11.4l-1.9 1.9a1 1 0 01-1.4-1.4L8.6 10 6.7 8.1a1 1 0 010-1.4z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold">Success!</p>
                        <p className="text-sm">
                          Your message has been sent successfully.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <div
                    className={`bg-red-500 border-t-4 border-red-700 rounded-b text-white px-4 py-3 shadow-md ${
                      isPopupVisible
                        ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        : "hidden"
                    }`}
                    role="alert"
                  >
                    <div className="flex">
                      <div className="py-1">
                        <svg
                          className="fill-current h-6 w-6 cursor-pointer"
                          onClick={handlePopupClose}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.7 6.7a1 1 0 011.4 0L10 8.6l1.9-1.9a1 1 0 111.4 1.4L11.4 10l1.9 1.9a1 1 0 01-1.4 1.4L10 11.4l-1.9 1.9a1 1 0 01-1.4-1.4L8.6 10 6.7 8.1a1 1 0 010-1.4z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold">Error!</p>
                        <p className="text-sm">
                          Your message could not be sent. Please try again
                          later.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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
