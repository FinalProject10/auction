
import './sidebar.css'
export default function SideBar(){
    return (
        <>
       
       <aside className=" w-[20%]  bg-gradient-to-br from-gray-800 to-gray-900 ">
    <div className="relative border-b border-white/20">
      <div className="profile">
        <img src="https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/411486490_2097464560607278_4759663000808557286_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=iqrHEd_zcu8AX-vLmvf&_nc_ht=scontent.ftun8-1.fna&oh=00_AfAVTYFdbSzAATAESUjGh3PmqsyLJjbAIlhyIg2R12F8NQ&oe=65A750B5" alt="no-content" />
        <div className="full-name">
            zakaria askri
        </div>
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
          
            <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
             
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