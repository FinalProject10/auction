import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import AddProduct from "../createproduct/createproduct"
import AlertDialog from "./confirmpopup"
interface AlertDialogSlideProps{
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    handleClickOpen:()=>void
}
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  export default function AlertDialogSlide(props:AlertDialogSlideProps) {
   const handleClickOpen=props.handleClickOpen
  const open = props.open
  const setOpen=props.setOpen
  const [confirm,setConfirm] = React.useState(false);
    const handleClose = () => {
   setConfirm(true)
      setOpen(false);
    };
  
    return (
      <React.Fragment>
        
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Add Product"}</DialogTitle>
          <DialogContent>
          <AddProduct/>
          </DialogContent>
          <DialogActions>
          <div className="space-x-4 mt-8">
            <Button className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"  onClick={handleClose}>cancel</Button>
            <Button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50" onClick={handleClose}>save</Button>
            </div>
          </DialogActions>
        </Dialog>
        {confirm&&<AlertDialog setOpen={setOpen} />
        
        }
      </React.Fragment>
    );
  }