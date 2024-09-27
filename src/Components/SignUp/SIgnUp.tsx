import React, { useState } from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Box,
    Typography,
    Container,
    Card,
    CardContent,
    Grid,
    createTheme,
    ThemeProvider, FormControl
} from "../../common/Index";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; 
import { Metamask} from '../../assets/Image';
import "./SignUp.css";

const theme = createTheme();

export default function SignUp() {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
            phone: phoneNumber, 
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container
                component="main"
                maxWidth={false}
                className='container'
            >
                <CssBaseline />
                <Grid container spacing={2} className='container_title'>
                    <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' }, pr: 10 }}>
                        <Box>
                            <Typography variant="h4" gutterBottom sx={{ mb: 5}} className='title'>
                                Welcome to the Financial Tracking System
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Right Side - Sign Up Form */}
                    <Grid item xs={12} md={4} sx={{ pl: 8 }}>
                        <Card sx={{ p: 3 }}>
                            <CardContent>
                                <Box className="main_box">
                                    <div className='avatar_div'>
                                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                            <LockOutlinedIcon />
                                        </Avatar>
                                        <Typography component="h1" variant="h5" className='Signup_h1'>
                                            Sign Up
                                        </Typography>
                                    </div>

                                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    autoComplete="given-name"
                                                    name="firstName"
                                                    required
                                                    fullWidth
                                                    id="firstName"
                                                    label="First Name"
                                                    autoFocus
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="lastName"
                                                    label="Last Name"
                                                    name="lastName"
                                                    autoComplete="family-name"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="userName"
                                                    label="User Name"
                                                    name="username"
                                                    autoComplete="username"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="email"
                                                    label="Email Address"
                                                    name="email"
                                                    autoComplete="email"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    autoComplete="Password"
                                                    name="Password"
                                                    required
                                                    fullWidth
                                                    id="Password"
                                                    label="Password"
                                                    autoFocus
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="Confirm Password"
                                                    label="Confirm Password"
                                                    name="Confirm Password"
                                                    autoComplete="Confirm Password"
                                                />
                                            </Grid>

                                            <Grid item xs={12}>

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

                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="Residential Address"
                                                    label="Residential Address"
                                                    type="Residential Address"
                                                    id="Residential Address"
                                                    autoComplete="Residential Address"
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    autoComplete="City"
                                                    name="City"
                                                    required
                                                    fullWidth
                                                    id="City"
                                                    label="City"
                                                    autoFocus
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="postcode"
                                                    label="Post Code"
                                                    name="Post Code"
                                                    autoComplete="Post-code"
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="Wallet Address"
                                                    label="Wallet Address"
                                                    type="Wallet Address"
                                                    id="Wallet Address"
                                                    autoComplete="Wallet Address"
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <FormControlLabel
                                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                                    label="I agree all statements in Terms of service."
                                                />
                                            </Grid>
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2, borderRadius: "26px" }}
                                            className='signUp-button'
                                        >
                                            Sign Up
                                        </Button>

                                        <Button
                                            type="button"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2}}
                                            className="signup_button_metamask signUp-button"
                                        >
                                            <Box
                                                component="img"
                                                src={Metamask}
                                                alt="Metamask Logo"
                                                className='Signup_metamask'
                                            />
                                            Sign Up with Metamask
                                        </Button>
                                        <Grid container justifyContent="flex-end">
                                            <Grid item>
                                                <Link href="/signIn" variant="body2">
                                                    Already have an account? Sign in
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Container>
        </ThemeProvider>
    );
}
