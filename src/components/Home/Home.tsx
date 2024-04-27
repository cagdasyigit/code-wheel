import React from 'react';
import { Box } from '@mui/material';
import Header from '../Header/Header';
import DataTable from '../DataTable/DataTable';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <Box className={styles.container}>
      <Header />
      <DataTable />
    </Box>
  );
};

export default Home;
