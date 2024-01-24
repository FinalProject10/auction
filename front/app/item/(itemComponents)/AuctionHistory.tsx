"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

function AuctionHistory({ items, timeStart, timeEnd, price }) {
  const [data, setData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(10);
  console.log(data);

  const fetchData = async () => {
    try {
      const requests = items
        .slice(0, visibleItems)
        .map((item) =>
          axios.get(`http://localhost:5000/Seller/profile/${item.ClientId}`)
        );

      const responses = await Promise.all(requests);
      const responseData = responses.map((response) => response.data);
      setData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [items, visibleItems]);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 10);
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <th>Auction started</th>
            <td>{formatDateTime(timeStart)}</td>
            <td>{price} £</td>
          </tr>
          {data.map((item, index) => (
            <tr key={index}>
              <th>
                {item?.name} {item?.lastName}
              </th>
              <td>{formatDateTime(items[index]?.updatedAt)}</td>
              <td>{items[index]?.bidAmount}$</td>
            </tr>
          ))}
          <tr>
            <th>Auction End</th>
            <td>{formatDateTime(timeEnd)}</td>
            <td>
              {new Date(timeEnd) > new Date()
                ? "still not finished"
                : items.length > 0
                ? items[items.length - 1].bidAmount
                : "No bids yet"}
            </td>
          </tr>
        </tbody>
      </table>
      {items.length > visibleItems && (
        <button onClick={loadMore}>Load More</button>
      )}
    </>
  );
}

export default AuctionHistory;
