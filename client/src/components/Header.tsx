import { useUser } from "@/context/user.context";
import { isAuthenticated, logout } from "@/services/auth";
import { Role } from "@/types";
import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import LogoutIcon from '@mui/icons-material/Logout';
import Chip from '@mui/material/Chip';
import { MobileMenu } from "./MobileMenu";

const pages = ['Manage', 'Add', 'Metrics'];
const guestPages = ['Login', 'Register'];

export default function Header() {
  const { firstName, role } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const authed = isAuthenticated();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavClick = (page: string) => {
    handleCloseNavMenu();
    const routes: { [key: string]: string } = {
      'Manage': '/manage',
      'Add': '/create',
      'Metrics': '/metrics',
      'Login': '/login',
      'Register': '/register'
    };
    navigate(routes[page]);
  };

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BeachAccessIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Vacations
          </Typography>

          <MobileMenu
            anchorElNav={anchorElNav}
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
            handleNavClick={handleNavClick}
            authed={authed}
            role={role}
          />
          <BeachAccessIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Vacations
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {!authed ? (
              guestPages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleNavClick(page)}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    backgroundColor: isActive(page === 'Login' ? '/login' : '/register') ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                  }}
                >
                  {page}
                </Button>
              ))
            ) : (
              role === Role.Admin && pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleNavClick(page)}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    backgroundColor: isActive(
                      page === 'Manage' ? '/manage' :
                        page === 'Add' ? '/create' :
                          '/metrics'
                    ) ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                  }}
                >
                  {page}
                </Button>
              ))
            )}
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 3 }}>
            {authed ? (
              <>
                {role === Role.Admin && (
                  <Chip
                    label="ADMIN"
                    size="small"
                    sx={{
                      fontWeight: 'bold',
                      backgroundColor: '#e4cc43ff',
                      color: '#2c1f1fff'
                    }}
                  />
                )}
                <Typography variant="body1" sx={{ display: { xs: 'none', sm: 'block' } }}>
                  Hello {firstName}!
                </Typography>
                <Button
                  color="inherit"
                  onClick={onLogout}
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                Welcome
              </Typography>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
