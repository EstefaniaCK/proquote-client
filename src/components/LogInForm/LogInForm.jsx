import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import "./LogInForm.scss";

// Button styling 
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#000000"),
    backgroundColor: "#000000",
    "&:hover": {
        backgroundColor: blue[700],
    },
}));

export default function LogInForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (username.trim() === "") {
            setUsernameError(true);
        } else {
            setUsernameError(false);
        }

        if (password.trim() === "") {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }

        if (username.trim() !== "" && password.trim() !== "") {
            navigate("/projects");
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form__inputs">
                <TextField
                    id="outlined-basic1"
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={usernameError} />
                {usernameError && (
                    <Typography variant="caption" color="error">
                        Please enter a username
                    </Typography>
                )}
                <TextField
                    id="outlined-basic2"
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError} />
                {passwordError && (
                    <Typography variant="caption" color="error">
                        Please enter a password
                    </Typography>
                )}
            </div>
            <ColorButton size="large" type="submit" variant="contained">
                Log In
            </ColorButton>
        </form>
    );
}

