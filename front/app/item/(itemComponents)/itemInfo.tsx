import "./style/itemInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);
const ItemInfo = () => {
  return (
    <>
      <div className="float-start ">
        <div className="itemInfo ">
          <table className="table-auto mx-8 border-spacing-x-6 border-separate ">
            <tbody>
              <tr className="border-bottom ">
                <td>
                  <span>
                    <FontAwesomeIcon
                      icon="fas fa-truck-pickup"
                      className="red-icon w-[20px]"
                    />
                    <span>Body</span>
                  </span>
                </td>
                <td>Malcolm </td>
              </tr>
              <tr className="border-bottom ">
                <td>Climatisation</td>
                <td>The Eagles</td>
              </tr>
              <tr className="border-bottom">
                <td>Cubic Capacityr</td>
                <td>Earth Wind</td>
              </tr>
              <tr className="border-bottom">
                <td>Emission Class</td>
                <td>Earth Wind</td>
              </tr>
              <tr className="border-bottom">
                <td>Mileage</td>
                <td>Earth Wind</td>
              </tr>
              <tr>
                <td>Parking Sensors</td>
                <td>Earth Wind</td>
              </tr>
            </tbody>
          </table>

          <table className="table-auto mx-8 border-spacing-x-6 border-separate ">
            <tbody>
              <tr className="border-bottom">
                <td className="">Airbags </td>
                <td>Malcolm</td>
              </tr>
              <tr className="border-bottom">
                <td>Color</td>
                <td>The Eagles</td>
              </tr>
              <tr className="border-bottom">
                <td>Door Count</td>
                <td>Earth, Wind</td>
              </tr>
              <tr className="border-bottom">
                <td>Gearbox</td>
                <td>Earth, Wind</td>
              </tr>
              <tr className="border-bottom ">
                <td className="  ">Number Of Seats</td>
                <td className="  ">5</td>
              </tr>
              <tr>
                <td>Power</td>
                <td>175</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ItemInfo;
