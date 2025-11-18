"use client";
const Loading = dynamic(() => import("./loading"));
import "../(itemComponents)/style/page.css";
import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import dynamic from "next/dynamic";
const Gallery = dynamic(() => import("../(itemComponents)/itemGallery"));
const ItemHeader = dynamic(() => import("../(itemComponents)/itemHader"));
const ItemBid = dynamic(() => import("../(itemComponents)/itemBid"));
const ItemInfo = dynamic(() => import("../(itemComponents)/itemInfo"));
const ItemDescrption = dynamic(
  () => import("../(itemComponents)/itemDescrption")
);
const ItemSidebar = dynamic(() => import("../(itemComponents)/itemSidebar"));
import axios from "axios";
import { API_URL } from "../../../utils/api";

const Item = ({ params }) => {
  console.log(params);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/items/fetch-items/${params.id}`
        );
        setItems(response.data as Item[]);
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
      {/* <Loading loading={loading} /> */}
      {loading ? (
        <>
          {/* <Player
            autoplay
            speed={1.5}
            loop
            src="https://lottie.host/9bdf25ba-5ca3-44fb-a1b9-18cf62a6ec79/YuknZDDgpg.json"
            style={{ height: "300px", width: "300px" }}
          ></Player> */}
          <Loading loading={loading} />
        </>
      ) : (
        <>
          <div className="min-h-screen bg-gray-50">
            <ItemHeader items={items} />
            <div className="max-w-[1400px] mx-auto px-6">
              <div className="galoryBid">
                <div className="flex flex-col">
                  <Gallery items={items} />
                  <div className="iteminfo">
                    <ItemInfo items={items} />
                    <ItemDescrption items={items} />
                  </div>
                </div>

                <div className="flex flex-col gap-6 sticky top-6 h-fit">
                  <ItemBid items={items} />
                  <ItemSidebar items={items} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Item;
