import React, { useState } from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography, EditIcon, IconButton, TextField, Button } from '../../common/Index';
import './Profile.css';
import {Dog} from "../../assets/Image"

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: 'Johnathan Doe',
        email: 'johnathan@admin.com',
        password: '*********',
        phone: '123 456 7890',
        Address: 'Lorem ipsum dolor sit amet.',
        WalletAddress: "0xfC11F0080C6fA8b3F7caE4C5fb9f83BBbcb96197",
        postCode: "382330",
        City: "Ahmedabad"
    });

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = () => {
        console.log('Updated data:', formData);
        setIsEditing(false);
    };
    return (
        <Box className="background-image">
            <Typography variant="h4" className="profile-title">Profile</Typography>

            <Box className="profile-container">
                <Grid container spacing={2} className="profile-content">

                    {/* Left Side - User Info */}
                    <Grid item xs={12} md={4}>
                        <Card className="profile-card">
                            <CardContent>
                                <Box className="avatar-section">
                                    <Avatar
                                        alt="User Name"
                                        src={Dog}
                                        className="avatar-image"
                                        sx={{ width: 100, height: 100 }}
                                    />
                                    <Typography variant="h6" className="user-name">User Name</Typography>
                                    <Typography variant="body2" className="user-email">info@myadmin.com</Typography>
                                </Box>

                                <Box className="social-stats">
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item>
                                            <Box className="social-box">
                                                <Typography variant="h6">258</Typography>
                                                <Typography variant="caption">Facebook</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Box className="social-box">
                                                <Typography variant="h6">125</Typography>
                                                <Typography variant="caption">Twitter</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Box className="social-box">
                                                <Typography variant="h6">556</Typography>
                                                <Typography variant="caption">Dribble</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right Side - User Details */}
                    <Grid item xs={12} md={6}>
                        <Card className="details-card">
                            <CardContent>
                                {/* Icon Button to Toggle Edit Mode */}
                                <IconButton onClick={handleEditClick} className="edit-icon">
                                    <EditIcon />
                                </IconButton>

                                {/* Full Name */}
                                <Box className="details-section">
                                    <Typography variant="h6">Full Name</Typography>
                                    <TextField
                                        fullWidth
                                        name="fullName"
                                        value={formData.fullName}
                                        variant="outlined"
                                        size="small"
                                    />

                                </Box>

                                {/* Email */}
                                <Box className="details-section">
                                    <Typography variant="h6">Email</Typography>

                                    <TextField
                                        fullWidth
                                        name="email"
                                        value={formData.email}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Box>

                                {/* Password */}
                                <Box className="details-section">
                                    <Typography variant="h6">Password</Typography>

                                    <TextField
                                        fullWidth
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        variant="outlined"
                                        size="small"
                                    />

                                </Box>

                                {/* Phone Number */}
                                <Box className="details-section">
                                    <Typography variant="h6">Phone No</Typography>

                                    <TextField
                                        fullWidth
                                        name="phone"
                                        value={formData.phone}
                                        variant="outlined"
                                        size="small"
                                    />

                                </Box>

                                <Box className="details-section">
                                    <Typography variant="h6">Address</Typography>

                                    <TextField
                                        fullWidth
                                        name="Address"
                                        value={formData.Address}
                                        variant="outlined"
                                        size="small"
                                    />

                                </Box>

                                <Box className="details-section">
                                    <Typography variant="h6">Wallet Address</Typography>

                                    <TextField
                                        fullWidth
                                        name="Wallet Address"
                                        value={formData.WalletAddress}
                                        variant="outlined"
                                        size="small"
                                    />

                                </Box>


                                {isEditing && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleUpdate}
                                        className="update-button"
                                    >
                                        Update
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>




                </Grid>
            </Box>
        </Box>
    );
};

export default Profile;
