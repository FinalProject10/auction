"use client"
import './page.css'
import { CloudinaryContext } from 'cloudinary-react';
import { Image } from 'cloudinary-react';
import Popup from './selectCategory'
import axios from "axios"
import React,{useState} from "react"
import Navbar from "../../home/navbar";
import Header from "../header/page";
import Footer from "../../footer/Footer";
import SideBar from "../sidebar/page";
import Confirm from './confirmpopup';
import { useParams } from 'next/navigation';
interface Handlers {
  title:string
  
}
import { Edit, FormatBold, FormatItalic, FormatUnderlined,
     FormatAlignLeft, FormatAlignCenter, FormatAlignRight
     , FormatAlignJustify } from '@mui/icons-material';
     import SettingsIcon from '@mui/icons-material/Settings';
     import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { sendResponse } from 'next/dist/server/image-optimizer';
     const grid1Titles = ['Car Model', 'Product Climatisation', 'Product Door Count', 'Product GearBox', 'Product Parkingsensors'];
     const grid2Titles = ['Product Airbags', 'Product Color', 'Product Emission className', 'Product Mileage', 'Product Power'];
     const grid3Titles = ['Product Body', 'Product Cubic Capacity', 'Product Fuel', 'Product Number of Seats'];
  const cloudinary=  {
      cloudName: 'djptnmqtl',
      apiKey: '163441213535695',
      apiSecret:'7xqLrsV-gAJO1o3_je2kMvtq3iM'
  }
     const setPropertiesGrid1=(index)=>{
      const climatisations=["manual","automatic"]
      const doorCount=[2,4]
      const gearBox=["manualtansmission","automatic transmission","hybrid transaxale"]
      const  parkingSensors=["ultrasonic parking sensors","radar parking sensors","camera based","infrared"]
      
      if(index===0){
        const options = ['Toyota Camry',
      'Honda Accord',
      'Ford Mustang',
      'Chevrolet Silverado',
      'BMW 3 Series',
      'Mercedes-Benz C-Class',
      'Volkswagen Golf',
      'Nissan Altima',
      'Tesla Model 3',
      'Subaru Outback',
      'Audi A4',
      'Hyundai Sonata',
      'Jeep Wrangler',
      'Ford F-150',
      'Lexus RX',
      'Porsche 911',
      'Mazda CX-5',
      'Kia Sorento',
      'Volvo XC90',
      'Jaguar F-PACE'];
     return options
      }
     else if(index===1){
      let options =[]
      for(var i=0;i<climatisations.length;i++){
        options.push(climatisations[i])
      }
      return options
     }
     else if(index===2){
      let options =[]
      for(var i=0;i<doorCount.length;i++){
        options.push(doorCount[i])
      }
      return options
     }
     else if(index===3){
      let options =[]
      for(var i=0;i<gearBox.length;i++){
        options.push(gearBox[i])
      }
      return options
     }
     else if(index===4){
      let options =[]
      for(var i=0;i<parkingSensors.length;i++){
        options.push(parkingSensors[i])
      }
      return options
     }
     }
     const setPropertiesGrid2=(i)=>{
      const airbags=["thorax airbags","pervic airbags","curtain airbags"]
      const color=['black',"grey","white","red"]
      const emissionClass=["euro1","euro2","euro3","euro4","euro5"]
      const mileage=["fuel efficiency","city mileage","highway mileage","combined mileage"]
      const power=["mechanichal","economic"]
      if(i===0){
        let options = []
        for(var j=0;j<airbags.length;j++){
          options.push(airbags[j])
        }
        return options
      }
      else if (i===1){
        let options = []
        for(var j=0;j<color.length;j++){
          options.push(color[j])
        }
        return options
      }
      else if(i===2){
        let options = []
        for(var j=0;j<emissionClass.length;j++){
          options.push(emissionClass[j])
        }
        return options
      }
      else if(i===3){
        let options = []
        for(var j=0;j<mileage.length;j++){
          options.push(mileage[j])
        }
        return options
      }
      else if(i===4){
        let options = []
        for(var j=0;j<power.length;j++){
          options.push(power[j])
        }
        return options
      }
     }
   const  setPropertiesGrid3=(i)=>{
    const body =["crossover","coupe","supercar"]
    const cubicCapacity=["small","mid-size","SUV","Luxury"]
    const fuel=["gazoline","diesel"]
    const numberOfSeats=[2,4,5,7]
if(i===0){
  const options=[]
  for(var k=0;k<body.length;k++){
    options.push(body[k])
  }
  return options
}
if(i===1){
  const options=[]
  for(var k=0;k<cubicCapacity.length;k++){
    options.push(cubicCapacity[k])
  }
  return options
}
if(i===2){
  const options=[]
  for(var k=0;k<fuel.length;k++){
    options.push(fuel[k])
  }
  return options
}
if(i===3){
  const options=[]
  for(var k=0;k<numberOfSeats.length;k++){
    options.push(numberOfSeats[k])
  }
  return options
}
   }
     export default function Formulaire(props:Handlers){
      const params=useParams()
      const [name,setName]=useState<string>("")
      const [category,setCategory]=useState<string>("")
      const [price,setPrice]=useState<string>("")
      const [short,setShort]=useState<string>("")
      const [description,setDescription]=useState<string>("")
      const [model,setModel]=useState<string>("")
      const [climatisation,setClimatisation]=useState<string>("")
      const [doorCount,setDoorCount]=useState<string>("")
      const [gearBox,setGearBox]=useState<string>("")
      const [sencors,setSensors]=useState<string>("")
      const [airbags,setAirbags]=useState<string>("")
      const [color,setColor]=useState<string>("")
      const [emission,setEmission]=useState<string>("")
      const [mileage,setMileage]=useState<string>("")
      const [power,setPower]=useState<string>("")
      const [body,setBody]=useState<string>("")
      const [cubic,setCubic]=useState<string>("")
      const [fuel,setFuel]=useState<string>("")
      const [seats,setSeats]=useState<number>(0)
        const [show,setShow]=useState<boolean>(false)
        const [addCategory,setAddCategory]=useState<boolean>(false)
        const [timeStart,setTimeStart]=useState<string>("")
        const [timeEnd,setTimeEnd]=useState<string>("")
        const [image, setImage] = useState(null);
        const [open, setOpen] = useState(false);
        const [confirm,setConfirm]=useState(false);
        const showOptions=()=>{
            setShow(!show)
        }
        const handleImageUpload = async (e) => {
          const file = e.target.files[0];
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'your_upload_preset');
          axios.post(`https://api.cloudinary.com/v1_1/${cloudinary.cloudName}/image/upload?api_key=${cloudinary.apiKey}&api_secret=${cloudinary.apiSecret}`, formData).then((response)=>{
            setImage(response.data.secure_url);
          }).catch((err)=>{
            console.log(err)
          })
            
      
        }
        const saveProduct=()=>{
         setOpen(true)
         
          const productToPost={
             name:name,
             fuel:fuel,
            timeStart:timeStart,
            timeEnd:timeEnd,
             short_description:short,
             category:category,
             price:price,
             description:description,
             body:body,
             climatisation:climatisation,
             cubicCapacity:cubic,
             emissionClass:emission,
             mileage:mileage,
             parkingSensors:sencors,
             airbags: airbags,
             color:color,
             doorCount:doorCount,
             gearBox:gearBox,
             numberOfSeats:seats,
             power:power
          }
          if(props.title==="Edit Product Details"){
           axios.put(`http://localhost:5000/items/update/${params.id}`,productToPost).then((results)=>{
            console.log(results.data)
           }).catch((error)=>{console.log(error)})
          }
          else if(props.title==="Add new Product"){
            axios.post("http://localhost:5000/items/add",productToPost).then((response)=>{
              console.log(response.data)
              setConfirm(true)
            }).catch((err)=>console.log(err.message))
          }
          
        }
      const setPropsGrid1=(i,event)=>{
        if(i===0){
          console.log(i)
        setModel(event.target.value)
        console.log(model)
        }
        else if(i===1){
          setClimatisation(event.target.value)
          console.log(i)
          console.log(climatisation)
        }
        else if(i===2){
          setDoorCount(event.target.value)
          console.log(i)
          console.log(doorCount)
        }
        else if(i===3){
          setGearBox(event.target.value)
          console.log(i)
          console.log(gearBox)
        }
        else if(i===4){
          setSensors(event.target.value)
          console.log(i)
          console.log(sencors)
        }
      }
    
    
      
    return (
      
        <div className="comp">
            {addCategory&&<Popup addCategory={setAddCategory}/>}
           { open&&<Confirm open={open} setOpen={setOpen} setConfirm={setConfirm} saveProduct={saveProduct} />}
            <Navbar/>
    <Header/>

    <div className="container">
  
   <div className="sidebar">
            <SideBar h= {1756} />
            </div>
            
        <div className="form">
            <div className="header"> {props.title} </div>
            <div className="add-product">
                <div className="title-tag">
                    <div className="general-inputs">
                        <div className="inp">
                            <label >Name</label>
                            <input onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Product Name.." />
                        </div>
                        <div className="inp">
                            <label>Category</label>
                            <div className="category-container">
                <div className="category-text">Car Parts</div>
                <div className="category-edit">
                  <Edit onClick={()=>{setAddCategory(!addCategory)}} />
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
                        <div className="checkbox-with-text">
                <input type="checkbox" id="downloadableCheckbox" />
                <label htmlFor="downloadableCheckbox">auction</label>
              </div>
                        </div>
                        <div className="inp">
              <label>Initial Price</label>
              <div className="dokan-input-group">
                <span className="dokan-input-group-addon">£</span>
                <input onChange={(e)=>{setPrice(e.target.value)}}
                  type='text'
                  
                  id="_new_price"
                 
                  className="wc_input_price"
                  placeholder="0.00"
                />
              </div>
            </div>

                    </div>
                    <div className="image-container">
                    <input type="file" onChange={(e)=>{handleImageUpload(e)}  } />
      {image && (
        <div>
          <h2>Uploaded Image:</h2>
          <Image cloudName="your_cloud_name" publicId={image} />
        </div>
      )}
{/* Cloudinary image uploader component */}
<CloudinaryContext cloudName={cloudinary.cloudName} apiKey={cloudinary.apiKey}>
      {/* Your application components go here */}
    </CloudinaryContext>
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
                    <select key={index} onChange={(e)=>{setPropsGrid1(index,e)}} >
                      <option value="">{title}</option>
                      {setPropertiesGrid1(index).map((option, optionIndex) => (
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
                      {setPropertiesGrid2(index).map((option, optionIndex) => (
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
                      {setPropertiesGrid3(index).map((option, optionIndex) => (
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
      <label>time start</label>
      <input onChange={(e)=>{setTimeStart(e.target.value)}} type="text" id="input1" placeholder="time start" />
    </div>
    <div className="nested-div">
      <label >time end</label>
      <input onChange={(e)=>{setTimeEnd(e.target.value)}} type="text" id="input2" placeholder="time end" />
    </div>
    </div>
    </div>
    }
   
  <div className="save-product" onClick={()=>{setOpen(true)}}>
    <button>Save Changes</button>
  </div>
  </div>
            </div>
            <Footer/>


            </div>
 
    )
}