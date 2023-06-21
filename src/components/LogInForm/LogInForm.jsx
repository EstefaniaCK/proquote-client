import "./LogInForm.scss"
import { TextField, RedBar } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

export default function LogInForm() {
    return (
        <form className="form">
            <div className="form__inputs">
                <TextField id="outlined-basic" label="Username" variant="outlined" margin="normal" />
                <TextField id="outlined-basic" label="Password" variant="outlined" margin="normal" />
            </div>
            <Link to="/projects" className="form__button">
                <Button size="large" variant="contained">Log In</Button>
            </Link>
        </form>
    );
}