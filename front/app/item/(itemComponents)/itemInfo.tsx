import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./style/itemInfo.css";

library.add(fas);
const ItemInfo = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Additional Information</h1>
      <div className=" ">
        <div className="itemInfo ">
          <table className="table-auto  w-full">
            <tbody className=" ">
              {/* <div className="border-bottom "> */}
              <tr className="border-bottom ">
                <td>
                  <p>
                    <FontAwesomeIcon
                      icon="fas fa-truck-pickup"
                      className="red-icon w-[20px] float-start mx-1 "
                    />
                    <p className="text-lg font-semibold mb-2">Body</p>
                  </p>
                </td>
                <td>Malcolm </td>
              </tr>{" "}
              {/* </div> */}
              {/* <div className="border-bottom "> */}
              {/* </div> */}
              <tr className="border-bottom">
                <td>
                  {" "}
                  <p>
                    <FontAwesomeIcon
                      icon="fas fa-thermometer-quarter"
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">Mileage</p>
                  </p>
                </td>
                <td>
                  <span>Earth Wind</span>
                </td>
              </tr>
              <tr className="border-bottom">
                <td>
                  {" "}
                  <p>
                    <FontAwesomeIcon
                      icon="fas fa-gas-pump"
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">Mileage</p>
                  </p>
                </td>
                <td>
                  <span>Earth Wind</span>
                </td>
              </tr>
              <tr className="border-bottom">
                <td>
                  {" "}
                  <span>
                    <FontAwesomeIcon
                      icon="fas fa-door-closed"
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">Door Count</p>
                  </span>
                </td>
                <td>Earth Wind</td>
              </tr>
              <tr className="border-bottom">
                <td>
                  <span>
                    <FontAwesomeIcon
                      icon="as fa-recycle"
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">Emission Class</p>
                  </span>
                </td>
                <td>Earth Wind</td>
              </tr>
              <tr>
                <td>
                  <span>
                    <FontAwesomeIcon
                      icon="fas fa-parking"
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">
                      Parking Sensors
                    </p>
                  </span>
                </td>
                <td>Frontal, Rearview Camera, Side Mirrors</td>
              </tr>
            </tbody>
          </table>

          <table className="table-auto w-full ">
            <tbody>
              <tr className="border-bottom ">
                <td className="">
                  <span>
                    <FontAwesomeIcon
                      icon="fas fa-user-shield"
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">Airbags</p>
                  </span>{" "}
                </td>
                <td>Malcolm</td>
              </tr>
              <tr className="border-bottom ">
                <td>
                  <span>
                    <FontAwesomeIcon
                      icon="fas fa-palette"
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">Color</p>
                  </span>
                </td>
                <td>The Eagles</td>
              </tr>
              <tr className="border-bottom">
                <td>
                  <span>
                    <FontAwesomeIcon
                      icon="fas fa-tachometer-alt"
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">Cubic Capacity</p>
                  </span>
                </td>
                <td>Earth, Wind</td>
              </tr>
              <tr className="border-bottom">
                <td>
                  <span>
                    <FontAwesomeIcon
                      icon="fas fa-stop-circle"
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">Gearbox</p>
                  </span>
                </td>
                <td>Earth, Wind</td>
              </tr>
              <tr className="border-bottom ">
                <td className="  ">
                  <span>
                    <FontAwesomeIcon
                      icon="fas fa-door-closed"
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">
                      {" "}
                      Number Of Seats
                    </p>
                  </span>
                </td>
                <td className="  ">5</td>
              </tr>
              <tr>
                <td>
                  <span>
                    <FontAwesomeIcon
                      icon="fas fa-car-battery"
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">Power</p>
                  </span>
                </td>
                <td>175</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br />
    </>
  );
};

export default ItemInfo;
