import React from 'react';
import { Box } from '@mui/material';
import Header from '../Header/Header';
import DataTable from '../DataTable/DataTable';
import styles from './Home.module.scss';
import { dataTableHeadCells } from './utils';

const Home = () => {
  return (
    <Box className={styles.container}>
      <Header />
      <DataTable rows={[]} headCells={dataTableHeadCells} />
    </Box>
  );
};

export default Home;
