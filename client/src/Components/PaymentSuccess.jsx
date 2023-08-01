import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

function PaymentSuccess() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const paymentID = searchParams.get('paymentID');
    const orderID = searchParams.get('orderID');
    const navigate = useNavigate();

    return (
        <Grid container spacing={0} style={{ marginTop: '100px', marginBottom: '400px' }}>
            <Grid item xs={12} md={12} lg={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography color={'green'} variant={"h3"} >Payment Successful 🎉 </Typography>
            </Grid>

            <Grid item xs={12} md={12} lg={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography>
                    Your Payment ID is: {paymentID}
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography>
                    Your order ID is: {orderID}
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button
                    variant="contained"
                    color='primary'
                    onClick={() => navigate('/user/showpurchased')}
                >   Go to Library
                </Button>
            </Grid>
        </Grid >
    );
}

export default PaymentSuccess;
