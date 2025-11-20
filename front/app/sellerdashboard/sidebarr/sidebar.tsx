import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './sidebar.css'
interface SideBarProps {
  handleClickOpen:( )=>void;
  open:boolean;
  setOpen:React.Dispatch<React.SetStateAction<boolean>>;
  setAddedProducts:React.Dispatch<React.SetStateAction<boolean>>;
}
export default function SideBar(props:SideBarProps){
  const setAddedProducts=props.setAddedProducts
  const handleClickOpen=props.handleClickOpen
  const open = props.open
    return (
        <>
       
       <aside className=" w-[20%]  bg-gradient-to-br from-gray-800 to-gray-900 ">
    <div className="relative border-b border-white/20">
      <div className="profile">
        <img src="/images/sidebar/sidebar-pic.jpg" alt="no-content" />
        <div className="full-name">
            zakaria askri
        </div>
        <button onClick={()=>{handleClickOpen()}} className="add-product">
        <AddCircleOutlineIcon/>
        <p>add Product</p>
        </button>
      </div>
    </div>
    <div className="m-4">
      <ul className="mb-4 flex flex-col gap-1">
        <li className="active">
         
            <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize" type="button">
              
              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">dashboard</p>
            </button>
          
        </li>
        <li>
         
            <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
            
              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Statistics</p>
            </button>
          
        </li>
        <li>
         
            <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
             
              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Products</p>
            </button>
        
        </li>
        <li>
          
            <button onClick={()=>{setAddedProducts(true)}} className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
             
              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Added Products</p>
            </button>
          
        </li>
      </ul>
      <ul className="mb-4 flex flex-col gap-1">
        <li className="mx-3.5 mt-4 mb-2">
          <p className="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">deleted Products</p>
        </li>
        <li>
          
            <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
             
              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">notifications</p>
            </button>
          
        </li>
        <li>
        
            <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
             
              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">log out</p>
            </button>
         
        </li>
      </ul>
    </div>
  </aside>
        </>
    )
}