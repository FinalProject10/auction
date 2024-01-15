import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
interface AlertDialogProps {
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AlertDialog(props:AlertDialogProps) {
  const [confirm,setConfirm] = React.useState(false);
 const setOpen = props.setOpen
   const handleClickOpen = () => {
    setConfirm(true);
  };

  const handleClose = (btn:string) => {

    setConfirm(false);
    
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={confirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
         { /*<Button onClick={handleClose}>back</Button>
          <Button onClick={handleClose} autoFocus>
            confirm
          </Button>*/}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}