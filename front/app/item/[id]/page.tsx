"use client";

import React, { useEffect, useState } from "react";
import ItemHeader from "../(itemComponents)/itemHader.tsx";
import ItemBid from "../(itemComponents)/itemBid.tsx";
import ItemInfo from "../(itemComponents)/itemInfo.tsx";
import Gallery from "../(itemComponents)/itemGalory.tsx";
import ItemDescrption from "../(itemComponents)/itemDescrption.tsx";
import ItemSidebar from "../(itemComponents)/itemSidebar.tsx";
import "../(itemComponents)/style/page.css";
import Navbar from "../../home/navbar.tsx";
import Footer from "../../footer/Footer.tsx";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";

const Item = ({ params }) => {
  const [items, setItems] = useState<Item | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ` http://localhost:5000/items/fetch-items/${params.id}`
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Navbar />
      {loading ? (
        <>
          {" "}
          <Player
            autoplay
            speed={1.5}
            loop
            src="https://lottie.host/9bdf25ba-5ca3-44fb-a1b9-18cf62a6ec79/YuknZDDgpg.json"
            style={{ height: "300px", width: "300px" }}
          ></Player>
        </>
      ) : (
        <>
          <div>
            <ItemHeader items={items} />
            <div className="mx-[5%]">
              <div className="galoryBid">
                <div>
                  <Gallery items={items} />
                  <div className="iteminfo galoryBid">
                    <div className="w-11/12">
                      <ItemInfo items={items} />
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
          </div>
        </>
      )}

      <Footer />
    </>
  );
};
export default Item;
