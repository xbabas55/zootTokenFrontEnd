import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ConnectWallet from './Connect'
import MyAccount from './Account';

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
        <ThemeProvider theme={theme}>
            <AppBar position="static">
            <Toolbar>
                <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="menu"
                sx={{mr: 2}}
                >
                <MenuIcon/>
                </IconButton>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>WEB3 PLATFORM WALLET</Typography>
                {/* <MyAccount/> */}
                <ConnectWallet/>
            </Toolbar>
        </AppBar>
        </ThemeProvider>
    )
}