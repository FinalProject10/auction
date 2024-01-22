import './page.css'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Link from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
interface SideProps {
    h:number
}
export default function SideBar(props:SideProps) {
    
   const h = props.h
   
    return (
        
        <div >
            <div className="dokan-dash-sidebar" style={{height:`${h} px`}}>
                <ul className="dokan-dashboard-menu">
                    <li className="active dashboard">
                        <Link href="/sellerdashboard2">
                            <i className="fas fa-tachometer-alt"></i> Dashboard
                        </Link>
                    </li>
                    <li className="products">
                        <Link href="/sellerdashboard2/products">
                            <BusinessCenterIcon />
                            Products
                        </Link>
                    </li>
                    <li className="orders">
                        <Link href="/orders">
                            <ShoppingCartIcon />
                            Orders
                        </Link>
                    </li>
                    <li className="withdraw">
                        <Link href="/sellerdashboard2/withdraw">
                            <FileUploadIcon />
                            Withdraw
                        </Link>
                    </li>
                    <li className="settings has-submenu">
                        <Link href="#">
                            <SettingsIcon />
                            Settings <ChevronRightIcon className="menu-dropdown" />
                        </Link>
                    </li>
                    <li className="icons-container">
                        <div className="icon-item" id='icon-item1'>
                            <Link href="#">
                                <BusinessCenterIcon />
                            </Link>
                        </div>
                        <div className="icon-item" >
                            <a href="#power-settings">
                                <FileUploadIcon />
                            </a>
                        </div>
                        <div className="icon-item" >
                            <Link href="/sellerdashboard2/edit-account">
                                <PowerSettingsNewIcon />
                            </Link>
                        </div>
                    </li>
         
                </ul>
            </div>
        </div>
    );
}