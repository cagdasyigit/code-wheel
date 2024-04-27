import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import styles from './Login.module.scss';
import bgImage from '../../resources/images/codewheel-bg.jpeg';
import logo from '../../resources/images/logo.png';
import github from '../../resources/images/github-logo.png';
import useAuthentication from '../../hooks/useAuthentication';
import Feedback from '../Feedback';

const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;

const Login = () => {
  const { loading, error } = useAuthentication();

  const handleLoginWithGithubClick = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`
    );
  };

  return (
    <Stack
      direction={'column'}
      justifyContent={'center'}
      className={styles.container}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={'center'}
        justifyContent={'center'}
        className={styles.innerBox}
      >
        <img src={bgImage} />
        <Box sx={{ textAlign: 'center' }}>
          <h1>
            Code Wheel <img src={logo} />
          </h1>
          <p>
            <i>Don&apos;t reinvent the wheel!</i>
          </p>
          <Button
            disabled={loading}
            size={'large'}
            variant={'contained'}
            color={'secondary'}
            onClick={handleLoginWithGithubClick}
          >
            <img src={github} />
            Login with GitHub
          </Button>
        </Box>
      </Stack>
      <Feedback open={!!error} message={error} autoHide={true} />
    </Stack>
  );
};

export default Login;
