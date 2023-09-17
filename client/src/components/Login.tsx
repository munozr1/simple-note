import {
    Box,
    Button,
    Container,
    FormGroup,
    Stack,
    Tab,
    Tabs,
    TextField,
} from "@mui/material";
import React, { useState, ChangeEventHandler, FormEventHandler } from "react";
import auth from "../utils/auth";
import { LOGIN, SIGN_UP } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const BLANK_INPUT = {
    email: "",
    username: "",
    password: "",
};

interface InputData {
    email?: string;
    username: string;
    password: string;
}

interface LoginInput extends HTMLInputElement {
    name: "email" | "username" | "password";
}


const LoginModal = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [inputData, setInputData] = useState<InputData>(BLANK_INPUT);

    const [login, { reset: resetLogin }] = useMutation(LOGIN, {
        variables: { email: inputData.email, password: inputData.password },
    });
    const [signUp, { reset: resetSignUp }] = useMutation(SIGN_UP, {
        variables: { ...inputData },
    });

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(event.target)
        setInputData(BLANK_INPUT)
        setSelectedTab(newValue);
    };

    const handleInputChange: ChangeEventHandler<LoginInput> = (event) => {
        setInputData((prevState) => {
            const { name, value } = event.target;
            return { ...prevState, [name]: value };
        });
    };

    const handleInputSubmit: FormEventHandler = async (event) => {
        event.preventDefault();
        console.log("submit", inputData);
        
        if (selectedTab === 1) {
            try {
                const { data } = await signUp();
                resetSignUp();
                console.log(data.signUp.token)
                auth.login(data.signUp.token);
            } catch (error) {
                console.error("Sign Up Error:", error);
            }
            return;
        }

        try {
            const { data } = await login();
            resetLogin();
            auth.login(data.login.token);
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    return (
        <Box sx={{ marginTop: "5%" }}>
            <Container
                maxWidth="md"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <Stack spacing={2} alignItems="center">
                    <Tabs value={selectedTab} onChange={handleTabChange} centered={true}>
                        <Tab label="Login" />
                        <Tab label="Sign Up" />
                    </Tabs>
                    <FormGroup sx={{width: "60%"}}>
                        {selectedTab === 1 && (
                            <TextField
                                label="Username"
                                name="username"
                                variant="standard"
                                value={inputData.username}
                                onChange={handleInputChange}
                            />
                        )}
                        <TextField
                            label="Email"
                            name="email"
                            variant="standard"
                            value={inputData.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            variant="standard"
                            value={inputData.password}
                            onChange={handleInputChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button variant="contained" onClick={handleInputSubmit} sx={{width: "50%"}}>
                        {selectedTab === 0 ? "Login" : "Sign Up"}
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};
export default LoginModal;
