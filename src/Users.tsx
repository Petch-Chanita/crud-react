import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { useState } from "react";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import ButtonGroup from "@mui/material/ButtonGroup";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { CircularProgress, IconButton, TablePagination } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Users = () => {
  const [items, setItems] = useState([]);
  const [id, setID] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleOpen = (idx) => {
    setOpen(true);
    setID(idx);
  };

  const handleClose = () => {
    setOpen(false);
    setID("");
  };

  const getUser = () => {
    fetch(`${apiUrl}/users`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setItems(result["result"]);
        },
        (error) => {
          console.log(error);

          setIsLoading(false);
          // setError(error);
        }
      );
  };

  const handleDelete = () => {
    console.log("ID == ", id);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: any = {
      method: "DELETE",
      headers: myHeaders,
    };

    fetch(`${apiUrl}/users/${id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        return response.text(); // ใช้ text() แทนเผื่อ response ว่าง
      })
      .then((text) => {
        if (text) {
          const result = JSON.parse(text);
          console.log(result);
        }
        alert("Delete successful!");
        getUser();
        handleClose();
      })
      .catch((error) => {
        alert(error);
        console.error(error);
        handleClose();
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdate = (idx) => {
    window.location.href = "crud-react/update/" + idx;
  };

  const paginatedItems = items.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        {/* <Paper sx={{ p: 2 }}> */}
          <Box display={"flex"} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                User List
              </Typography>
            </Box>
            <Box>
              <Link href="crud-react/create">
                <Fab color="primary" aria-label="add">
                  <AddIcon />
                </Fab>
              </Link>
            </Box>
          </Box>

          <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
            <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">Username</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isLoading ? (
                  paginatedItems.length > 0 ? (
                    paginatedItems?.map((row: any) => (
                      <TableRow
                        key={row.username}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        hover 
                        role="checkbox" 
                        tabIndex={-1}
                        
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="center">
                          <Box display={"flex"} justifyContent={"center"}>
                            <Avatar alt={row.username} src={row.image} />
                          </Box>
                        </TableCell>
                        <TableCell align="right">{row.first_name}</TableCell>
                        <TableCell align="right">{row.last_name}</TableCell>
                        <TableCell align="right">{row.username}</TableCell>
                        <TableCell align="right">
                          <ButtonGroup
                            variant="outlined"
                            aria-label="Basic button group"
                          >
                            <IconButton  onClick={() => handleUpdate(row.id)} color="success">
                              <ModeEditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleOpen(row.id)} color="error">
                              <DeleteIcon />
                            </IconButton>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6}  sx={{ textAlign: 'center' }}>
                        No Data
                      </TableCell>
                    </TableRow>
                  )
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}  sx={{ textAlign: 'center' }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
           
          </TableContainer>
          <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={items.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="keep-mounted-modal-title"
                variant="h6"
                component="h2"
                display={"flex"}
                justifyContent={"center"}
              >
                Do you want to delete data?.
              </Typography>
              <Typography
                id="keep-mounted-modal-description"
                sx={{ mt: 4 }}
                display={"flex"}
                justifyContent={"center"}
              >
                <Button onClick={handleDelete} variant="contained">
                  Confirm
                </Button>
              </Typography>
            </Box>
          </Modal>
        {/* </Paper> */}
      </Container>
    </>
  );
};

export default Users;
