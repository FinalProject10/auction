"use client";

import React, { useEffect, useState } from "react";
import ItemHeader from "./(itemComponents)/itemHader.tsx";
import ItemBid from "./(itemComponents)/itemBid.tsx";
import ItemInfo from "./(itemComponents)/itemInfo.tsx";
import Gallery from "./(itemComponents)/itemGalory.tsx";
import ItemDescrption from "./(itemComponents)/itemDescrption.tsx";
import ItemSidebar from "./(itemComponents)/itemSidebar.tsx";
import "./(itemComponents)/style/page.css";
import Navbar from "../home/navbar.tsx";
import Footer from "../footer/Footer.tsx";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const Item = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/items/fetch-items/1"
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      {items.length === 0 && (
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
      <ItemHeader items={items} />
      <div className="mx-[5%]">
        <div className="galoryBid">
          <div>
            <Gallery />
            <div className="iteminfo galoryBid">
              <div className="w-11/12">
                <ItemInfo />
                <ItemDescrption items={items} />
              </div>
            </div>
          </div>

          <div>
            <ItemBid items={items} />
            <ItemSidebar items={items} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Item;
