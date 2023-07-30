import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Grid } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';


export default function Footer() {
    return (
        <Box
            sx={{
                // position: 'absolute', //gandu
                // position: 'fixed', //stays
                // position: 'inherit', //kinda good
                // position: 'relative', // same as inherit
                // position: 'static', // same as inherit
                // position: 'sticky', //stays
                position: 'relative',
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" color="text.primary" gutterBottom>
                                About Us
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                We are SkillForge, dedicated to providing the best coaching service to our
                                students.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" color="text.primary" gutterBottom>
                                Contact Us
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                123 Main Street, Anytown, USA
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Email: SkillForge@gmail.com
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Phone: +1 234 567 8901
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" color="text.primary" gutterBottom>
                                Follow Us
                            </Typography>
                            <Link href="https://www.facebook.com/">
                                <Facebook />
                            </Link>
                            <Link href="https://www.instagram.com/" sx={{ pl: 1, pr: 1 }}>
                                <Instagram />
                            </Link>
                            <Link href="https://www.twitter.com/">
                                <Twitter />
                            </Link>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        <Typography variant="body2" color="text.secondary" align="center">
                            {"Copyright © "}
                            <Link color="inherit" href="https://your-website.com/">
                                SkillForge
                            </Link>{" "}
                            {new Date().getFullYear()}
                            {"."}
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box >
    );
}