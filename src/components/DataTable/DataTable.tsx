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
    const isDesc = orderBy === property && order === 'desc';
    setOrderBy(isDesc ? 'asc' : 'desc', property);
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
      <Paper sx={{ width: '100%', mb: { sm: 0, md: 2 } }}>
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
                      <TableCell align="center">
                        {row.description.substring(0, 100)}
                        {row.description.length > 100 && '...'}
                      </TableCell>
                      <TableCell align="left">{row.starsCount}</TableCell>
                      <TableCell align="left">{row.forksCount}</TableCell>
                      <TableCell align="right">{row.updateDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage={'Page Size:'}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              size={'small'}
            />
          </>
        )}
      </Paper>
      <Feedback open={!!error} message={`${error}`} />
    </Box>
  );
};

export default DataTable;
