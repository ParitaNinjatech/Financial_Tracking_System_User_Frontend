import React from "react";
import { Box, Grid, Link, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./Footer.css";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "aliceblue",
        py: 6,
        px: 2,
      }}
    >
      <Grid container spacing={4} className="first_grid">
        {/* Logo and Social Links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Financial Tracking
          </Typography>
        </Grid>

        {/* Company Links */}
        <Grid item xs={12} md={3} className="second_grid">
          <Link
            href="#"
            variant="body2"
            color="textPrimary"
            display="block"
            sx={{ mb: 3 }}
          >
            About
          </Link>
          <Link
            href="#"
            variant="body2"
            color="textPrimary"
            display="block"
            sx={{ mb: 3 }}
          >
            Blog
          </Link>
          <Link
            href="#"
            variant="body2"
            color="textPrimary"
            display="block"
            sx={{ mb: 3 }}
          >
            Customers
          </Link>
          <Link
            href="#"
            variant="body2"
            color="textPrimary"
            display="block"
            sx={{ mb: 3 }}
          >
            Hire us
          </Link>
          <Link href="#" variant="body2" color="textPrimary" display="block">
            FAQs
          </Link>
        </Grid>

        <Box sx={{ marginTop: "24px" }}>
          <IconButton color="inherit" href="https://facebook.com">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" href="https://twitter.com">
            <TwitterIcon />
          </IconButton>
          <IconButton color="inherit" href="https://linkedin.com">
            <LinkedInIcon />
          </IconButton>
          <IconButton color="inherit" href="https://github.com">
            <GitHubIcon />
          </IconButton>
        </Box>
      </Grid>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ mt: 2, textAlign: "center" }}
      >
        © 2024 Pixinvent
      </Typography>
    </Box>
  );
}
