import React from "react";
import "./style/itemSidebar.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ItemSidebar = () => {
  return (
    <>
      <div>
        <div className="max-w-sm border border-black-200 rounded-lg p-4 drop-shadow-lg bg-white rounded-b-lg">
          <span className="flex m-5 ">
            <Image
              className="rounded-lg pr-4"
              src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-13-768x486.jpg"
              alt="product"
              width={60}
              height={60}
            />
            <h2>Leasing Automobile</h2>
          </span>
          <p>
            <FontAwesomeIcon
              icon="fas fa-map-marker-alt"
              className="black-icon w-[10px] inline-block mx-2 "
            />{" "}
            Hamburg, Germany
          </p>
          <p>
            <FontAwesomeIcon
              icon="fas fa-user-alt"
              className="black-icon w-[10px] inline-block mx-2 "
            />
            Check more offers from this vendor.
          </p>

          <div className="bid flex justify-center flex-wrap ml-px">
            <button
              type=""
              className="w-80 m-px  bg-red-500 text-white text-sm leading-6 font-bold py-2 px-4 rounded-lg hover:bg-red-700"
            >
              {" "}
              <FontAwesomeIcon
                icon="ffa fa-envelope"
                className="black-icon w-[10px] inline-block  mx-1"
              />
              Send Message
            </button>

            <button
              type=""
              className="m-px w-80 bg-red-500 text-white text-sm leading-6 font-bold py-2 px-4 rounded-lg hover:bg-red-700"
            >
              <FontAwesomeIcon
                icon="fa fa-phone"
                className="black-icon w-[10px] inline-block mx-1"
              />
              Call Vendor
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="sadContainer rounded-b-lg">
          <h1 className="name font-bold z-10 absolute object-center ">
            26 daays
          </h1>
          <button
            type=""
            className="bidIcon font-bold z-10 absolute object-center   text-white text-sm leading-6 font-bold py-2 px-4 rounded-lg hover:bg-red-700"
          >
            <FontAwesomeIcon
              icon="fa fa-gavel"
              className="black-icon w-[15px] inline-block mx-1"
            />
          </button>
          <Image
            className="box-border h-25 w-25 rounded-t-lg"
            src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-13-768x486.jpg"
            alt="product"
            width={300}
            height={100}
          />
          <div className="border border-black-200 rounded-sm p-4 drop-shadow-lg bg-white rounded-b-lg">
            <p>Audi A6 </p>
            <p> 2015 · 97 900 km · 2</p>
            <p>494 cm3 · Hybrid</p>
            <p>Current Bid: € 2.550,00</p>
          </div>
        </div>
        <div className="sadContainer ">
          <h1 className="name font-bold z-10 absolute object-center ">
            26 daays
          </h1>
          <Image
            className="box-border h-25 w-25 rounded-t-lg"
            src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-13-768x486.jpg"
            alt="product"
            width={300}
            height={100}
          />
          <div className="border border-black-200 rounded-sm p-4 drop-shadow-lg bg-white rounded-b-lg">
            <p>Audi A6 </p>
            <p> 2015 · 97 900 km · 2</p>
            <p>494 cm3 · Hybrid</p>
            <p>Current Bid: € 2.550,00</p>
          </div>
        </div>
        <div className="sadContainer">
          <h1 className="name font-bold z-10 absolute object-center ">
            26 daays
          </h1>
          <Image
            className="box-border h-25 w-25 rounded-t-lg"
            src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-13-768x486.jpg"
            alt="product"
            width={300}
            height={100}
          />
          <div className="border border-black-200 rounded-sm p-4 drop-shadow-lg bg-white rounded-b-lg">
            <p>Audi A6 </p>
            <p> 2015 · 97 900 km · 2</p>
            <p>494 cm3 · Hybrid</p>
            <p>Current Bid: € 2.550,00</p>
          </div>
        </div>
        <div className="sadContainer">
          <h1 className="name font-bold z-10 absolute object-center ">
            26 daays
          </h1>
          <Image
            className="box-border h-25 w-25 rounded-t-lg"
            src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-13-768x486.jpg"
            alt="product"
            width={300}
            height={100}
          />
          <div className="border border-black-200 rounded-sm p-4 drop-shadow-lg bg-white rounded-b-lg">
            <p>Audi A6 </p>
            <p> 2015 · 97 900 km · 2</p>
            <p>494 cm3 · Hybrid</p>
            <p>Current Bid: € 2.550,00</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemSidebar;
