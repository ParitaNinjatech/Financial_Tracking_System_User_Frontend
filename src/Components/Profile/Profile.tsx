import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
  Link,
  ToastContainer,
  toast,
  axios,
} from "../../common/Index";
import { jwtDecode } from "jwt-decode";
import { Dog } from "../../assets/Image";
import { Backend_EndPoint } from "../Constant/EndPoints";
import "./Profile.css";
import "react-toastify/dist/ReactToastify.css";

interface formdata {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  walletAddress: string;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<formdata>({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    walletAddress: "",
  });
  const [formErrors, setFormErrors] = useState<formdata>({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    walletAddress: "",
  });
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
  const token = localStorage.getItem("jwtToken");

  const usernameRegex = /^[a-zA-Z0-9]{3,16}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  const walletAddressRegex = /^0x[a-fA-F0-9]{40}$/;

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate input
    switch (name) {
      case "username":
        setFormErrors({
          ...formErrors,
          username: usernameRegex.test(value)
            ? ""
            : "Username must be 3-16 characters long and alphanumeric.",
        });
        break;
      case "email":
        setFormErrors({
          ...formErrors,
          email: emailRegex.test(value) ? "" : "Invalid email format.",
        });
        break;
      case "phoneNumber":
        setFormErrors({
          ...formErrors,
          phoneNumber: phoneRegex.test(value)
            ? ""
            : "Invalid phone number format.",
        });
        break;
      case "walletAddress":
        setFormErrors({
          ...formErrors,
          walletAddress: walletAddressRegex.test(value)
            ? ""
            : "Invalid wallet address format.",
        });
        break;
      default:
        break;
    }
  };

  const handleUpdate = async () => {
    // Check for validation errors before submitting
    if (
      !formErrors.username &&
      !formErrors.email &&
      !formErrors.phoneNumber &&
      !formErrors.walletAddress
    ) {
      try {
        setIsUpdateLoading(true);
        if (token) {
          const user: any = jwtDecode(token);
          const payload = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            walletAddress: formData.walletAddress,
          };
          const response = await axios.put(
            `${Backend_EndPoint}api/v1/user/${user.userId}`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            },
          );
          if (response.status === 200) {
            toast.success("Profile updated successfully");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        }
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.error || "An error occurred");
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setIsUpdateLoading(false);
        setIsEditing(false);
      }
    } else {
      toast.error("Please correct the errors in the form before updating.");
    }
  };

  const getUserData = async () => {
    try {
      if (token) {
        const user: any = jwtDecode(token);
        const response = await axios.get(
          `${Backend_EndPoint}api/v1/user/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        const { username, email, password, phoneNumber, walletAddress } =
          response.data;
        setFormData({ username, email, password, phoneNumber, walletAddress });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  return (
    <Box className="background-image">
      <Typography variant="h4" className="profile-title">
        Profile
      </Typography>

      <Box className="profile-container">
        <Grid container spacing={2} className="profile-content">
          <ToastContainer />
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
                  <Typography variant="h6" className="user-name">
                    {formData.username}
                  </Typography>
                  <Typography variant="body2" className="user-email">
                    {formData.email}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Side - User Details */}
          <Grid item xs={12} md={6}>
            <Card className="details-card">
              <CardContent>
                <IconButton onClick={handleEditClick} className="edit-icon">
                  <span className="edit-icon-placeholder">✎</span>{" "}
                  {/* Replace with EditIcon */}
                </IconButton>

                {/* Username */}
                <Box className="details-section">
                  <Typography variant="h6">UserName</Typography>
                  <TextField
                    fullWidth
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    error={!!formErrors.username}
                    helperText={formErrors.username}
                    variant="outlined"
                    size="small"
                    disabled={!isEditing}
                  />
                </Box>

                {/* Email */}
                <Box className="details-section">
                  <Typography variant="h6">Email</Typography>
                  <TextField
                    fullWidth
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    variant="outlined"
                    size="small"
                    disabled={!isEditing}
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
                    disabled
                  />
                  <Link
                    href="/forgotpassword"
                    variant="body2"
                    sx={{ marginLeft: "82%" }}
                  >
                    Forgot Password
                  </Link>
                </Box>

                {/* Phone Number */}
                <Box className="details-section">
                  <Typography variant="h6">Phone No</Typography>
                  <TextField
                    fullWidth
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    error={!!formErrors.phoneNumber}
                    helperText={formErrors.phoneNumber}
                    variant="outlined"
                    size="small"
                    disabled={!isEditing}
                  />
                </Box>

                {/* Wallet Address */}
                <Box className="details-section">
                  <Typography variant="h6">Wallet Address</Typography>
                  <TextField
                    fullWidth
                    name="walletAddress"
                    value={formData.walletAddress}
                    onChange={handleInputChange}
                    error={!!formErrors.walletAddress}
                    helperText={formErrors.walletAddress}
                    variant="outlined"
                    size="small"
                    disabled={!isEditing}
                  />
                </Box>

                {isEditing && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdate}
                    className="update-button"
                    sx={{ marginTop: "20px" }}
                  >
                    {isUpdateLoading ? (
                      <span className="loader"></span>
                    ) : (
                      "Update"
                    )}
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
