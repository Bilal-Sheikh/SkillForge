import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../config';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import DarkMode from '../Features/DarkMode';


function Appbar() {

    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const role = window.location.pathname.split("/")[1]
    // console.log(role);

    const [anchorElUser, setAnchorElUser] = useState(null);


    useEffect(() => {
        try {
            axios.get(`${BASE_URL}/${role}/me`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then(res => {
                console.log(res.data.FirstName);
                setCurrentUser(res.data.FirstName)
                setIsLoading(false)
            })
        } catch (error) {

        }
    }, [])

    //UI
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
``

    if (currentUser) {
        return (
            <AppBar position="static" color='default'>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Grid container alignItems="center" justifyContent="space-between">
                            {/* Left section with SkillForge logo */}
                            <Grid item>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    href={`/${role}/menu`}
                                    sx={{
                                        mr: 2,
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}
                                >
                                    SkillForge
                                </Typography>
                            </Grid>

                            {/* Right section with options menu and DarkMode */}
                            <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                                <Tooltip title="Options">
                                    <IconButton onClick={handleOpenUserMenu}>
                                        {currentUser}
                                    </IconButton>
                                </Tooltip>

                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {role === 'user' && (
                                        <MenuItem onClick={() => { navigate("/user/showpurchased") }}>
                                            Purchases
                                        </MenuItem>
                                    )}

                                    {role === 'admin' && (
                                        <MenuItem onClick={() => navigate("/admin/addcourse")}>
                                            Add Course
                                        </MenuItem>
                                    )}

                                    <MenuItem onClick={() => {
                                        localStorage.clear();
                                        window.location = "/";
                                    }}>LogOut
                                    </MenuItem>
                                </Menu>

                                <DarkMode />
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
        );
    }

    return (
        <AppBar position="static" color='default'>

            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                SkillForge
                            </Typography>
                        </Grid>
                        <Grid item style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button style={{ color: 'black' }} variant='text' onClick={() => { navigate("/user/signup") }}>
                                SignUp
                            </Button>
                            <Button style={{ color: 'black' }} variant='text' onClick={() => { navigate("/user/signin") }}>
                                SignIn
                            </Button>
                            <Button style={{ color: 'black' }} variant='text' onClick={() => { navigate("/admin/signup") }}>
                                Teach at SkillForge
                            </Button>

                            {role === '' && <DarkMode />}
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );

}

export default Appbar;