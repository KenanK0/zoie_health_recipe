import React from "react";
import { Container, Box } from "@mui/material";
import MyDrawer from "../components/Drawer";
import MyHeading from "../components/MyHeading";
import MyButton from "../components/MyButton";
function Lucky() {
  return (
    <MyDrawer>
      <Container>
        <MyHeading>Feeling Lucky?</MyHeading>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",

          }}
        >
          <MyButton >Generate a recipe!</MyButton>
        </Box>
      </Container>
    </MyDrawer>
  );
}

export default Lucky;
