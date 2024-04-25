import React from 'react'
import RootRouter from './routers'
import { Stack } from '@mui/material'

function App() {
  return (
    <Stack sx={{ height: '100%' }}>
      <RootRouter />
    </Stack>
  )
}

export default App
