"use client";
import { FaHammer } from "react-icons/fa";
import Footer from "../footer/Footer";
import React, { useEffect, useState } from "react";
import { TbLayoutGrid } from "react-icons/tb";
import { FaRegListAlt } from "react-icons/fa";
import { Select, Option } from "@material-tailwind/react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import LoadingLink from "../components/LoadingLink";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { API_URL } from "../../utils/api";

const Products = () => {
  const [flex, setFlex] = useState(true);
  const [open, setOpen] = useState(-1);
  const [data, setData] = useState([]);
  const [click, setClick] = useState(false);
  const [allData, setAllData] = useState([]);
  const [allData1, setAllData1] = useState([]);
  const [bmw, setBmw] = useState(0);
  const [dacia, setdacia] = useState(0);
  const [lamborghini, setlamborghini] = useState(0);
  const [mazda, setmazda] = useState(0);
  const [mercedes, setmercedes] = useState(0);
  const [Mitsubishi, setMitsubishi] = useState(0);
  const [seat, setseat] = useState(0);
  const [tesla, settesla] = useState(0);
  const [toyota, settoyota] = useState(0);
  const [Volkswagen, setvolkswagen] = useState(0);
  const [audi, setAudi] = useState(0);
  const [ford, setFord] = useState(0);
  const [color, setColor] = useState(false);
  const [bg, setBg] = useState(false);
  const [index, setIndex] = useState(1);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(0);
  const [new1, setNew1] = useState(3);
  const [pages, setPages] = useState(-1);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${API_URL}/items/get`)
      .then((r) => {
        setAllData(r.data);
        setAllData1(r.data);
        setr(r.data);
        setPages(Math.floor((r.data.length - 1) / 8) + 1);
      })
      .catch((err) => console.log(err));
  }, []);

  const setr = (arr: any) => {
    let audiCount = 0,
      fordCount = 0,
      bmwCount = 0,
      mercedesCount = 0,
      daciaCount = 0,
      lamborghiniCount = 0,
      mazdaCount = 0,
      MitsubishiCount = 0,
      seatCount = 0,
      teslaCount = 0,
      toyotaCount = 0,
      VolkswagenCount = 0;

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].name.includes("Audi")) audiCount++;
      if (arr[i].name.includes("Ford")) fordCount++;
      if (arr[i].name.includes("Mercedes")) mercedesCount++;
      if (arr[i].name.includes("BMW")) bmwCount++;
      if (arr[i].name.includes("Dacia")) daciaCount++;
      if (arr[i].name.includes("Lamborghini")) lamborghiniCount++;
      if (arr[i].name.includes("Mazda")) mazdaCount++;
      if (arr[i].name.includes("Mitsubishi")) MitsubishiCount++;
      if (arr[i].name.includes("Seat")) seatCount++;
      if (arr[i].name.includes("Toyota")) toyotaCount++;
      if (arr[i].name.includes("Tesla")) teslaCount++;
      if (arr[i].name.includes("Volkswagen")) VolkswagenCount++;
    }

    setAudi(audiCount);
    setFord(fordCount);
    setBmw(bmwCount);
    setMitsubishi(MitsubishiCount);
    setdacia(daciaCount);
    settesla(teslaCount);
    settoyota(toyotaCount);
    setmazda(mazdaCount);
    setvolkswagen(VolkswagenCount);
    setseat(seatCount);
    setlamborghini(lamborghiniCount);
    setmercedes(mercedesCount);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/items/fetch-items/?page=${page}`
        );

        if (localStorage.getItem("category")) {
          const category = localStorage.getItem("category");
          let dat = response.data.filter((el: any) => {
            return el.category === category;
          });
          setData(dat);
          localStorage.removeItem("category");
          return;
        } else if (localStorage.getItem("Climatisation")) {
          const climatisation = localStorage.getItem("Climatisation");
          let dat = response.data.filter((el: any) => {
            return el.climatisation === climatisation;
          });
          setData(dat);
          localStorage.removeItem("Climatisation");
        }
        if (localStorage.getItem("Color")) {
          const Color = localStorage.getItem("Color");
          let dat = response.data.filter((el: any) => {
            return el.color === Color;
          });
          setData(dat);
          localStorage.removeItem("Color");
        } else if (localStorage.getItem("Capacity")) {
          const Capacity = localStorage.getItem("Capacity");
          let dat = response.data.filter((el: any) => {
            return el.capacity === Capacity;
          });
          setData(dat);
          localStorage.removeItem("Capacity");
        } else if (localStorage.getItem("Gearbox")) {
          const Gearbox = localStorage.getItem("Gearbox");
          let dat = response.data.filter((el: any) => {
            return el.gearbox === Gearbox;
          });
          setData(dat);
          localStorage.removeItem("Gearbox");
        } else if (localStorage.getItem("body")) {
          const body = localStorage.getItem("body");
          const dit = response.data.filter((el: any) => {
            return el.body === body;
          });
          setData(dit);
          localStorage.removeItem("body");
        } else {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [page, click]);

  const handleLoadMore = (value: any) => {
    router.push("#flex");
    setPage(value);
  };

  const filter = (value: any) => {
    router.push("#flex");
    if (!value) {
      return;
    }

    const filtered = allData.filter((el) => {
      return el.name.includes(value);
    });
    setData(filtered);
  };

  const filter2 = (property: any, value: any) => {
    router.push("#flex");
    const filtered = allData1.filter((el) => {
      if (!isNaN(property)) return el[property].includes(value);
      return el[property] === value;
    });
    setData(filtered);
  };

  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

  const carBrands = [
    { name: "Audi", count: audi },
    { name: "BMW", count: bmw },
    { name: "Dacia", count: dacia },
    { name: "Ford", count: ford },
    { name: "Lamborghini", count: lamborghini },
    { name: "Mazda", count: mazda },
    { name: "Mercedes-Benz", count: mercedes },
    { name: "Mitsubishi", count: Mitsubishi },
    { name: "Seat", count: seat },
    { name: "Tesla", count: tesla },
    { name: "Toyota", count: toyota },
    { name: "Volkswagen", count: Volkswagen },
  ];

  const calculateTimeLeft = (timeEnd: string) => {
    const now = new Date().getTime();
    const end = new Date(timeEnd).getTime();
    const diff = end - now;
    if (diff <= 0) return "Ended";
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}D`;
    return `${hours}H`;
  };

  const isAuctionEnded = (timeEnd: string) => {
    return new Date(timeEnd).getTime() <= new Date().getTime();
  };

  return (
    <>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-[300px] h-auto bg-white rounded-2xl shadow-lg p-6 sticky top-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Filters</h1>

            {/* Car Models */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Car Models
              </h2>
              <div className="space-y-2">
                {carBrands.map((brand) => (
                  <div
                    key={brand.name}
                    onClick={() => filter(brand.name)}
                    className="flex justify-between items-center py-2 px-3 rounded-lg cursor-pointer hover:bg-gray-50 hover:text-red-500 transition-all duration-200 group"
                  >
                    <span className="text-gray-700 group-hover:text-red-500 font-medium">
                      {brand.name}
                    </span>
                    <span className="text-gray-500 text-sm group-hover:text-red-500">
                      ({brand.count})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            {/* Filter Accordions */}
            <div className="space-y-2">
              <Accordion placeholder={""} open={open === 1}>
                <AccordionHeader
                  placeholder={""}
                  onClick={() => handleOpen(1)}
                  className="text-gray-800 font-semibold border-b-0"
                >
                  Product Airbags
                </AccordionHeader>
                <AccordionBody>
                  <div className="space-y-2 pt-2">
                    {["Curtain", "Frontal", "Knee", "Side-Impact"].map(
                      (type) => (
                        <div
                          key={type}
                          onClick={() => filter2("airbags", type)}
                          className="w-full py-2 px-4 text-center border border-gray-200 rounded-lg cursor-pointer hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                        >
                          {type}
                        </div>
                      )
                    )}
                  </div>
                </AccordionBody>
              </Accordion>

              <Accordion placeholder={""} open={open === 2}>
                <AccordionHeader
                  placeholder={""}
                  onClick={() => handleOpen(2)}
                  className="text-gray-800 font-semibold border-b-0"
                >
                  Product Climatisation
                </AccordionHeader>
                <AccordionBody>
                  <div className="space-y-2 pt-2">
                    {[
                      "Automatic Climate Control",
                      "Dual-Zone Climate Control",
                      "Manual Climate Control",
                      "Multi-Zone Climate Control",
                    ].map((type) => (
                      <div
                        key={type}
                        onClick={() => filter2("climatisation", type)}
                        className="w-full py-2 px-4 text-center border border-gray-200 rounded-lg cursor-pointer hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200 text-sm"
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </AccordionBody>
              </Accordion>

              <Accordion placeholder={""} open={open === 3}>
                <AccordionHeader
                  placeholder={""}
                  onClick={() => handleOpen(3)}
                  className="text-gray-800 font-semibold border-b-0"
                >
                  Product Body
                </AccordionHeader>
                <AccordionBody>
                  <div className="space-y-2 pt-2">
                    {[
                      "Convertible",
                      "Coupe",
                      "Crossover",
                      "Hatchback",
                      "Sedan",
                      "SUV",
                    ].map((type) => (
                      <div
                        key={type}
                        onClick={() => filter2("body", type)}
                        className="w-full py-2 px-4 text-center border border-gray-200 rounded-lg cursor-pointer hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </AccordionBody>
              </Accordion>

              <Accordion placeholder={""} open={open === 4}>
                <AccordionHeader
                  placeholder={""}
                  onClick={() => handleOpen(4)}
                  className="text-gray-800 font-semibold border-b-0"
                >
                  Product Color
                </AccordionHeader>
                <AccordionBody>
                  <div className="space-y-2 pt-2">
                    {[
                      "Yellow",
                      "White",
                      "Tan",
                      "Silver",
                      "Red",
                      "Green",
                      "Gray",
                      "Blue",
                      "Black",
                    ].map((color) => (
                      <div
                        key={color}
                        onClick={() => filter2("color", color)}
                        className="w-full py-2 px-4 text-center border border-gray-200 rounded-lg cursor-pointer hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                      >
                        {color}
                      </div>
                    ))}
                  </div>
                </AccordionBody>
              </Accordion>

              <Accordion placeholder={""} open={open === 5}>
                <AccordionHeader
                  placeholder={""}
                  onClick={() => handleOpen(5)}
                  className="text-gray-800 font-semibold border-b-0"
                >
                  Product Cubic Capacity
                </AccordionHeader>
                <AccordionBody>
                  <div className="space-y-2 pt-2">
                    {[
                      "1.0L",
                      "1.5L",
                      "2.0L",
                      "2.5L",
                      "3.0L",
                      "3.5L",
                      "4.0L",
                      "4.5L",
                      "Electric",
                    ].map((capacity) => (
                      <div
                        key={capacity}
                        onClick={() => filter2("cubicCapacity", capacity)}
                        className="w-full py-2 px-4 text-center border border-gray-200 rounded-lg cursor-pointer hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                      >
                        {capacity}
                      </div>
                    ))}
                  </div>
                </AccordionBody>
              </Accordion>

              <Accordion placeholder={""} open={open === 6}>
                <AccordionHeader
                  placeholder={""}
                  onClick={() => handleOpen(6)}
                  className="text-gray-800 font-semibold border-b-0"
                >
                  Product Door Count
                </AccordionHeader>
                <AccordionBody>
                  <div className="space-y-2 pt-2">
                    {["2", "3", "4", "5", "6"].map((count) => (
                      <div
                        key={count}
                        onClick={() => filter2("doorCount", count)}
                        className="w-full py-2 px-4 text-center border border-gray-200 rounded-lg cursor-pointer hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                      >
                        {count}-Door
                      </div>
                    ))}
                  </div>
                </AccordionBody>
              </Accordion>

              <Accordion placeholder={""} open={open === 8}>
                <AccordionHeader
                  placeholder={""}
                  onClick={() => handleOpen(8)}
                  className="text-gray-800 font-semibold border-b-0"
                >
                  Product Fuel
                </AccordionHeader>
                <AccordionBody>
                  <div className="space-y-2 pt-2">
                    {["Diesel", "Gasoline"].map((fuel) => (
                      <div
                        key={fuel}
                        onClick={() => filter2("fuel", fuel)}
                        className="w-full py-2 px-4 text-center border border-gray-200 rounded-lg cursor-pointer hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                      >
                        {fuel}
                      </div>
                    ))}
                  </div>
                </AccordionBody>
              </Accordion>

              <Accordion placeholder={""} open={open === 9}>
                <AccordionHeader
                  placeholder={""}
                  onClick={() => handleOpen(9)}
                  className="text-gray-800 font-semibold border-b-0"
                >
                  Product Gearbox
                </AccordionHeader>
                <AccordionBody>
                  <div className="space-y-2 pt-2">
                    {["Automatic", "Manual"].map((gearbox) => (
                      <div
                        key={gearbox}
                        onClick={() => filter2("gearBox", gearbox)}
                        className="w-full py-2 px-4 text-center border border-gray-200 rounded-lg cursor-pointer hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                      >
                        {gearbox}
                      </div>
                    ))}
                  </div>
                </AccordionBody>
              </Accordion>
            </div>

            {/* Promotional Image */}
            <div className="mt-8 rounded-xl overflow-hidden">
              <Image
                className="cursor-pointer w-full h-auto"
                width={250}
                height={250}
                alt="AutoBid Safety"
                src="/images/sidebar/autobid-sidebar_pic-922x1024.jpg"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* View Toggle */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setFlex(true)}
                  className={`p-2 rounded transition-all duration-200 ${
                    flex
                      ? "bg-red-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <TbLayoutGrid size={20} />
                </button>
                <button
                  onClick={() => setFlex(false)}
                  className={`p-2 rounded transition-all duration-200 ${
                    !flex
                      ? "bg-red-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <FaRegListAlt size={20} />
                </button>
              </div>
            </div>

            {data.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No Products Found
              </div>
            )}

            {/* Grid View */}
            {flex ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((el: any, i: number) => {
                  const timeLeft = calculateTimeLeft(el.timeEnd);
                  const ended = isAuctionEnded(el.timeEnd);
                  return (
                    <LoadingLink key={i} href={`/item/${el.id}`}>
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
                        <div
                          className="relative w-full h-48 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${el?.images[0]})`,
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                            <div
                              className={`px-3 py-1 rounded-lg backdrop-blur-sm ${
                                ended
                                  ? "bg-gray-600/80 text-white"
                                  : "bg-red-500/90 text-white"
                              }`}
                            >
                              <span className="text-sm font-bold">
                                {timeLeft}
                              </span>
                            </div>
                            <div className="w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center group-hover:bg-red-500 transition-all duration-200">
                              <FaHammer
                                size={20}
                                className="text-gray-800 group-hover:text-white transition-colors"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-500 transition-colors line-clamp-1">
                            {el.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {el.short_description}
                          </p>
                          <div
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              ended
                                ? "bg-gray-100 text-gray-600"
                                : "bg-red-50 text-red-600"
                            }`}
                          >
                            {ended ? "Auction Ended" : "Active Auction"}
                          </div>
                        </div>
                      </div>
                    </LoadingLink>
                  );
                })}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {data.map((el: any, i: number) => {
                  const timeLeft = calculateTimeLeft(el.timeEnd);
                  const ended = isAuctionEnded(el.timeEnd);
                  return (
                    <LoadingLink key={i} href={`/item/${el.id}`}>
                      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
                        <div className="flex flex-col sm:flex-row">
                          <div
                            className="w-full sm:w-64 h-48 sm:h-auto bg-cover bg-center relative"
                            style={{
                              backgroundImage: `url(${el?.images[0]})`,
                            }}
                          >
                            <div className="absolute top-3 left-3">
                              <div
                                className={`px-3 py-1 rounded-lg backdrop-blur-sm ${
                                  ended
                                    ? "bg-gray-600/80 text-white"
                                    : "bg-red-500/90 text-white"
                                }`}
                              >
                                <span className="text-sm font-bold">
                                  {timeLeft}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 p-6 flex flex-col justify-between">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-red-500 transition-colors">
                                {el.name}
                              </h3>
                              <p className="text-gray-600 text-sm mb-4">
                                {el.short_description}
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div
                                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                  ended
                                    ? "bg-gray-100 text-gray-600"
                                    : "bg-red-50 text-red-600"
                                }`}
                              >
                                {ended ? "Auction Ended" : "Active Auction"}
                              </div>
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-red-500 transition-all duration-200">
                                <FaHammer
                                  size={20}
                                  className="text-gray-600 group-hover:text-white transition-colors"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </LoadingLink>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {pages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 mb-8">
                {index > 1 && (
                  <button
                    onClick={() => {
                      if (index > 2 && new1 > 3) setNew1(index - 1);
                      setIndex(index - 1);
                      handleLoadMore(index - 1);
                    }}
                    className="w-12 h-12 bg-white rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-200 shadow-md"
                  >
                    ←
                  </button>
                )}

                <button
                  onClick={() => {
                    setIndex(1);
                    handleLoadMore(1);
                  }}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 shadow-md ${
                    index === 1
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  1
                </button>

                {pages >= 2 && (
                  <button
                    onClick={() => {
                      setIndex(2);
                      handleLoadMore(2);
                    }}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 shadow-md ${
                      index === 2
                        ? "bg-red-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    2
                  </button>
                )}

                {pages > 2 && (
                  <>
                    {index > 2 && (
                      <span className="px-2 text-gray-500">...</span>
                    )}
                    {index > 2 && index < pages && (
                      <button
                        onClick={() => {
                          setIndex(new1);
                          handleLoadMore(new1);
                        }}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 shadow-md ${
                          index === new1
                            ? "bg-red-500 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {new1}
                      </button>
                    )}
                  </>
                )}

                {index < pages && (
                  <button
                    onClick={() => {
                      setIndex(index + 1);
                      if (index === 2) setNew1(new1 + 1);
                      handleLoadMore(index + 1);
                    }}
                    className="w-12 h-12 bg-white rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-200 shadow-md"
                  >
                    →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
