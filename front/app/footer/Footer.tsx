import React, { FC } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faInstagram, faYoutube, faTelegram, faPinterest } from '@fortawesome/free-brands-svg-icons';
import "./footer.css";

const Footer: FC = () => {
  return (
    <footer className="footer-section mt-[4%]">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div>
              <Image
                src="https://carauctionnetwork.com/wp-content/uploads/online-car-auctions-600x338.jpg"
                alt="Logo"
                width={200}
                height={200}
              />
            </div>
            <ul>
              <li>Customer support</li>
              <li>+21680663345</li>
              <li>+216 27500500</li>
              <li>no-reply@autobid.com</li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul>
              <li><h5>Latest Cars</h5></li>
              <li>Dacia Sandero</li>
              <li>BMW X6</li>
              <li>Mercedes-Benz GLC</li>
              <li>Audi RS3</li>
              <li>Audi A5</li>
              <li>Mercedes-Benz GLE</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>AutoBid</h5>
            <ul>
              <li>About</li>
              <li> Blog</li>
              <li> Shop</li>
              <li>Wishlist</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Useful Information</h5>
            <p>My account</p>
            <p>Dashboard</p>
            <p>Contact</p>
            <div className="social-icons">
              <FontAwesomeIcon icon={faTwitter as IconDefinition} size="sm" className="icon" />
              <FontAwesomeIcon icon={faInstagram as IconDefinition} size="sm" className="icon" />
              <FontAwesomeIcon icon={faYoutube as IconDefinition} size="sm" className="icon" />
              <FontAwesomeIcon icon={faTelegram as IconDefinition} size="sm" className="icon" />
              <FontAwesomeIcon icon={faPinterest as IconDefinition} size="sm" className="icon" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="ft">
            <h5>@Copyright by ModelTheme. All Rights Reserved.</h5>
            <div className="pic">
<Image alt="" src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-google.svg" width={200} height={200}/>
<Image alt="" src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-appstore.svg"width={200}height={200}/>
</div>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
