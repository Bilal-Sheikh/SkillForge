import { BASE_URL } from '../config';
import { styled } from '@mui/material/styles';
import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import CustomSnackbar from '../Features/CustomSnackbar';
import circleScatterAdmin from '../assets/polygon-scatter-admin.svg';
import circleScatterUser from '../assets/circle-scatter-user.svg';


export default function Signin() {
    
    const { role } = useParams()
    // Create a ref for CustomSnackbar
    const customSnackbarRef = useRef();

    const CustomTextField = styled(TextField)({
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white', // Customize the border color here
            },
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });
        if (role === 'admin') {
            try {
                const response = await axios.post(`${BASE_URL}/admin/login`, {}, {
                    headers: {
                        email: data.get('email'),
                        password: data.get('password')
                    }
                })
                localStorage.setItem("token", response.data.token)
                customSnackbarRef.current.handleSnackbarOpen('success', 'Success')
                window.location = `/${role}/menu`
            } catch (error) {
                if (error.response.data.message === "Invalid Admin credentials") {
                    customSnackbarRef.current.handleSnackbarOpen('error', 'Invalid Admin credentials.');
                }
            }
        } else if (role === 'user') {
            try {
                const response = await axios.post(`${BASE_URL}/user/login`, {}, {
                    headers: {
                        email: data.get('email'),
                        password: data.get('password')
                    }
                })
                localStorage.setItem("token", response.data.token)
                customSnackbarRef.current.handleSnackbarOpen('success', 'Success')
                window.location = `/${role}/menu`
            } catch (error) {
                if (error.response.data.message === "Invalid User credentials") {
                    customSnackbarRef.current.handleSnackbarOpen('error', 'Invalid User credentials.');
                }
            }
        }
    };

    return (
        <div
            style={{
                backgroundImage: role === 'admin' ? `url(${circleScatterAdmin})` : `url(${circleScatterUser})`,
                backgroundSize: 'cover',
                height: '91.2vh',
            }}>

            {/* Pass the ref to CustomSnackbar */}
            <CustomSnackbar ref={customSnackbarRef} />

            <div>
                <Typography variant={"h6"} color={'white'} marginLeft={'20px'} paddingTop={'20px'}
                    sx={{
                        mr: 2,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        textDecoration: 'none',
                    }}>
                    {role === 'admin'
                        ? "Welcome to SkillForge! Get ready to share your expertise and inspire learners worldwide."
                        : "Welcome to SkillForge! Get ready to embark on a journey of learning and personal growth with our diverse range of courses"}
                </Typography>
            </div>
            <Container component="main" maxWidth="xs">
                {/* <CssBaseline /> */}
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <CustomTextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{ style: { color: 'white' } }}
                        />
                        <CustomTextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{ style: { color: 'white' } }}
                        />
                        <FormControlLabel

                            control={<Checkbox value="remember" color="primary" defaultChecked />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                {role === 'admin' ? (
                                    <Link to="/admin/signup">Don't have an account? Sign Up as Admin</Link>
                                ) : (
                                    <Link to="/user/signup">Don't have an account? Sign Up as User</Link>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}