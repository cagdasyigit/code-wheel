import React from 'react'
import { Box, Button, Stack } from '@mui/material'
import styles from './Login.module.scss'
import bgImage from '../../resources/images/codewheel-bg.jpeg'
import logo from '../../resources/images/logo.png'
import github from '../../resources/images/github-logo.png'

const Login = () => {
  const handleLoginWithGithubClick = () => {
    window.location.assign(
      'https://github.com/login/oauth/authorize?client_id=549d0c757e7a80854fc6'
    )
  }

  return (
    <Stack
      direction={'column'}
      justifyContent={'center'}
      className={styles.container}
    >
      <Stack
        direction={'row'}
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
            size={'large'}
            variant={'contained'}
            color={'info'}
            onClick={handleLoginWithGithubClick}
          >
            <img src={github} />
            Login with GitHub
          </Button>
        </Box>
      </Stack>
    </Stack>
  )
}

export default Login