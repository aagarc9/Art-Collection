import React from "react";

//Material UI
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/system';

import Tiles from "../components/Tiles";


const Home = () => {
  return (
    <Container 
    maxWidth="lg" 
    alignItems="center"
    justifyContent="center">
        <Tiles />
    </Container>
  );
};

export default Home;
