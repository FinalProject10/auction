"use client"
import React from "react"
import AddedProducts from "./tableaux/products"
import AlertDialogSlide from "./popup/popup"
import Cards from "./cards/cards"
import SideBar from "./sidebarr/sidebar"
import "../sellerdashboard/sellerdashboard.css"
const salesData = [2112, 2343, 2545, 3423, 2365, 1985, 987];
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export default function  SellerDashboard (){
  const [open, setOpen] = React.useState(false);
  const [addedProducts,setAddedProducts]=React.useState(false)
  const handleClickOpen = () => {
    console.log("add product click works!")
    setOpen(true);
    console.log("open is set to true")
  };
    return(
      <div className="dashboard ">
 
  
    
      
      <SideBar setAddedProducts={setAddedProducts}  open={open} setOpen={setOpen} handleClickOpen={handleClickOpen}  />
      
    <Cards />
    {
      open&& <AlertDialogSlide handleClickOpen={handleClickOpen} open = {open} setOpen={setOpen} />
    }
{
  addedProducts&&<AddedProducts/>
}
    
</div>
    )
}