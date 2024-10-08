import React, { useState } from "react";
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
  axios,
} from "../../common/Index";
import { Backend_EndPoint } from "../Constant/EndPoints";
import "react-toastify/dist/ReactToastify.css";
import { Key } from "@mui/icons-material";

const theme = createTheme();

export default function Signin() {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allowExtraEmails, setAllowExtraEmails] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    checkbox: "",
  });

  const validateUsernameOrEmail = (value: string) => {
    const usernameRegex = /^[a-zA-Z0-9]{6,16}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Please enter a username or email",
      }));
    } else if (!emailRegex.test(value) && !usernameRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username:
          "Username must be 6-16 characters long (letters and numbers only) or a valid email address",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "",
      }));
    }
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!username && (!value || !emailRegex.test(value))) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Enter a valid email address",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }
  };

  const validatePassword = (value: string) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,12}$/;
    if (!value || !passwordRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password must be 6-12 characters long and include at least one letter, one number, and one special character",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }
  };

  const validateCheckbox = (isChecked: boolean) => {
    if (!isChecked) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        checkbox: "You must agree to the terms of service.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        checkbox: "",
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateUsernameOrEmail(username);
    validateEmail(email);
    validatePassword(password);
    validateCheckbox(allowExtraEmails);

    if (errors.username || errors.email || errors.password || errors.checkbox) {
      toast.error("Please correct the form errors");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        key: username,
        password: password,
        role: "Agent",
      };

      const response = await axios.post(
        `${Backend_EndPoint}api/v1/user/login`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        toast.success("Agent Login SuccessFully");
        localStorage.setItem("jwtToken", response.data.token);

        setTimeout(() => {
          window.location.href = "/addTransaction";
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
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllowExtraEmails(event.target.checked);
    validateCheckbox(event.target.checked);
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    validateUsernameOrEmail(e.target.value);

    if (e.target.value !== "") {
      setEmail("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth={false} className="container">
          <CssBaseline />
          <ToastContainer />
          <Grid container spacing={2} className="container_title">
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: { xs: "none", md: "block" }, pr: 10 }}
            >
              <Box>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ color: "maroon", mb: 4 }}
                >
                  Welcome to the Financial Tracking System
                </Typography>
              </Box>
            </Grid>

            {/* Right Side - Sign In Form */}
            <Grid item xs={12} md={4} sx={{ pl: 8 }}>
              <Card sx={{ p: 3 }}>
                <CardContent>
                  <Box className="main_box">
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign In
                    </Typography>
                    <Box
                      component="form"
                      noValidate
                      sx={{ mt: 3 }}
                      onSubmit={handleSubmit}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="userName"
                            label="User Name"
                            name="username"
                            autoComplete="off"
                            value={username}
                            onChange={handleUserNameChange}
                            error={Boolean(errors.username && !email)}
                            helperText={
                              errors.username && !email ? errors.username : ""
                            }
                          />
                        </Grid>

                        {/* <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={handleEmailChange}
                            disabled={!!username}
                            error={Boolean(errors.email && !username)}
                            helperText={errors.email && !username ? errors.email : ''}
                          />
                        </Grid> */}

                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="off"
                            value={password}
                            onChange={handlePasswordChange}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                          />
                        </Grid>
                        <Grid container justifyContent="flex-end">
                          <Grid item>
                            <Link href="/forgotpassword" variant="body2">
                              Forgot Password
                            </Link>
                          </Grid>
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
                          {errors.checkbox && (
                            <Typography color="error">
                              {errors.checkbox}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                      {isLoading ? (
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2, borderRadius: "26px" }}
                          className="signUp-button"
                        >
                          <span className="loader"></span>
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2, borderRadius: "26px" }}
                          className="signUp-button"
                        >
                          Sign In
                        </Button>
                      )}

                      {/* <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, display: 'flex', alignItems: 'center', borderRadius: "26px" }}
                        className="signUp-button"
                      >
                        <Box
                          component="img"
                          src={Metamask}
                          alt="Metamask Logo"
                          sx={{ width: '24px', height: '24px', marginRight: '8px' }}
                        />
                        Sign In with Metamask
                      </Button> */}
                      <Grid container justifyContent="flex-end">
                        <Grid item>
                          <Link href="/signup" variant="body2">
                            Don't have an account? Register here
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
    </>
  );
}
