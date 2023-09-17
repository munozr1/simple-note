import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
    CssBaseline,
    PaletteColor,
    PaletteOptions,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import ColorModeContext from "./utils/ColorModeContext.tsx";
import InitTheme from "./utils/InitTheme.ts";

const httpLink = createHttpLink({
    uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("id_token");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const lightPalette: PaletteOptions = {
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
        paper: "#d9d9d9",
    },
};

const darkPalette: PaletteOptions = {
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
        paper: "#3b3b3b",
    },
};

const ThemedApp = () => {
    const savedMode =
        localStorage.getItem("colorMode") === "dark" ? "dark" : "light";
    const [mode, setMode] = React.useState<"light" | "dark">(savedMode);

    const colorMode = {
        toggleColorMode: () => {
            const newMode = mode === "light" ? "dark" : "light";
            localStorage.setItem("colorMode", newMode);
            setMode(newMode);
        },
    };

    // Update the theme only if the mode changes
    const theme = React.useMemo(() => {
        return InitTheme(mode);
    }, [mode]);

    return (
        <ApolloProvider client={client}>
            <React.StrictMode>
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <App />
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </React.StrictMode>
        </ApolloProvider>
    );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ThemedApp />
);
