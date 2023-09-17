import { PaletteOptions, ThemeOptions, createTheme } from "@mui/material";

const lightPalette: PaletteOptions = {
    mode: "light",
    primary: {
        main: "#3b3b3b",
        light: "#5a5a5a",
        dark: "#1b1b1b",
        contrastText: "#d9d9d9",
    },
    secondary: {
        main: "#2615c2",
        light: "#4f24d1",
        dark: "#0002b9",
        contrastText: "#ede6fa",
    },
    background: {
        default: "#d9d9d9",
    },
};

const darkPalette: PaletteOptions = {
    mode: "dark",
    primary: {
        main: "#d9d9d9",
        light: "#e9e9e9",
        dark: "#b5b5b5",
        contrastText: "#3b3b3b",
    },
    secondary: {
        main: "#784cde",
        light: "#784cde",
        dark: "#2615c2",
        contrastText: "#d9d9d9",
    },
    background: {
        default: "#3b3b3b",
    },
};

declare module "@mui/material/Paper" {
    interface PaperPropsVariantOverrides {
        pop: true;
        dip: true;
    }
}

const InitTheme = (mode: "light" | "dark") => {
    const theme = createTheme({
        palette: mode === "light" ? lightPalette : darkPalette,
    });
    return createTheme(theme, {
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        boxShadow: "none",
                    },
                },
            },
            MuiTextField: {
                defaultProps: {
                    variant: "standard",
                    margin: "dense",
                    color: "primary",
                    fullWidth: true,
                    InputLabelProps: {
                        shrink: true,
                    },
                    InputProps: {
                        disableUnderline: true,
                        sx: {
                            boxShadow:
                                "-2px -2px 5px 0px rgba(255, 255, 255, 0.05) inset, 1px 1px 5px 0px rgba(0, 0, 0, 0.30) inset",
                            borderRadius: 3,
                            padding: 0.5,
                            paddingLeft: 1,
                        },
                    },
                },
                variants: [
                    {
                        props: { variant: "filled"},
                        style: {

                        }
                    }
                ]
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        background: theme.palette.background.default,
                        transition: "transform .2s",
                        "&:hover": {
                            transform: "scale(1.02)"
                        }
                    },
                    
                },
                variants: [
                    {
                        props: { variant: "pop" },
                        style: {
                            boxShadow:
                                `-2px -2px 5px 0px rgba(255, 255, 255, ${theme.palette.mode === "light" ? "0.5" : "0.1"}), 3px 3px 5px 0px rgba(0, 0, 0, 0.10)`,
                        },
                    },
                    {
                        props: { variant: "dip" },
                        style: {
                            boxShadow:
                                `-2px -2px 5px 0px rgba(255, 255, 255, ${theme.palette.mode === "light" ? ".7" : "0.1"}) inset, 2px 2px 5px 0px rgba(0, 0, 0, .3) inset`,
                        },
                    },
                ],
            },
        },
    });
};

export default InitTheme;
