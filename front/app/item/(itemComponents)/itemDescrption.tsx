"use client";
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
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

const ItemDescrption = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          Description{" "}
        </AccordionHeader>
        <AccordionBody>
          <p>
            Introducing the 2021 Velocity Vortex GT, a masterpiece in automotive
            engineering, featuring a stunning white exterior and a sleek black
            interior.
          </p>
          \n
          <ul>
            \n
            <li>
              Transmission enthusiasts will be delighted by the 6-speed manual
              gearbox, offering a direct connection to the road. The odometer
              proudly displays just around 900 miles, a testament to the care
              this vehicle has received.
            </li>
            \n
            <li>
              Our recent review by automotive expert Alanis King of Cars &amp;
              Bids, which can be found in the video below, highlights the
              incredible features of the Velocity Vortex GT.
            </li>
            \n
            <li>
              Notable equipment includes state-of-the-art Hotchkiss electronic
              coilovers, Ridetech triple adjustable shocks, high-performance
              Willwood brakes, 19-inch Forgeline wheels, a carbon fiber wing,
              racing seats and harnesses by Racetech, and more, as elaborated
              below.
            </li>
            \n
            <li>
              The Velocity Vortex GT pays homage to the legendary Shelby Daytona
              Coupe, renowned for its 1960s racing successes. This modern
              interpretation seamlessly combines classic aesthetics with
              cutting-edge performance and safety features, making it an
              exceptional choice for enthusiasts looking for a car that&#8217;s
              equally at home on the track and the street.
            </li>
            \n
            <li>
              The heart of this beast is a 5.2-liter V8 engine, purportedly
              delivering a robust 600 horsepower, although a dyno sheet is not
              included to verify this claim. The power is efficiently routed to
              the rear wheels through a responsive 6-speed manual transmission.
            </li>
            \n
          </ul>
          \n
          <p>
            <strong>Engine and Transmission:</strong>
          </p>
          \n
          <ul>
            \n
            <li>
              5.2-Liter V8 Aluminator Ford Racing crate engine
              <br />
              \nBorla 8-stack throttle body kit
            </li>
            \n<li>Factory Five Racing headers and side pipes</li>\n
            <li>Holley Dominator EFI ECU with Coyote TI-VCT control module</li>
            \n<li>Aviaid 4 port dry sump system</li>\n
            <li>Tremec T56 6-Speed manual transmission</li>\n
            <li>KNR transmission cooler</li>\n
            <li>Quick Time bell housing with McLeod RST twin-disc clutch</li>\n
          </ul>
          \n
          <p>
            <strong>Mechanical</strong>:
          </p>
          \n
          <ul>
            \n<li>Fuel Safe 22-gallon fuel cell</li>\n
            <li>Ron Davis 4-core radiator</li>\n
            <li>
              Ultra Pro oil cooler with fan pack on transmission and
              differential
            </li>
            \n<li>Power-assisted rack and pinion steering</li>\n
            <li>KRC power steering cooler</li>\n<li>KRC steering pump</li>\n
          </ul>
          \n
          <p>
            <strong>Electrical:</strong>
          </p>
          \n
          <ul>
            \n<li>Braille ML30C MicroLite carbon lithium battery</li>\n
            <li>Racepak Vantage CL2</li>\n<li>Racepak IQ3 dash</li>\n
            <li>Racepak smart wire power distribution module</li>\n
            <li>Rugged Radio intercoms and headsets with Bluetooth</li>\n
            <li>LeadNav navigation system (track and street)</li>\n
          </ul>
        </AccordionBody>
      </Accordion>
    </>
  );
};

export default ItemDescrption;
