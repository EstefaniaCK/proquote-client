import "./LogInForm.scss"
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';



// Styling for the button 

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#000000'),
    backgroundColor: '#000000',
    '&:hover': {
        backgroundColor: blue[700],
    },
}));

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
                <TextField id="outlined-basic1" label="Username" variant="outlined" margin="normal" />
                <TextField id="outlined-basic2" label="Password" variant="outlined" margin="normal" />
            </div>
            <ColorButton size="large" type="sumbit" variant="contained" onClick={handleSubmit}>Log In</ColorButton>
        </form>
    );
}