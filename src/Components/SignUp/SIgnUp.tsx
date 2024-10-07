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
    ThemeProvider, FormControl, LockOutlinedIcon, axios, ToastContainer, toast
} from "../../common/Index";
import PhoneInput from 'react-phone-input-2';
import { Backend_EndPoint } from '../Constant/EndPoints';
import 'react-phone-input-2/lib/style.css';
import "./SignUp.css";
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
    const [allowExtraEmails, setAllowExtraEmails] = useState<boolean>(false);
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        walletAddress: '',
        checkbox: ''
    });

    const validateForm = (): boolean => {
        let tempErrors = { ...errors };
        let isValid = true;

        const usernameRegex = /^[a-zA-Z0-9]{6,16}$/;
        if (!username || !usernameRegex.test(username)) {
            tempErrors.username = 'Username must contain only letters and numbers, and be between 6 to 16 characters long';
            isValid = false;
        } else {
            tempErrors.username = '';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            tempErrors.email = 'Enter a valid email address';
            isValid = false;
        } else {
            tempErrors.email = '';
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,12}$/;
        if (!password || !passwordRegex.test(password)) {
            tempErrors.password = 'Password must be 6-12 characters long and include at least one letter, one number, and one special character';
            isValid = false;
        } else {
            tempErrors.password = '';
        }

        if (password !== confirmPassword) {
            tempErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        } else {
            tempErrors.confirmPassword = '';
        }

        if (!phoneNumber || phoneNumber.length <= 10) {
            tempErrors.phoneNumber = 'Enter a valid phone number';
            isValid = false;
        } else {
            tempErrors.phoneNumber = '';
        }

        if (!walletAddress) {
            tempErrors.walletAddress = 'Wallet Address is required';
            isValid = false;
        } else {
            tempErrors.walletAddress = '';
        }

        if (!allowExtraEmails) {
            tempErrors.checkbox = 'You must agree to the terms of service.';
            isValid = false;
        } else {
            tempErrors.checkbox = '';
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAllowExtraEmails(event.target.checked);
        if (event.target.checked) {
            setErrors(prevErrors => ({ ...prevErrors, checkbox: '' }));
        }
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm()) {
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
                    toast.success("Agent Added Registration Request Successfully");
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
                setIsLoading(false);
            }
        } else {
            toast.error("Please correct the form errors");
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
                                                    error={Boolean(errors.username)}
                                                    helperText={errors.username}
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
                                                    error={Boolean(errors.email)}
                                                    helperText={errors.email}
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
                                                    error={Boolean(errors.password)}
                                                    helperText={errors.password}
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
                                                    error={Boolean(errors.confirmPassword)}
                                                    helperText={errors.confirmPassword}
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
                                                {errors.phoneNumber && (
                                                    <Typography color="error" variant="body2">
                                                        {errors.phoneNumber}
                                                    </Typography>
                                                )}
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
                                                    error={Boolean(errors.walletAddress)}
                                                    helperText={errors.walletAddress}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={allowExtraEmails}
                                                            onChange={handleCheckboxChange}
                                                            color="primary"
                                                        />
                                                    }
                                                    label="I agree to all statements in Terms of service."
                                                    required
                                                />
                                                {errors.checkbox && <Typography color="error">{errors.checkbox}</Typography>} {/* Error message */}
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
