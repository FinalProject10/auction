import React from "react";
import "./style/itemSidebar.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaHammer } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { RiAccountPinCircleFill } from "react-icons/ri";
import Link from "next/link";

const ItemSidebar = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <div key={item.id}>
          <div>
            <div className="max-w-sm border border-black-200 rounded-lg p-4 drop-shadow-lg bg-white rounded-b-lg z-15">
              <span className="flex m-4 ">
                <Image
                  className="rounded-full "
                  src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-13-768x486.jpg"
                  alt="product"
                  width={70}
                  height={70}
                />
                <h2 className="font-bold pl-3">{item.seller.name}</h2>
              </span>
              <p>
                <FaLocationDot className="black-icon w-[15px] inline-block mx-2 " />
                Hamburg, Germany
              </p>
              <p className="mb-3">
                <RiAccountPinCircleFill className="black-icon w-[15px] inline-block mx-2" />
                Check more offers from this vendor.
              </p>

              <div className="bid flex justify-center flex-wrap ml-px">
                <button
                  type=""
                  className="w-80 m-px  bg-red-500 text-white text-sm leading-6 font-bold py-2 px-4 rounded-lg hover:bg-red-700"
                >
                  <MdMessage className="black-icon w-[20px] inline-block  mx-1" />
                  Send Message
                </button>

                <button
                  type=""
                  className="w-80 m-px    text-sm leading-6 font-bold py-2 px-4 rounded-lg   text-white  mt-[1%] bg-red-500  h-[43px] float-right hover:text-black hover:bg-white
              hover:border-[2px] hover:border-black 
              hover:h-[47px] hover:transition ease-in-out delay-50 "
                >
                  <FaPhoneAlt className="black-icon h-4 w-4 inline-block mx-1" />

                  <Link href="tel:{item.seller.telNumb}">Call Vendor</Link>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap mt-3">
            <div className="sadContainer rounded-b-lg">
              <div
                className="w-[178px] h-[100px] rounded-t-lg"
                style={{
                  background:
                    'url("https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-6-500x317.jpg")',
                  backgroundSize: "cover",
                }}
              >
                <button
                  type=""
                  className="bidIcon font-bold  object-center   text-white text-sm leading-6  py-2 px-4 rounded-lg hover:bg-red-700 "
                >
                  <FaHammer size={20} className="text-white cursor-pointer" />
                </button>
              </div>

              <h1 className="name font-bold object-center mb-3 ">26 daays</h1>

              <div className="font-semibold	 text-sm/[30px] border border-black-200 rounded-sm p-4 drop-shadow-lg bg-white rounded-b-lg">
                <p>Audi A6 </p>
                <p> 2015 · 97 900 km · 2</p>
                <p>494 cm3 · Hybrid</p>
                <p>Current Bid: € 2.550,00</p>
              </div>
            </div>
            <div className="sadContainer rounded-b-lg">
              <div
                className="w-[178px] h-[100px] rounded-t-lg"
                style={{
                  background:
                    'url("https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-6-500x317.jpg")',
                  backgroundSize: "cover",
                }}
              >
                <button
                  type=""
                  className="bidIcon font-bold  object-center   text-white text-sm leading-6  py-2 px-4 rounded-lg hover:bg-red-700 "
                >
                  <FaHammer size={20} className="text-white cursor-pointer" />
                </button>
              </div>

              <h1 className="name font-bold object-center mb-3">26 daays</h1>

              <div className="font-semibold	 text-sm/[30px] border border-black-200 rounded-sm p-4 drop-shadow-lg bg-white rounded-b-lg">
                <p>Audi A6 </p>
                <p> 2015 · 97 900 km · 2</p>
                <p>494 cm3 · Hybrid</p>
                <p>Current Bid: € 2.550,00</p>
              </div>
            </div>{" "}
            <div className="sadContainer rounded-b-lg">
              <div
                className="w-[178px] h-[100px] rounded-t-lg"
                style={{
                  background:
                    'url("https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-6-500x317.jpg")',
                  backgroundSize: "cover",
                }}
              >
                <button
                  type=""
                  className="bidIcon font-bold  object-center   text-white text-sm leading-6  py-2 px-4 rounded-lg hover:bg-red-700 "
                >
                  <FaHammer size={20} className="text-white cursor-pointer" />
                </button>
              </div>

              <h1 className="name font-bold object-center mb-3 ">26 daays</h1>

              <div className="font-semibold	 text-sm/[30px] border border-black-200 rounded-sm p-4 drop-shadow-lg bg-white rounded-b-lg">
                <p>Audi A6 </p>
                <p> 2015 · 97 900 km · 2</p>
                <p>494 cm3 · Hybrid</p>
                <p>Current Bid: € 2.550,00</p>
              </div>
            </div>{" "}
            <div className="sadContainer rounded-b-lg">
              <div
                className="w-[178px] h-[100px] rounded-t-lg"
                style={{
                  background:
                    'url("https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-6-500x317.jpg")',
                  backgroundSize: "cover",
                }}
              >
                <button
                  type=""
                  className="bidIcon font-bold  object-center   text-white text-sm leading-6  py-2 px-4 rounded-lg hover:bg-red-700 "
                >
                  <FaHammer size={20} className="text-white cursor-pointer" />
                </button>
              </div>

              <h1 className="name font-bold object-center mb-3 ">26 daays</h1>

              <div className="font-semibold	 text-sm/[30px] border border-black-200 rounded-sm p-4 drop-shadow-lg bg-white rounded-b-lg">
                <p>Audi A6 </p>
                <p> 2015 · 97 900 km · 2</p>
                <p>494 cm3 · Hybrid</p>
                <p>Current Bid: € 2.550,00</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default ItemSidebar;
