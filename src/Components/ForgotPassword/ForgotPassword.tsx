import React, { useState } from 'react'
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
    LockOutlinedIcon,
    createTheme,
    ThemeProvider,
    ToastContainer,
    toast,
    axios
} from "../../common/Index"
import { Backend_EndPoint } from '../Constant/EndPoints';
import 'react-toastify/dist/ReactToastify.css';
import "./ForgotPassword.css"
const theme = createTheme();

function ForgotPassword() {
    const [email, setEmail] = useState<string>('')
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [allowExtraEmails, setAllowExtraEmails] = useState<boolean>(false);
    const [errors, setErrors] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
        checkbox: ''
    });

    const validateForm = (): boolean => {
        let tempErrors = { ...errors };
        let isValid = true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            tempErrors.email = 'Enter a valid email address';
            isValid = false;
        } else {
            tempErrors.email = '';
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,12}$/;
        if (!oldPassword || !passwordRegex.test(oldPassword)) {
            tempErrors.oldPassword = 'Password must be 6-12 characters long and include at least one letter, one number, and one special character';
            isValid = false;
        } else {
            tempErrors.oldPassword = '';
        }

        if (oldPassword == newPassword) {
            tempErrors.newPassword = 'Old and New Password Same';
            isValid = false;
        } else {
            tempErrors.newPassword = '';
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

    const forgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setIsloading(true);
            if (validateForm()) {
                const payload = {
                    email: email,
                    newPassword: newPassword
                }
                const response = await axios.post(`${Backend_EndPoint}api/v1/user/forgot-password`, payload, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                if (response.status === 200) {
                    toast.success("Agent Change Password SuccessFully")

                    setTimeout(() => {
                        window.location.href = '/signIn';
                    }, 3000);
                }

            }
        }
        catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.error || "An error occurred");
            } else {
                toast.error("An unexpected error occurred");
            }

        } finally {
            setIsloading(false)
        }
    }
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
                            <Typography variant="h4" gutterBottom sx={{ color: "maroon", mb: 4 }}>
                                Welcome to the Financial Tracking System
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Right Side - Forgot Password Form */}
                    <Grid item xs={12} md={4} sx={{ pl: 8 }}>
                        <Card sx={{ p: 3 }}>
                            <CardContent>
                                <Box
                                    className='main_box'
                                >
                                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Forgot Password
                                    </Typography>
                                    <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={forgotPassword}>
                                        <Grid container spacing={2}>
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
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="password"
                                                    label="Old Password"
                                                    type="password"
                                                    id="password"
                                                    autoComplete="current-password"
                                                    value={oldPassword}
                                                    onChange={(e) => setOldPassword(e.target.value)}
                                                    error={Boolean(errors.oldPassword)}
                                                    helperText={errors.oldPassword}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="password"
                                                    label="Password"
                                                    type="password"
                                                    id="password"
                                                    autoComplete="new-password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    error={Boolean(errors.newPassword)}
                                                    helperText={errors.newPassword}
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
                                            className='forgotPassword-button'
                                        >
                                            {isLoading ? (<span className="loader"></span>) : ("Forgot Password")}
                                        </Button>
                                        <Grid container justifyContent="flex-end">
                                            <Grid item>
                                                <Link href="/signIn" variant="body2">
                                                    Back to Login
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

export default ForgotPassword;
