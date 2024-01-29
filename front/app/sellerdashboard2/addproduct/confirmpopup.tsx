import React, { Dispatch, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
interface ConfirmProps {
    setOpen:Dispatch<React.SetStateAction<boolean>>;
    setConfirm:Dispatch<React.SetStateAction<boolean>>;
    saveProduct:()=>void
    open:boolean;
}
const Confirm = ({setOpen,open,setConfirm,saveProduct}:ConfirmProps) => {
  

  

  const handleClose = () => {
    setOpen(false);
  };

  

  return (
    <div>
     

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to post this product
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button style={{backgroundColor:"#FF2800",color:"white"}} onClick={()=> {saveProduct()}} >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Confirm;
