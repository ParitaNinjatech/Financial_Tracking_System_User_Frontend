import  { useState } from 'react';
import {
    Button,
    CssBaseline,
    TextField,
    Box,
    Typography,
    Container,
    Card,
    Grid,
    createTheme,
    ThemeProvider,
    FormControl
} from "../../common/Index";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import './ContactUs.css'

const theme = createTheme();

export default function ContactUs() {
    const [phoneNumber, setPhoneNumber] = useState('');
    return (
        <ThemeProvider theme={theme}>
            <Container
                component="main"
                maxWidth={false}
                className='container'
            >
                <CssBaseline />

                <Grid item xs={10} md={6} sx={{ pl: 6, marginTop: "-110px", width: "65%" }}>
                    <Card sx={{ p: 1 }}>
                        <Box sx={{ bgcolor: 'dimgrey', color: '#fff', p: 4, textAlign: 'center' }}>
                            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                                Get in Touch
                            </Typography>
                            <Typography variant="body1">
                                Fill up the form to get in touch with us.
                            </Typography>
                        </Box>
                        <Grid container spacing={4}>
                            <Grid item xs={10} md={7}>
                                <Box sx={{ p: 4 }}>
                                    <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                                        Fill the Form*
                                    </Typography>
                                    <form noValidate autoComplete="off">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    required
                                                    label="Name"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>

                                                <FormControl fullWidth variant="outlined">
                                                    <PhoneInput
                                                        country={'us'}
                                                        value={phoneNumber}
                                                        onChange={setPhoneNumber}
                                                        inputProps={{
                                                            name: 'phone',
                                                            required: true,
                                                            id: 'phoneNumber',
                                                        }}
                                                        containerStyle={{
                                                            width: '100%',
                                                        }}
                                                        inputStyle={{
                                                            height: '56px',
                                                            width: '100%',
                                                            borderRadius: '4px',
                                                        }}
                                                    />
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    required
                                                    label="Email"
                                                    variant="outlined"
                                                    type="email"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    required
                                                    label="Subject"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    required
                                                    label="Message"
                                                    variant="outlined"
                                                    multiline
                                                    rows={4}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            sx={{ mt: 3, mb: 2, px: 5 }}
                                        >
                                            SEND MESSAGE
                                        </Button>
                                    </form>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={5} sx={{ bgcolor: '#009BE5', color: '#fff', p: 4, mt: { xs: 0, md: 4 } }}>
                                <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                                    Reach Us
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    <strong>Email:</strong> contact@msijanakpuri.com
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    <strong>Phone:</strong> +91 011-45656183
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    <strong>Address:</strong> Maharaja Surajmal Institute, C-4, Janakpuri, Delhi - 110058, India
                                </Typography>
                                <Box sx={{ mt: 3 }}>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14007.09774743033!2d77.0517516363513!3d28.62167723793448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0361b6b7a313%3A0x8f14a7c91561b4c7!2sMaharaja%20Surajmal%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1617790510874!5m2!1sen!2sin"
                                        width="100%"
                                        height="200"
                                        style={{ border: 0 }}
                                        allowFullScreen={true}
                                        loading="lazy"
                                        title="Maharaja Surajmal Institute"
                                    ></iframe>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>

                {/* </Grid> */}
            </Container>
        </ThemeProvider>
    );
}
