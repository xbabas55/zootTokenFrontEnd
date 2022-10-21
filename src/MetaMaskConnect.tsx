import { useEffect, useState } from "react";
import logo from './logo.svg';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
 
const MetaMaskConnect: React.FC = () => {
 const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(false);
 const [ethereumAccount, setEthereumAccount] = useState<string | null>(null);
 
 useEffect(() => {
   if((window as any).ethereum){
     //check if Metamask wallet is installed
     setIsMetamaskInstalled(true);
   }
 },[]);

 
 
 //Does the User have an Ethereum wallet/account?
 async function connectMetamaskWallet(): Promise<void> {
   //to get around type checking
   (window as any).ethereum
     .request({
         method: "eth_requestAccounts",
     })
     .then((accounts : string[]) => {
       setEthereumAccount(accounts[0]);
     })
     .catch((error: any) => {
         alert(`Something went wrong: ${error}`);
     });
 }
 
 if (ethereumAccount === null) {
   return (
     <div className="App App-header">
       {
         isMetamaskInstalled ? (
           <div>
             {/* <img src={logo} alt="logo" /> */}
             <ListItem >
             <ListItemAvatar>
             <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                 <PersonIcon />
             </Avatar>
             </ListItemAvatar>
             <ListItemText primary="METAMASK" />
         <Box display="flex" justifyContent="space-between">
         <Button variant="contained" color="secondary"  onClick={connectMetamaskWallet}>Connect</Button>
            
         </Box>
         </ListItem>
           </div>
             
         ) : (
           <p>Install Your Metamask wallet</p>
         )
       }
 
     </div>
   );
 } else {
 return (
   <div className="App">
        {/* <img src={logo} alt="logo" /> */}
        <ListItem >
             <ListItemAvatar>
             <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                 <PersonIcon />
             </Avatar>
             </ListItemAvatar>
             <ListItemText primary="METAMASK" />
         <Box display="flex" justifyContent="space-between">
         <Button variant="contained" color="secondary" disabled  >Connected</Button>
         </Box>
         </ListItem>
         ETH wallet connected as: {ethereumAccount}
   </div>
 );
 }
}
 
export default MetaMaskConnect;