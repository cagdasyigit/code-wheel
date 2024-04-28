import React from 'react';
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import logo from '../../resources/images/logo.png';
import { ReactComponent as Logout } from '../../resources/images/logout.svg';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import AuthStore from '../../stores/AuthStore';
import { MenuRounded } from '@mui/icons-material';

const Header = () => {
  const navigate = useNavigate();
  const user = AuthStore((state) => state.user);
  const [mobileMenuAnchor, setMobileMenuAnchor] =
    React.useState<null | HTMLElement>(null);
  const mobileMenuOpen = Boolean(mobileMenuAnchor);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    AuthStore.getState().logout();
    localStorage.setItem('token', '');
    navigate('/login');
  };

  const handleAvatarClick = () => {
    window.open(user?.html_url, '_blank');
  };

  return (
    <header className={styles.container}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems={'center'}>
          <img src={logo} />
          <span className={styles.brand}>Code Wheel</span>
        </Stack>

        {/* Desktop user menu */}
        <Stack
          direction={'row'}
          alignItems={'center'}
          className={styles.logout}
          gap={'16px'}
          display={{ xs: 'none', sm: 'flex' }}
        >
          <Avatar src={user?.avatar_url} onClick={handleAvatarClick} />
          <a href={user?.html_url} target={'_blank'} rel="noreferrer">
            {user?.name}
          </a>
          <Box onClick={handleLogout}>
            <span>Logout</span>
            <Logout />
          </Box>
        </Stack>

        {/* Mobile user menu */}
        <Box display={{ xs: 'block', sm: 'none' }}>
          <IconButton
            aria-label="more"
            id="user-button"
            aria-controls={mobileMenuOpen ? 'user-menu' : undefined}
            aria-expanded={mobileMenuOpen ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
          >
            <Typography variant={'subtitle2'}>{user?.name}</Typography>
            <MenuRounded sx={{ marginLeft: '8px' }} />
          </IconButton>
          <Menu
            id="user-menu"
            MenuListProps={{
              'aria-labelledby': 'user-button',
            }}
            anchorEl={mobileMenuAnchor}
            open={mobileMenuOpen}
            onClose={handleMobileMenuClose}
          >
            <MenuItem onClick={handleAvatarClick}>
              GitHub Profile{' '}
              <Avatar
                src={user?.avatar_url}
                sx={{ width: 32, height: 32, marginLeft: '8px' }}
              />
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              Logout&nbsp;
              <Logout />
            </MenuItem>
          </Menu>
        </Box>
      </Stack>
    </header>
  );
};

export default Header;
