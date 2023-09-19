import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
    CssBaseline,
    ThemeProvider,
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
console.log(import.meta.env.BACKEND_URI)
const httpLink = createHttpLink({
    uri: `${import.meta.env.VITE_BACKEND_URI || "/graphql"}`,
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
