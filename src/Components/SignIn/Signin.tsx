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
  CardContent, Grid, LockOutlinedIcon, createTheme, ThemeProvider
} from "../../common/Index"
import { Metamask } from '../../assets/Image';
import React from 'react'
const theme = createTheme();
export default function Signin() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth={false}
        className="container">
          <CssBaseline />
          <Grid container spacing={2} className="container_title">
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' }, pr: 10 }}>
              <Box >
                <Typography variant="h4" gutterBottom sx={{ color: "maroon", mb: 4 }}>
                  Welcome to the Financial Tracking System
                </Typography>
              </Box>
            </Grid>

            {/* Right Side - Sign Up Form */}
            <Grid item xs={12} md={4} sx={{ pl: 8 }} >
              <Card sx={{ p: 3 }}>
                <CardContent>
                  <Box className="main_box">
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign In
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
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
                        
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                          />
                        </Grid>
                        <Grid container justifyContent="flex-end">
                          <Grid item>
                            <Link href="/forgotPassword" variant="body2">
                              Forgot Password
                            </Link>
                          </Grid>
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
                        Sign In
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
                         className="Signup_metamask"
                        />
                        Sign In with Metamask
                      </Button>
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
  )
}
