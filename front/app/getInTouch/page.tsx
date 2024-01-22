import './page.css'
export default function GetInTouch(){
    return (<div className="container">
    <div className="vc_row wpb_row vc_row-fluid bg-contact vc_custom_1601885870901 vc_row-has-fill" >
    <div className="wpb_column vc_column_container vc_col-sm-12">
      <div className="vc_column-inner">
        <div className="wpb_wrapper">
          <div className="vc_empty_space" >
            <span className="vc_empty_space_inner"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="the-form">
    <div className="formulaire">
        <div className="header">
            <h1>Send Us a message</h1>
        </div>
        <div className="input-groups">
      <div className="first">
        
          <div className="name">
            <label className="label">Full Name</label>
            <input
              type="text"
              placeholder="Your Full Name"
              className="professional-input"
            />
          </div>
          <div className="email">
            <label className="label">Email Address</label>
            <input
              type="text"
              placeholder="Your Email Address"
              className="professional-input"
            />
          </div>
        
      </div>

      <div className="second">
        <div className="phone">
          <label className="label">Phone Number</label>
          <input
            type="text"
            placeholder="Your phone number..."
            className="professional-input"
          />
        </div>
        <div className="subject">
          <label className="label">Subject</label>
          <input
            type="text"
            placeholder="The message subject..."
            className="professional-input"
          />
        </div>
      </div>

      <div className="third">
        <label className="label">Message</label>
        <input
          type="text"
          placeholder="Type here..."
          className="full-width-input"
        />
      </div>
    </div>
        </div>
    </div>
    <div className="contact-infos">
    <div className="section">
        <h3>Email Address</h3>
        <p>office@autobid.modeltheme.com<br />sales@autobid.modeltheme.com</p>
      </div>
      <div className="section">
        <h3>Headquarters</h3>
        <p>211 Ullamcorper St Roseville, New<br />York, United States, 26483</p>
      </div>
      <div className="section">
        <h3>Phone Number</h3>
        <p>Headquarters: +20 000 000 000<br />Sales: +20 000 000 000</p>
      </div>
      <div className="section">
        <h3>Working Hours</h3>
        <p>Monday – Friday: 8AM to 8PM<br />Friday – Sunday: Closed</p>
      </div>
    </div>
  </div>
 )
}