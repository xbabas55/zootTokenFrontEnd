import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ConnectWallet from './Connect'
import MyAccount from './Account';
import Navbar from './component/Navbar';
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




export default function Header() {
    return(
       
        <AppBar position="static">    
          <Navbar/>
        </AppBar>
       
    )
}