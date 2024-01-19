"use client";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./style/itemInfo.css";
library.add(fas);
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import AuctionHistory from "./AuctionHistory";
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
const ItemInfo = ({ items }) => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      {" "}
      {items.map((item) => (
        <div key={item.id}>
          <br />
          <br />
          <Accordion open={open === 0} icon={<Icon id={1} open={open} />}>
            <AccordionHeader onClick={() => handleOpen(1)}>
              Additional Information{" "}
            </AccordionHeader>
            <AccordionBody>
              <div className=" ">
                {/* <h1 className="text-2xl font-bold mb-4">Additional Information</h1> */}

                <div className="itemInfo gap-10">
                  <table className="table-auto  w-full ">
                    <tbody className=" ">
                      {/* <div className="border-bottom "> */}
                      <tr className="border-bottom ">
                        <th>
                          <p>
                            <FontAwesomeIcon
                              icon="fas fa-truck-pickup"
                              className="h-6 w-6 red-icon  float-start mx-1 "
                            />
                            <p className="text-lg font-semibold mb-2">Body</p>
                          </p>
                        </th>
                        <td>{item.body} </td>
                      </tr>{" "}
                      {/* </div> */}
                      {/* <div className="border-bottom "> */}
                      {/* </div> */}
                      <tr className="border-bottom">
                        <th>
                          {" "}
                          <p>
                            <FontAwesomeIcon
                              icon="fas fa-thermometer-quarter"
                              className="red-icon h-6 w-6 float-start mx-1"
                            />
                            <p className="text-lg font-semibold mb-2">
                              Climatisation
                            </p>
                          </p>
                        </th>
                        <td>
                          <p>{item.climatisation}</p>
                        </td>
                      </tr>
                      <tr className="border-bottom">
                        <th>
                          {" "}
                          <p>
                            <FontAwesomeIcon
                              icon="fas fa-gas-pump"
                              className="red-icon h-6 w-6 float-start mx-1"
                            />
                            <p className="text-lg font-semibold mb-2">
                              Mileage
                            </p>
                          </p>
                        </th>
                        <td>
                          <p>{item.mileage}</p>
                        </td>
                      </tr>
                      <tr className="border-bottom">
                        <th>
                          {" "}
                          <p>
                            <FontAwesomeIcon
                              icon="fas fa-door-closed"
                              className="red-icon h-6 w-6 float-start mx-1"
                            />
                            <p className="text-lg font-semibold mb-2">
                              Door Count
                            </p>
                          </p>
                        </th>
                        <td>{item.doorCount}</td>
                      </tr>
                      <tr className="border-bottom">
                        <th>
                          <p>
                            <FontAwesomeIcon
                              icon="as fa-recycle"
                              className="red-icon h-6 w-6 float-start mx-1"
                            />
                            <p className="text-lg font-semibold mb-2">
                              Emission Class
                            </p>
                          </p>
                        </th>
                        <td>{item.emissionClass}</td>
                      </tr>
                      <tr>
                        <th>
                          <p>
                            <FontAwesomeIcon
                              icon="fas fa-parking"
                              className="red-icon h-6 w-6 float-start mx-1"
                            />
                            <p className="text-lg font-semibold mb-2">
                              Parking Sensors
                            </p>
                          </p>
                        </th>
                        <td>{item.parkingSensors}</td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="table-auto w-full ">
                    <tbody>
                      <tr className="border-bottom ">
                        <th>
                          <p>
                            <FontAwesomeIcon
                              icon="fas fa-user-shield"
                              className="red-icon h-6 w-6 float-start mx-1"
                            />
                            <p className="text-lg font-semibold mb-2">
                              Airbags
                            </p>
                          </p>{" "}
                        </th>
                        <td>{item.airbags}</td>
                      </tr>
                      <tr className="border-bottom ">
                        <th>
                          <p>
                            <FontAwesomeIcon
                              icon="fas fa-palette"
                              className="red-icon h-6 w-6 float-start mx-1"
                            />
                            <p className="text-lg font-semibold mb-2">Color</p>
                          </p>
                        </th>
                        <td>{item.color}</td>
                      </tr>
                      <tr className="border-bottom">
                        <th>
                          <p>
                            <FontAwesomeIcon
                              icon="fas fa-tachometer-alt"
                              className="red-icon h-6 w-6 float-start mx-1"
                            />
                            <p className="text-lg font-semibold mb-2">
                              Cubic Capacity
                            </p>
                          </p>
                        </th>
                        <td>{item.cubicCapacity}</td>
                      </tr>
                      <tr className="border-bottom">
                        <th>
                          <p>
                            <FontAwesomeIcon
                              icon="fas fa-stop-circle"
                              className="red-icon h-6 w-6 float-start mx-1"
                            />
                            <p className="text-lg font-semibold mb-2">
                              Gearbox
                            </p>
                          </p>
                        </th>
                        <td>{item.gearBox}</td>
                      </tr>
                      <tr className="border-bottom ">
                        <th className="  ">
                          <p>
                            <FontAwesomeIcon
                              icon="fas fa-door-closed"
                              className="red-icon h-6 w-6 float-start mx-1"
                            />
                            <p className="text-lg font-semibold mb-2">
                              {" "}
                              Number Of Seats
                            </p>
                          </p>
                        </th>
                        <td className="  ">{item.numberOfSeats}</td>
                      </tr>
                      <tr>
                        <th>
                          <p>
                            <FontAwesomeIcon
                              icon="fas fa-car-battery"
                              className="red-icon h-6 w-6 float-start mx-1"
                            />
                            <p className="text-lg font-semibold mb-2">Power</p>
                          </p>
                        </th>
                        <td>{item.power}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </AccordionBody>
          </Accordion>
          <hr />
          <hr />
          <hr />
          <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
            <AccordionHeader onClick={() => handleOpen(2)}>
              Auction History{" "}
            </AccordionHeader>
            <AccordionBody>
              <AuctionHistory
                items={item.bids}
                timeStart={item.timeStart}
                price={item.price}
                timeEnd={item.timeEnd}
              />
            </AccordionBody>
          </Accordion>
          <hr />
          <hr />{" "}
        </div>
      ))}
    </>
  );
};

export default ItemInfo;
