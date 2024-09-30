import React from 'react';
import { Link, SearchIcon, IconButton, Button, Typography, Toolbar, AppBar, AccountCircleIcon, Menu, MenuItem } from "../../common/Index"

export default function Header() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="relative"
      sx={{
        borderBottom: '1px solid #ddd',
        background: '#1976d2;',
        backgroundBlendMode: 'screen',
      }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>

        <Typography
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, textDecoration: 'none', fontWeight: 700 }}
        >
          <Link href="/" color="inherit" underline="none">
            Financial Tracking
          </Link>
        </Typography>
        <nav>
          <Link
            variant="button"
            href="/addTransaction"
            sx={{ my: 1, mx: 1.5, textDecoration: 'none', color: "white", fontWeight: "bold" }}
          >
            Initiate Transaction
          </Link>
          <Link
            variant="button"
            href="/listTransaction"
            sx={{ my: 1, mx: 1.5, textDecoration: 'none', color: "white", fontWeight: "bold" }}
          >
            List Transaction
          </Link>
          <Link
            variant="button"
            href="/contactus"
            sx={{ my: 1, mx: 1.5, textDecoration: 'none', color: "white", fontWeight: "bold" }}
          >
            Contact
          </Link>
        </nav>
        <IconButton sx={{ ml: 1, color: "white" }}>
          <SearchIcon />
        </IconButton>
        <Button href="/signIn" sx={{ my: 1, mx: 1.5, color: "white", fontWeight: "bold" }}>
          SignIn
        </Button>
        <Button href="/signup" sx={{ my: 1, mx: 1.5, color: "white", fontWeight: "bold" }}>
          SignUp
        </Button>
        <Button sx={{ my: 1, mx: 1.5, color: "white", fontWeight: "bold" }}>
          <w3m-button />
        </Button>
        {auth && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem >
                <Link
                  variant="button"
                  href="/profile"
                  sx={{ my: 1, mx: 1.5, textDecoration: 'none', color: "black" }}
                >
                  Profile
                </Link> </MenuItem>
              <MenuItem onClick={handleClose}> <Button href="#" sx={{ my: 1, mx: 1.5, color: "black" }}>
                logOut
              </Button></MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
