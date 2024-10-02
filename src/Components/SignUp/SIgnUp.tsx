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
import { Metamask } from '../../assets/Image';
import "./SignUp.css";
import axios from 'axios';
import { Backend_EndPoint } from '../Constant/EndPoints';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const theme = createTheme();

export default function SignUp() {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [username, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('')
    const [password, setPassWord] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [walletAddress, setWalletAddress] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const payload = {
                username: username,
                password: password,
                email: email,
                phoneNumber: phoneNumber,
                walletAddress: walletAddress,
                role: "Agent",
                isApproved:false
            }

            const response = await axios.post(`${Backend_EndPoint}api/v1/user/registration-request`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 201) {
                toast.success("Agent Registered Successfully");
                setTimeout(() => {
                    window.location.href = '/signIn';
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.error || "An error occurred");
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container
                component="main"
                maxWidth={false}
                className='container'
            >
                <CssBaseline />
                <ToastContainer />
                <Grid container spacing={2} className='container_title'>
                    <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' }, pr: 10 }}>
                        <Box>
                            <Typography variant="h4" gutterBottom sx={{ mb: 5 }} className='title'>
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
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="userName"
                                                    label="User Name"
                                                    name="username"
                                                    autoComplete="username"
                                                    value={username}
                                                    onChange={(e) => setUserName(e.target.value)}
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
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="password"
                                                    label="Password"
                                                    type="password"
                                                    id="password"
                                                    autoComplete="new-password"
                                                    value={password}
                                                    onChange={(e) => setPassWord(e.target.value)}
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
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                                                    name="Wallet Address"
                                                    label="Wallet Address"
                                                    type="Wallet Address"
                                                    id="Wallet Address"
                                                    autoComplete="Wallet Address"
                                                    value={walletAddress}
                                                    onChange={(e) => setWalletAddress(e.target.value)}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <FormControlLabel
                                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                                    label="I agree all statements in Terms of service."
                                                    required
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
                                            {isLoading ? (<span className="loader"></span>) : (
                                                "Sign Up"
                                            )}
                                        </Button>

                                        {/* <Button
                                            type="button"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            className="signup_button_metamask signUp-button"
                                        >
                                            <Box
                                                component="img"
                                                src={Metamask}
                                                alt="Metamask Logo"
                                                className='Signup_metamask'
                                            />
                                            Sign Up with Metamask
                                        </Button> */}
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
