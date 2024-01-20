import './page.css'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
export default function SideBar() {
    return (
        <div>
            <div className="dokan-dash-sidebar">
                <ul className="dokan-dashboard-menu">
                    <li className="active dashboard">
                        <a href="https://autobid.modeltheme.com/dashboard/">
                            <i className="fas fa-tachometer-alt"></i> Dashboard
                        </a>
                    </li>
                    <li className="products">
                        <a href="https://autobid.modeltheme.com/dashboard/products/">
                            <BusinessCenterIcon />
                            Products
                        </a>
                    </li>
                    <li className="orders">
                        <a href="https://autobid.modeltheme.com/dashboard/orders/">
                            <ShoppingCartIcon />
                            Orders
                        </a>
                    </li>
                    <li className="withdraw">
                        <a href="https://autobid.modeltheme.com/dashboard/withdraw/">
                            <FileUploadIcon />
                            Withdraw
                        </a>
                    </li>
                    <li className="settings has-submenu">
                        <a href="https://autobid.modeltheme.com/dashboard/settings/store/">
                            <SettingsIcon />
                            Settings <ChevronRightIcon className="menu-dropdown" />
                        </a>
                    </li>
                    <li className="icons-container">
                        <div className="icon-item" id='icon-item1'>
                            <a href="#">
                                <BusinessCenterIcon />
                            </a>
                        </div>
                        <div className="icon-item" >
                            <a href="#power-settings">
                                <FileUploadIcon />
                            </a>
                        </div>
                        <div className="icon-item" >
                            <a href="#file-upload">
                                <PowerSettingsNewIcon />
                            </a>
                        </div>
                    </li>
         
                </ul>
            </div>
        </div>
    );
}