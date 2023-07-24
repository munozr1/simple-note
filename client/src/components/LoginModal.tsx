import {
    Button,
    Card,
    Container,
    Modal,
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

interface CustomTabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface LoginModalProps {
    open: boolean;
}

interface InputData {
    email?: string;
    username: string;
    password: string;
}

interface LoginInput extends HTMLInputElement {
    name: "email" | "username" | "password";
}

const CustomTabPanel = ({ children, value, index }: CustomTabPanelProps) => {
    return (
        <div hidden={value !== index} id={`tabpanel-${index}`}>
            {value === index && <> {children} </>}
        </div>
    );
};

const LoginModal = ({ open }: LoginModalProps) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [inputData, setInputData] = useState<InputData>(BLANK_INPUT);

    const [login, { reset: resetLogin }] = useMutation(LOGIN, {
        variables: { email: inputData.email, password: inputData.password },
    });
    const [signUp, { reset: resetSignUp }] = useMutation(SIGN_UP, {
        variables: { ...inputData },
    });

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
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

        if (selectedTab === 1) {
            try {
                const { data } = await signUp();
                await signUp();
                resetSignUp();
                auth.login(data.signUp.token);
            } catch (error) {
                console.error("Sign Up Error:", error);
            }
            return;
        }

        try {
            const { data } = await login();
            await login();
            resetLogin();
            auth.login(data.login.token);
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    return (
        <Modal open={open}>
            <Container
                maxWidth="md"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100vh",
                }}
            >
                <Card sx={{ height: "70%" }}>
                    <Tabs value={selectedTab} onChange={handleTabChange}>
                        <Tab label="Login" />
                        <Tab label="Sign Up" />
                    </Tabs>
                    <CustomTabPanel value={selectedTab} index={0}>
                        <Stack>
                            <TextField
                                label="Email"
                                name="email"
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Password"
                                name="password"
                                onChange={handleInputChange}
                                type="password"
                            />
                            <Button onClick={handleInputSubmit}>Login</Button>
                        </Stack>
                    </CustomTabPanel>
                    <CustomTabPanel value={selectedTab} index={1}>
                        <Stack>
                            <TextField
                                label="Email"
                                name="email"
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Username"
                                name="username"
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Password"
                                name="password"
                                onChange={handleInputChange}
                                type="password"
                            />
                            <Button onClick={handleInputSubmit}>Sign Up</Button>
                        </Stack>
                    </CustomTabPanel>
                </Card>
            </Container>
        </Modal>
    );
};
export default LoginModal;
