"use client";
import "../(itemComponents)/style/page.css";
import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import dynamic from "next/dynamic";
const Gallery = dynamic(() => import("../(itemComponents)/itemGalory"));
const ItemHeader = dynamic(() => import("../(itemComponents)/itemHader"));
const ItemBid = dynamic(() => import("../(itemComponents)/itemBid"));
const ItemInfo = dynamic(() => import("../(itemComponents)/itemInfo"));
const ItemDescrption = dynamic(
  () => import("../(itemComponents)/itemDescrption")
);
const ItemSidebar = dynamic(() => import("../(itemComponents)/itemSidebar"));
const Navbar = dynamic(() => import("../../home/navbar"));
import Footer from "../../footer/Footer";
import axios from "axios";
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
