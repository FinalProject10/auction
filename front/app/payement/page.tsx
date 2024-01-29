import React from 'react'
import Strip from '../payement/stripe'
import Flouci from '../payement/flouci'
const payment = () => {
  return (
    <div className="flex" >
       <div className="w-full h-screen" style={{"background-image":"url('https://vojislavd.com/ta-template-demo/assets/img/coming-soon.jpg')"}}>
    <div className="w-full h-screen flex flex-col items-center justify-between bg-black bg-opacity-70 py-8">
        <div className="flex-1 flex flex-col items-center justify-center">
            <div className="bg-white bg-opacity-10 px-4 py-2 rounded-xl flex items-center justify-center text-cyan-100 space-x-2 lg:space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 lg:h-8 xl:h-10 w-6 lg:w-8 xl:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                </svg>
                <span className="text-xl lg:text-2xl xl:text-3xl font-bold">WELCOME TO MEMBERSHIP PAYMENT</span>
            </div>
           
            <h5 className=" text-6xl lg:text-7xl xl:text-8xl text-gray-200 tracking-wider font-bold font-serif mt-12 text-center">
            </h5>
            
            <div className="flex flex-col items-center space-y-4 mt-24">
                <p className="text-gray-300 uppercase text-sm">Choose Your Payment Method</p>
                <form className="w-full flex items-center">
                <Flouci/>
      <Strip/>
                </form>
            </div>
        </div>
       
    </div>
</div>

      
    </div>
  )
}

export default payment