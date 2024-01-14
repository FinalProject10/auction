import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./style/itemInfo.css";

library.add(fas);
const ItemInfo = () => {
  return (
    <>
      <div className=" ">
        <h1 className="text-2xl font-bold mb-4">Additional Information</h1>

        <div className="itemInfo gap-10">
          <table className="table-auto  w-full ">
            <tbody className=" ">
              {/* <div className="border-bottom "> */}
              <tr className="border-bottom ">
                <th>
                  <p>
                    <FontAwesomeIcon
                      icon="fas fa-truck-pickup"
                      className="red-icon w-[20px] float-start mx-1 "
                    />
                    <p className="text-lg font-semibold mb-2">Body</p>
                  </p>
                </th>
                <td>Malcolm </td>
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
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">Mileage</p>
                  </p>
                </th>
                <td>
                  <p>Earth Wind</p>
                </td>
              </tr>
              <tr className="border-bottom">
                <th>
                  {" "}
                  <p>
                    <FontAwesomeIcon
                      icon="fas fa-gas-pump"
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">Mileage</p>
                  </p>
                </th>
                <td>
                  <p>Earth Wind</p>
                </td>
              </tr>
              <tr className="border-bottom">
                <th>
                  {" "}
                  <p>
                    <FontAwesomeIcon
                      icon="fas fa-door-closed"
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">Door Count</p>
                  </p>
                </th>
                <td>Earth Wind</td>
              </tr>
              <tr className="border-bottom">
                <th>
                  <p>
                    <FontAwesomeIcon
                      icon="as fa-recycle"
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">Emission Class</p>
                  </p>
                </th>
                <td>Earth Wind</td>
              </tr>
              <tr>
                <th>
                  <p>
                    <FontAwesomeIcon
                      icon="fas fa-parking"
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">
                      Parking Sensors
                    </p>
                  </p>
                </th>
                <td>Frontal, Rearview Camera, Side Mirrors</td>
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
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">Airbags</p>
                  </p>{" "}
                </th>
                <td>Malcolm</td>
              </tr>
              <tr className="border-bottom ">
                <th>
                  <p>
                    <FontAwesomeIcon
                      icon="fas fa-palette"
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">Color</p>
                  </p>
                </th>
                <td>The Eagles</td>
              </tr>
              <tr className="border-bottom">
                <th>
                  <p>
                    <FontAwesomeIcon
                      icon="fas fa-tachometer-alt"
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">Cubic Capacity</p>
                  </p>
                </th>
                <td>Earth, Wind</td>
              </tr>
              <tr className="border-bottom">
                <th>
                  <p>
                    <FontAwesomeIcon
                      icon="fas fa-stop-circle"
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">Gearbox</p>
                  </p>
                </th>
                <td>Earth, Wind</td>
              </tr>
              <tr className="border-bottom ">
                <th className="  ">
                  <p>
                    <FontAwesomeIcon
                      icon="fas fa-door-closed"
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">
                      {" "}
                      Number Of Seats
                    </p>
                  </p>
                </th>
                <td className="  ">5</td>
              </tr>
              <tr>
                <th>
                  <p>
                    <FontAwesomeIcon
                      icon="fas fa-car-battery"
                      className="red-icon w-[20px] float-start mx-1"
                    />
                    <p className="text-lg font-semibold mb-2">Power</p>
                  </p>
                </th>
                <td>175</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <br />

      <br />
      <table>
        <thead>
          <tr>
            <th>Auction History</th>
            <td></td>
            <td> </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Auction started</th>
            <td>--</td>
            <td> £</td>
          </tr>
          <tr>
            <th>salmen khelifi </th>
            <td>November 17, 2023 12:07 pm </td>
            <td>2.500,00 £</td>
          </tr>
          <tr>
            <th>Sejay Miles </th>
            <td>December 4, 2023 12:00 am</td>
            <td> 2.550,00 £</td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
      <hr />
      <hr />
      <hr />
      <br />
    </>
  );
};

export default ItemInfo;
