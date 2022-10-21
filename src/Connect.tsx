import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Connect2Phantom from './PhatomConnect'
import MetaMaskConnect from './MetaMaskConnect'

const emails = ['username@gmail.com', 'user02@gmail.com'];

const theme = createTheme({
  palette: {
      primary: {
         main: "#FEC02C"
      },
      secondary: {
         main: "#3D3F44"
      }
  }
})

interface TheProps {
    onClose: Function;
    selectedValue: string;
    open: boolean;
}

function SimpleDialog(props:TheProps) {
  const  onClose = props.onClose;
  const selectedValue = props.selectedValue;
  const  open = props.open;


  const handleClose = () => {
    onClose(selectedValue);
  };

  // const handleListItemClick = (value) => {
  //   onClose(value);
  // };

  return (
    <ThemeProvider theme={theme}>
    <Dialog  onClose={handleClose} open={open}>
      <DialogTitle>Connect a wallet on solana to continue</DialogTitle>
      <List sx={{ pt: 0 }}>

      <Connect2Phantom/>
      <MetaMaskConnect/>
      </List>
    </Dialog>
    </ThemeProvider>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function ConnectWallet() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedValue("ad");
  };


  

  return (
    <div>
      <br />
      <Button variant="contained" onClick={handleClickOpen} color="secondary">Connect</Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>

    
  );
}
