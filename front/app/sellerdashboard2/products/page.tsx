
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../../home/navbar"));
const Header = dynamic(() => import("../header/page"));
const Products = dynamic(() => import("./products"));
const  Footer = dynamic(() => import("../../footer/Footer"));

export default function MainProducts(){
    return(
        <div>
            <Navbar/>
            <Header/>
            <Products/>
            <Footer/>
        </div>
    )
}