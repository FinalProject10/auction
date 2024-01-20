import PaymentIcon from '@mui/icons-material/Payment';
import './courbe.css';

const CanvasComponent: React.FC = () => {
  return (<div className="canvas-container">
    <div className="canvas-header">
    < PaymentIcon/>
         Sales This  Month
     </div>
    <div >
       
      <canvas className="canvas" width="400" height="200"></canvas>
    </div>
    </div>
  );
};

export default CanvasComponent;