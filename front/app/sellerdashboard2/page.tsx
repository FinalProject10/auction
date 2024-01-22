import Navbar from "../home/navbar"
// import Header from "./header/page"
import Footer from "../footer/Footer"
import CanvasComponent from "./homedashboard/courbe/courbe"
import  MyOrdersList from "./homedashboard/orders/orders"
import SalesListItem from "./homedashboard/saless/sales"
import OurProducts from "./homedashboard/ourproduct/ourproduct"
import SideBar from "./sidebar/page"
import AddProduct from "./addproduct/page"
import './page.css'
export default function Dashboard(){
    return (
        <div className='dash-container'>
            <Navbar/>
           {/* < Header/> */}
            <div className="body-container">
            <div className="sidebar">
                <SideBar h={1000}/>
            </div>
           
            <div className="sales-orders-products">
                <div className="sales">
            <SalesListItem/>
            </div>
            <div className="orders">
            <MyOrdersList/>
            </div>
           <div className="products">
            <OurProducts/>
            </div>
          
           
           </div>
           <CanvasComponent/>
           
           
          
        </div>
        <Footer/>
        </div>
    )
}