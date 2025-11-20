
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../../home/navbar"), { ssr: false });
const Header = dynamic(() => import("../header/page"));
const Products = dynamic(() => import("./products"));

export default function MainProducts(){
    return(
        <div>
            <Navbar/>
            <Header/>
            <Products/>
        </div>
    )
}