import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Role } from '../types';

const pages = ['Manage', 'Add', 'Metrics'];
const guestPages = ['Login', 'Register'];

export const MobileMenu = ({
  anchorElNav,
  handleOpenNavMenu,
  handleCloseNavMenu,
  handleNavClick,
  authed,
  role
}: {
  anchorElNav: null | HTMLElement;
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseNavMenu: () => void;
  handleNavClick: (page: string) => void;
  authed: boolean;
  role: Role | null;
})=> {
  return (<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
    <IconButton
      size="large"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={handleOpenNavMenu}
      color="inherit"
    >
      <MenuIcon />
    </IconButton>
    <Menu
      id="menu-appbar"
      anchorEl={anchorElNav}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={Boolean(anchorElNav)}
      onClose={handleCloseNavMenu}
      sx={{
        display: { xs: 'block', md: 'none' },
      }}
    >
      {!authed ? (
        guestPages.map((page) => (
          <MenuItem key={page} onClick={() => handleNavClick(page)}>
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
        ))
      ) : (
        role === Role.Admin && pages.map((page) => (
          <MenuItem key={page} onClick={() => handleNavClick(page)}>
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
        ))
      )}
    </Menu>
  </Box>);
};