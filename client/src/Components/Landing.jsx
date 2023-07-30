import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import lowpolygridlight from '../assets/low-poly-grid-light.svg';
import lowpolygriddark from '../assets/low-poly-grid-dark.svg';

function Landing() {
    const [currentTheme, setCurrentTheme] = useState(
        localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    );

    useEffect(() => {
        const handleThemeChange = (e) => {
            setCurrentTheme(e.matches ? 'dark' : 'light');
        };

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', handleThemeChange);

        return () => {
            mediaQuery.removeEventListener('change', handleThemeChange);
        };
    }, []);

    return (
        <div
            style={{
                backgroundImage: `url(${currentTheme === 'dark' ? lowpolygriddark : lowpolygridlight})`,
                backgroundSize: 'cover',
                height: '91.2vh',
            }}
        >
            <div>
                <Grid container justifyContent="center" alignItems="center">

                    <Grid item>
                        <Typography variant="h1" style={{ marginTop: '70px' }}>Welcome to</Typography>
                    </Grid>

                    <Grid item style={{ marginLeft: '20px' }}>
                        <Typography variant="h1" style={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            marginTop: '70px'
                        }}>SkillForge
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </div >
    )
}

export default Landing