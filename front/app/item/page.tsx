import React from "react";
import ItemHeader from "./(itemComponents)/itemHader.tsx";
import ItemBid from "./(itemComponents)/itemBid.tsx";
import ItemInfo from "./(itemComponents)/itemInfo.tsx";
import Gallery from "./(itemComponents)/itemGalory.tsx";
import ItemDescrption from "./(itemComponents)/itemDescrption.tsx";
import ItemSidebar from "./(itemComponents)/itemSidebar.tsx";
import "./(itemComponents)/style/page.css";
const Item = () => {
  return (
    <>
      <ItemHeader />
      <div className="mx-[5%]">
        <div className="galoryBid">
          <div>
            <Gallery />
            <div className="iteminfo galoryBid">
              <div className="w-10/12">
                <ItemInfo />
                <ItemDescrption />
              </div>
            </div>
          </div>
          <div>
            <ItemBid />
            <ItemSidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
