import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import styles from './Login.module.scss';
import bgImage from '../../resources/images/codewheel-bg.jpeg';
import logo from '../../resources/images/logo.png';
import github from '../../resources/images/github-logo.png';
import useAuthentication from '../../hooks/useAuthentication';
import Feedback from '../Feedback';

const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;

const Login = () => {
  const { loading, error } = useAuthentication();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleLoginWithGithubClick = () => {
    setButtonDisabled(true);
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`
    );
  };

  useEffect(() => {
    setButtonDisabled(false);
  }, [error]);

  return loading ? (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      sx={{ height: '100%', backgroundColor: '#ddd' }}
    >
      <h2>Loading</h2>
      <CircularProgress color={'warning'} />
    </Stack>
  ) : (
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
            disabled={buttonDisabled}
            size={'large'}
            variant={'contained'}
            color={'secondary'}
            onClick={handleLoginWithGithubClick}
          >
            {buttonDisabled ? (
              <CircularProgress sx={{ marginRight: '8px' }} />
            ) : (
              <img src={github} />
            )}
            Login with GitHub
          </Button>
        </Box>
      </Stack>
      <Feedback open={!!error} message={error} autoHide={true} />
    </Stack>
  );
};

export default Login;
