import Navbar from "../../home/navbar"
import Header from "../header/page"
import NoProductsFound from "./noproducts"
import Footer from "../../footer/Footer"

export default function MainProducts(){
    return(
        <div>
            <Navbar/>
            <Header/>
            <NoProductsFound/>
            <Footer/>
        </div>
    )
}