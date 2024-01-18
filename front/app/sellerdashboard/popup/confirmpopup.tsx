import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
interface AlertDialogProps {
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    confirm:boolean;
    setConfirm:React.Dispatch<React.SetStateAction<boolean>>;

}
export default function AlertDialog(props:AlertDialogProps) {
  const confirm=props.confirm
  const setConfirm=props.setConfirm
 const setOpen = props.setOpen
  

  const handleClose = (btn:number) => {
   if(btn===1){
    setOpen(true)
    
   }
else if(btn===2){
  setOpen(false)
}
setConfirm(false);
    
  };

  return (
    <React.Fragment>
      
      <Dialog
        open={confirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are yousure you want to save this Product!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
      <Button onClick={()=>handleClose(1)}>cancel</Button>
          <Button onClick={()=>handleClose(2)} autoFocus>
            confirm </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}