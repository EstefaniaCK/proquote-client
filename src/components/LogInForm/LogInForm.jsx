import "./LogInForm.scss"
import { TextField, RedBar } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";

export default function LogInForm() {
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("123")
        navigate("/projects")
    }

    return (
        <form className="form" onSubmit={() => handleSubmit()}>
            <div className="form__inputs">
                <TextField id="outlined-basic" label="Username" variant="outlined" margin="normal" />
                <TextField id="outlined-basic" label="Password" variant="outlined" margin="normal" />
            </div>
            <Button size="large" type="sumbit" variant="contained">Log In</Button>
        </form>
    );
}