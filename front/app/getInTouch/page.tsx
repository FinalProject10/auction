import './page.css'
import '../contactus/contact.css'
import Navbar from '../home/navbar'
export default function GetInTouch(){
    return (<div className='w-full'>
      <Navbar/>
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
  <div className="box-container rounded-lg shadow-lg -md p-6">
                <div className=" form-section rounded-lg shadow-lg -md p-6">
                <div className="send-msg-text">
                    <h1>Send Your Message</h1>
                    </div>
                <form >
                   
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              
             
              className="border border-gray-300 border-opacity-30 p-2
              w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-red-500"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-red-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              
              
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-red-500"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
             
              
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-red-500"
              required
            />
          </div>
          <div>
            <label htmlFor="telephone" className="block mb-1">
              Telephone
            </label>
            <input
              type="text"
              id="telephone"
              name="telephone"
              placeholder="Telephone"
             
              
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-red-500"
              required
            />
          </div>
          <div>
            <label htmlFor="telephone" className="block mb-1">
              Subject
            </label>
            <input
              type="text"
              id="Subject"
              name="Subject"
              placeholder="Subject"
             
              
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-red-500"
              required
            />
          </div>
         
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-2">Your message</h2>
            <div>
              <label htmlFor="oldPassword" className="block mb-1">
               your message here
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                placeholder="your message here"
               
                
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-red-500"
                required
              />
            </div>
            <div>
              
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="submit">
          <button
            type="button"
            className="font-nunito leading-6 font-normal text-white-700 text-base bg-red-600 px-8 py-3  border-2 border-transparent  uppercase transition-all duration-300 hover:bg-red-700"
          >
             Send message
          </button>
          </div>
        </div>
      </form>
                </div>
                <div className="text-section">
                    <div className="texts">
                        <h1 className="heading">
                        Email Address
                        </h1>
                        <p>office@autobid.modeltheme.com</p>
                        <p>sales@autobid.modeltheme.com</p>
                        <div className="dashes">------------------------------------------------</div>
                        <h1 className="heading">
                        Headquarters
                        </h1>
                        <p>
                        211 Ullamcorper St Roseville, New <br />
York, United States, 26483
                        </p>
                        <div className="dashes">------------------------------------------------</div>
                        <h1 className="heading">
                        Phone Number
                        </h1>
                        <p>Headquarters: +20 000 000 000
                            <br />Sales: +20 000 000 000
                            </p>
                            <div className="dashes">------------------------------------------------</div>
                        <h1 className="heading">
                        Working Hours
                        </h1>
                        <p>Monday – Friday: 8AM to 8PM
                            <br />
                          Friday – Sunday: Closed</p>
                        
                    </div>
                </div>
            </div>
  </div>
 )
}