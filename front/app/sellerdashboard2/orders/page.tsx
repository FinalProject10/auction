import React from "react";
import SideBar from '../sidebar/page'
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RefreshIcon from '@mui/icons-material/Refresh';
import "./page.css"; 

const Orders = () => {
  return (
    <div className="container">
        <SideBar/>
    <div className="your-component-container">
      <div className="status-list">
        <div className="list-item">All (0)</div>
        <div className="list-item">Completed (0)</div>
        <div className="list-item">Processing (0)</div>
        <div className="list-item">On-hold (0)</div>
        <div className="list-item">Pending (0)</div>
        <div className="list-item">Cancelled (0)</div>
        <div className="list-item">Refunded (0)</div>
        <div className="list-item">Failed (0)</div>
      </div>
      <div className="flex">
        <div className="filter-section">
          <select className="custom-select">
            <option>Filter By Registered Customer</option>
          </select>
          <input className="search-input" type="text" placeholder="Search Orders" />
          <input className="calendar-input" type="text" placeholder="Select Date Range" />
          <button className="filter-button">
            <FilterAltIcon />
            Filter
          </button>
        </div>
      

      <div className="awesome-buttons">
        <button className="awesome-button">Export All</button>
        <button className="awesome-button">Export Filtered</button>
      </div>
      </div>

      <div className="reset-btn">
  <button>
    <RefreshIcon />
    Reset
  </button>
</div>
    </div>
    </div>

  );
};

export default Orders;