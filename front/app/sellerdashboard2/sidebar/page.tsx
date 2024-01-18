import "./page.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SettingsIcon from '@mui/icons-material/Settings';
export default function SideBar(){
    return(
       <div>
        <div className="dashboard-wrap">
            <div className="dashboard-sidebar">
                <div className="navigation">
                    <ul className="menu">
                        <li className="active dashboard">
                            <a href="#">Dashboard</a>
                        <FontAwesomeIcon
                          icon="fas fa-tachometer-alt"
                          className="red-icon h-6 w-6 float-start mx-1"
                        />
                        </li>
                        
                        <li className="">
                            <a href="#">Products</a>
                           < BusinessCenterIcon/>
                        </li>
                        <li className="">
                            <a href="#">Orders</a>
                            <ShoppingCartIcon/>
                        </li>
                        <li className="">
                            <a href="#">Withdraw</a>
                            <FileUploadIcon/>
                        </li>
                        <li className="">
                            <a href="#">Withdraw</a>
                            <FileUploadIcon/>
                        </li>
                        <li className="">
                            <a href="#">Withdraw</a>
                            <SettingsIcon/>
                        </li>
                       

                    </ul>
                </div>
            </div>
            <div className="dashboard-content"></div>
        </div>
       </div>
    )
}