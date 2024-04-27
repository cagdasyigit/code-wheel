import React, { useEffect } from 'react';
import RootRouter from './routers';
import { Stack } from '@mui/material';
import DataStore from './stores/DataStore';

function App() {
  const saveState = () => {
    const state = {
      ...DataStore.getState(),
      list: [],
    };
    localStorage.setItem('state', JSON.stringify(state));
  };

  useEffect(() => {
    const beforeUnload = () => {
      saveState();
    };

    window.addEventListener('beforeunload', beforeUnload);

    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, []);

  return (
    <Stack sx={{ height: '100%' }}>
      <RootRouter />
    </Stack>
  );
}

export default App;
