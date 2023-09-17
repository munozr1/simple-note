import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
} from "@mui/material";
import { Info as InfoIcon, Brightness4 as ThemeIcon  } from "@mui/icons-material";
import auth from "../utils/auth";
import { useContext } from "react";
import ColorModeContext from "../utils/ColorModeContext";

const TopAppBar = () => {
    const colorMode = useContext(ColorModeContext);

    return (
        <Box>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        SimpleNote
                    </Typography>
                    {auth.loggedIn() && <Button color="inherit" onClick={auth.logout}>Logout</Button>}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, ml: 2 }}
                        onClick={colorMode.toggleColorMode}
                    >
                        <ThemeIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default TopAppBar;

