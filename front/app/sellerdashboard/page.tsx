import {Chart,registerables} from "chart.js"
import Cards from "./cards/cards"
import SideBar from "./sidebarr/sidebar"
import "../sellerdashboard/sellerdashboard.css"
export default function  SellerDashboard (){
  Chart.register(...registerables);
  const canvas: HTMLCanvasElement = document.querySelector('canvas')!;
  const chart = new Chart(canvas,{
    type:'line',
    data: {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [{
        label: 'Traffic',
        data: [2112, 2343, 2545, 3423, 2365, 1985, 987],
      }],
    },
  })
    return(
      <div className="dashboard ">
 
  
    
      
      <SideBar />
      
    <Cards />
    <div  className="chart mx-auto w-11/12 overflow-hidden md:w-3/5 bg-gray-200 border border-gray-500 p-4">
  <canvas id="canvas"
    data-te-chart="line"
    data-te-dataset-label="Traffic"
    data-te-labels="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']"
    data-te-dataset-data="[2112, 2343, 2545, 3423, 2365, 1985, 987]"
  ></canvas>
</div>
</div>
    )
}