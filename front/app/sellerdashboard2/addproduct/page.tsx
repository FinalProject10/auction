"use client"
import './page.css'

import React,{useState} from "react"
import Navbar from "../../home/navbar";
import Header from "../header/page";
import SideBar from "../sidebar/page";
import InfoTooltip from "../../components/InfoTooltip";
import { Edit, FormatBold, FormatItalic, FormatUnderlined,
     FormatAlignLeft, FormatAlignCenter, FormatAlignRight
     , FormatAlignJustify } from '@mui/icons-material';
     import SettingsIcon from '@mui/icons-material/Settings';
     import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
     const grid1Titles = ['Car Model', 'Product Climatisation', 'Product Door Count', 'Product GearBox', 'Product Parkingsensors'];
     const grid2Titles = ['Product Airbags', 'Product Color', 'Product Emission className', 'Product Mileage', 'Product Power'];
     const grid3Titles = ['Product Body', 'Product Cubic Capacity', 'Product Fuel', 'Product Number of Seats'];
     export default function AddProduct(){
        const [show,setShow]=useState<boolean>(false)
        const showOptions=()=>{
            setShow(!show)
        }
        const saveProduct=()=>{
          alert ('product saved successfully!')
        }
        const generateRandomOptions = () => {
            const options = [];
            for (let i = 1; i <= 20; i++) {
              options.push(`Option ${i}`);
            }
            return options;
          };
    return (
        <div className="comp">
            <Navbar/>
    <Header/>

    <div className="container">
   <div className="sidebar">
            <SideBar h= {1756} />
            </div>
            
        <div className="form">
            <div className="header">Add New Product</div>
            <div className="add-product">
                <div className="title-tag">
                    <div className="general-inputs">
                        <div className="inp">
                            <label >Name</label>
                            <input type="text" placeholder="Product Name.." />
                        </div>
                        <div className="inp">
                            <label>Category</label>
                            <div className="category-container">
                <div className="category-text">Car Parts</div>
                <div className="category-edit">
                  <Edit />
                </div>
              </div>
                        </div>
                        <div className="inp">
              <div className="checkbox-with-text">
                <input type="checkbox" id="downloadableCheckbox" />
                <label htmlFor="downloadableCheckbox">Downloadable</label>
              </div>
              <div className="checkbox-with-text">
                <input type="checkbox" id="virtualCheckbox" />
                <label htmlFor="virtualCheckbox">Virtual</label>
              </div>
            </div>
                        <div className="auction">
                        <div className="checkbox-with-text flex items-center gap-2">
                <input type="checkbox" id="downloadableCheckbox" />
                <label htmlFor="downloadableCheckbox" className="flex items-center gap-2">
                  auction
                  <InfoTooltip 
                    content="Check this box to list the product as an auction item. Auction items have a start and end time, and buyers bid on them. Unchecked items are regular products with fixed prices."
                    position="top"
                    iconSize="sm"
                  />
                </label>
              </div>
                        </div>
                        <div className="inp">
              <label className="flex items-center gap-2">
                Initial Price
                <InfoTooltip 
                  content="The starting price for your auction. This is the minimum bid amount. Bidders must bid at least this amount or higher based on current bids."
                  position="top"
                  iconSize="sm"
                />
              </label>
              <div className="dokan-input-group">
                <span className="dokan-input-group-addon">£</span>
                <input
                  type="text"
                  name="_new_price"
                  id="_new_price"
                  value=""
                  className="wc_input_price"
                  placeholder="0.00"
                />
              </div>
            </div>

                    </div>
                    <div className="image-container">
                        <h2>image here!</h2>
                    </div>
                </div>
                <div className="short-description">
                    <label >Short Description</label>
                <div className="editor-header">
                <div className="text-modifiers">
                  <FormatBold />
                  <FormatItalic />
                  <FormatUnderlined />
                </div>
                <div className="text-alignment">
                  <FormatAlignLeft />
                  <FormatAlignCenter />
                  <FormatAlignRight />
                  <FormatAlignJustify />
                </div>
              </div>
              <textarea
                className="text-area"
                placeholder="Type your text here..."
              ></textarea>
              <div className="separator"></div>
            </div>
                </div>
                <div className="description">
                <label >Description</label>
                <div className="editor-header">
                <div className="text-modifiers">
                  <FormatBold />
                  <FormatItalic />
                  <FormatUnderlined />
                </div>
                <div className="text-alignment">
                  <FormatAlignLeft />
                  <FormatAlignCenter />
                  <FormatAlignRight />
                  <FormatAlignJustify />
                </div>
              </div>
              <textarea
                className="text-area"
                placeholder="Type your text here..."
              ></textarea>
              <div className="separator"></div>
                </div>
                <div className="car-attributes">
                <h3>Car Attributes</h3>
                <div className="grid">
                <div className="attributes-grid">
                  {grid1Titles.map((title, index) => (
                    <select key={index}>
                      <option value="">{title}</option>
                      {generateRandomOptions().map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ))}
                </div>
                <div className="attributes-grid">
                  {grid2Titles.map((title, index) => (
                    <select key={index}>
                      <option value="">{title}</option>
                      {generateRandomOptions().map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ))}
                </div>
                <div className="attributes-grid">
                  {grid3Titles.map((title, index) => (
                    <select key={index}>
                      <option value="">{title}</option>
                      {generateRandomOptions().map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ))}
                </div>
                </div>
              </div>
              <div className="options-container">
      <div className="options-text">
        <div className="icon">
        <SettingsIcon/>
        </div>
       <p>Other Options</p> 
       <div className="extra-options-text">Set Your Extra Product Options</div>
      </div>
      
      <div className="arrow" onClick={()=>{showOptions()}}>
      <KeyboardArrowUpIcon/>
      </div>
      
    </div>
    {show&&<div className="container-options show">
        <div className="nested">
    <div className="nested-div">
      <label>Product Status</label>
      <input type="text" id="input1" placeholder="Pending Review" />
    </div>
    <div className="nested-div">
      <label >Visibility</label>
      <input type="text" id="input2" placeholder="visible" />
    </div>
    </div>
    <div className="extra-container">
    <label >Purchase Note</label>
    <textarea id="textarea1" placeholder="Customer will get this info in their order email"></textarea>
  </div>
  <div className="enable-reviews">
                <input type="checkbox" className="enable" />
                <label >enable reviews</label>
              </div>
  </div>}
   
  <div className="save-product" onClick={()=>{saveProduct()}}>
    <button>Save Product</button>
  </div>
  </div>
            </div>

            </div>
 
    )
}