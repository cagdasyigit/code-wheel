/*

The table should have 3 radio buttons where the user can select between.
three programming languages: Javascript, Scala, Python ● The Javascript radio button will be pre-selected.

● There will be a search input where users can search repositories based on keywords.
● The search will use the query in the input combined with the selected language.
● Search input will not have a submit button instead it will automatically fetch the results based on user input changes.
● Table headers must consist of Repository ID, Username, Repo Description, Stars, Forks, and Last Update Date.
● Sorting functionality must be implemented for stars, forks, and the last update date. And you can only sort by only one column at a time.
● The table must have pagination implemented.
● When sorting changes new data must be fetched from the server. It should not be done on the client side.
● The application should remember the state when the user closes the page. So next time the user opens the page they must be greeted by the last changes they have made.
● And lastly, the page should be fully responsive and accessible on mobile.

*/

import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Data } from './types';
import DataTableToolbar from './DataTableToolbar';
import DataTableHead from './DataTableHead';
import { dataTableHeadCells, getComparator, stableSort } from './utils';
import DataStore from '../../stores/DataStore';
import useFetchData from '../../hooks/useFetchData';
import { CircularProgress } from '@mui/material';
import Feedback from '../Feedback';
import { useEffect, useState } from 'react';

const DataTable = () => {
  const {
    list,
    currentPage: page,
    pageSize: rowsPerPage,
    order,
    orderBy,
    setCurrentPage: setPage,
    setPageSize: setRowsPerPage,
    setOrderBy,
    totalCount,
  } = DataStore((state) => state);
  const [rows, setRows] = useState<Data[]>([]);
  const { loading, error } = useFetchData();

  useEffect(() => {
    setRows(stableSort<Data>(list, getComparator(order, orderBy)));
  }, [list]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(isAsc ? 'desc' : 'asc', property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (row: Data) => {
    window.open(row.url, '_blank');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <DataTableToolbar />
        {loading ? (
          <Paper sx={{ textAlign: 'center', padding: 5 }}>
            <h2>Loading</h2>
            <CircularProgress color={'error'} />
          </Paper>
        ) : (
          <>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={'medium'}
              >
                <DataTableHead
                  headCells={dataTableHeadCells}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleRowClick(row)}
                      hover={true}
                    >
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell align="left">{row.username}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="left">{row.starsCount}</TableCell>
                      <TableCell align="left">{row.forksCount}</TableCell>
                      <TableCell align="right">{row.updateDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
      <Feedback open={!!error} message={`${error}`} />
    </Box>
  );
};

export default DataTable;
