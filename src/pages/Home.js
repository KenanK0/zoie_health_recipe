import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";

import { UserContext } from "../context/ContextProvider";
function Home() {
  const { user, setUser } = useContext(UserContext);
  setUser(user.toUpperCase());
  console.log(user);
  return (
    <Box>
      <Typography variant="h1">HELLLLLO {user ? user : "GUESTO"} </Typography>
    </Box>
  );
}

export default Home;
