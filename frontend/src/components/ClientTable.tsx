import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const StickyHeadTable = (props) => {
  const data = props.data;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Define columns based on the IClient interface, excluding _id and __v, and adding a sequence number column
  const columns = [
    { id: 'sequence', label: '#', minWidth: 50, align: 'left' },
    { id: 'macAddress', label: 'MAC Address', minWidth: 170 },
    { id: 'isConnected', label: 'Connection State', minWidth: 170 },
    { id: 'createdAt', label: 'Created At', minWidth: 170 },
  ];

  // Handle change in pagination page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change in number of rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              // Calculate the sequence number based on pagination
              const sequenceNumber = page * rowsPerPage + index + 1;
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id || index}>
                  {columns.map((column) => {
                    let value = row[column.id];
                    if (column.id === 'sequence') {
                      value = sequenceNumber; // Display sequence number
                    } else if (column.id === 'isConnected') {
                      value = value ? 'Connected' : 'Disconnected'; // Convert boolean to string
                    } else if (column.id === 'createdAt') {
                      value = new Date(value).toLocaleString(); // Format date
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default StickyHeadTable;
