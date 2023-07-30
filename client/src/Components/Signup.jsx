import { styled } from '@mui/material/styles';
import { useRef } from 'react';
import { BASE_URL } from '../config';
import { Link, useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import CustomSnackbar from '../Features/CustomSnackbar';
import circleScatterAdmin from '../assets/polygon-scatter-admin.svg';
import circleScatterUser from '../assets/circle-scatter-user.svg';


export default function Signup() {

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
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password')
        // });
        const data = new FormData(event.currentTarget);

        // Email validation using regular expression
        const FirstName = data.get('firstName');
        const LastName = data.get('lastName');
        const email = data.get('email');
        const password = data.get('password');

        const emailRegex = /[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?/;

        if (FirstName.length === 0) {
            customSnackbarRef.current.handleSnackbarOpen('error', 'First Name is required.');
            return;
        }
        if (LastName.length === 0) {
            customSnackbarRef.current.handleSnackbarOpen('error', 'Last Name is required.');
            return;
        }
        if (!emailRegex.test(email)) {
            customSnackbarRef.current.handleSnackbarOpen('error', 'Invalid email format.');
            return;
        }
        // Password length check
        if (password.length < 8) {
            customSnackbarRef.current.handleSnackbarOpen('error', 'Password should be at least 8 characters long.');
            return;
        }

        if (role === 'admin') {
            try {
                const response = await axios.post(`${BASE_URL}/admin/signup`, {
                    email: email,
                    password: password,
                    FirstName: FirstName,
                    LastName: LastName
                })
                localStorage.setItem("token", response.data.token)
                customSnackbarRef.current.handleSnackbarOpen('success', 'Success');
                window.location = `/${role}/menu`
            } catch (error) {
                if (error.response.data.message === "Admin already exists") {
                    customSnackbarRef.current.handleSnackbarOpen('error', 'Admin already exists.');
                }
            }
        } else if (role === 'user') {
            try {
                const response = await axios.post(`${BASE_URL}/user/signup`, {
                    email: email,
                    password: password,
                    FirstName: FirstName,
                    LastName: LastName
                })
                localStorage.setItem("token", response.data.token)
                customSnackbarRef.current.handleSnackbarOpen('success', 'Success');
                window.location = `/${role}/menu`
            } catch (error) {
                if (error.response.data.message === "User already exists") {
                    customSnackbarRef.current.handleSnackbarOpen('error', 'User already exists.');
                }
            }
        }
    }

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
                    <Typography component="h1" variant="h5" color={'white'}>
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <CustomTextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    InputLabelProps={{ style: { color: 'white' } }}
                                    InputProps={{ style: { color: 'white' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomTextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    InputLabelProps={{ style: { color: 'white' } }}
                                    InputProps={{ style: { color: 'white' } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomTextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    InputLabelProps={{ style: { color: 'white' } }}
                                    InputProps={{ style: { color: 'white' } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomTextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    InputLabelProps={{ style: { color: 'white' } }}
                                    InputProps={{ style: { color: 'white' } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                {role === 'admin' ? (
                                    <Link to="/admin/signin">Already have an account? Sign in as Admin</Link>
                                ) : (
                                    <Link to="/user/signin">Already have an account? Sign in as User</Link>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}