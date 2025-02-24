import { Button, Grid, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useState } from "react";

const UserCreate = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = (event) => {
    event.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      first_name: fname,
      last_name: lname,
      username: username,
      image: image,
    });

    const requestOptions: object = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${apiUrl}/users`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result["status"] === "ok") {
          alert(result["message"]);
          window.location.href = "/";
        }
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
          Create User
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="first_name"
                label="First Name"
                variant="outlined"
                fullWidth
                required
                onChange={(e: any) => setFname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="last_name"
                label="Last Name"
                variant="outlined"
                fullWidth
                required
                onChange={(e: any) => setLname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                fullWidth
                required
                onChange={(e: any) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="image"
                label="Image"
                variant="outlined"
                fullWidth
                required
                onChange={(e: any) => setImage(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default UserCreate;
