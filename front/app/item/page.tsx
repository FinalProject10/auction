import React from "react";
import ItemHeader from "./(itemComponents)/itemHader.tsx";
import ItemBid from "./(itemComponents)/itemBid.tsx";
import ItemInfo from "./(itemComponents)/itemInfo.tsx";

const Item = () => {
  return (
    <>
      <div>
        <ItemHeader />
      </div>
      <div>
        <ItemBid />
      </div>
      <div> </div>
      <ItemInfo />
    </>
  );
};

export default Item;
