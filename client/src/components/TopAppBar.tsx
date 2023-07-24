import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import auth from "../utils/auth";

const TopAppBar = () => {


    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        SimpleNote
                    </Typography>
                    <Button color="inherit" onClick={auth.logout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default TopAppBar;

