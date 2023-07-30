import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {

    const navigate = useNavigate()

    return (
        <Grid container sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
        }}>
            <Grid>
                <Typography variant="h1">
                    404 Unauthorized
                </Typography>
                <Typography variant="h6">
                    You don't have access to this page
                </Typography>
                <Button variant="contained" onClick={() => navigate('/')}> Back Home </Button>
            </Grid>
            <Grid>

            </Grid>
        </Grid>
    );
}