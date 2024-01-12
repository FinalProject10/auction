import React from "react";
import ItemHeader from "./(itemComponents)/itemHader.tsx";
import ItemBid from "./(itemComponents)/itemBid.tsx";
import ItemInfo from "./(itemComponents)/itemInfo.tsx";
import Gallery from "./(itemComponents)/itemGalory.tsx";
import ItemDescrption from "./(itemComponents)/ItemDescrption.tsx";
import "./(itemComponents)/style/page.css";
const Item = () => {
  return (
    <>
      <div>
        <ItemHeader />
      </div>
      <div className="galoryBid">
        <Gallery />
        <ItemBid />
      </div>
      <div></div>

      <div className="iteminfo">
        <ItemInfo />
      </div>
      <ItemDescrption />
      <p></p>
    </>
  );
};

export default Item;
