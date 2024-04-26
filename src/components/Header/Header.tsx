import React from 'react';
import { Box, Stack } from '@mui/material';
import logo from '../../resources/images/logo.png';
import { ReactComponent as Logout } from '../../resources/images/logout.svg';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import AuthStore from '../../stores/AuthStore';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthStore.getState().logout();
    localStorage.setItem('token', '');
    navigate('/login');
  };

  return (
    <header className={styles.container}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems={'center'}>
          <img src={logo} width={48} />
          <span className={styles.brand}>Code Wheel</span>
        </Stack>
        <Box onClick={handleLogout} className={styles.logout}>
          <span>Logout</span>
          <Logout />
        </Box>
      </Stack>
    </header>
  );
};

export default Header;
