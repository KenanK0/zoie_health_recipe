import React from "react";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import MyDrawer from "../components/Drawer";
function RecipeDetails() {
  let { recipeId } = useParams();
  console.log(recipeId);

  return (
    <MyDrawer>
      <Container sx={{ bgcolor: "lightblue" }}>
        <h1>Kenan K</h1>
        <h1>{recipeId}</h1>
      </Container>
    </MyDrawer>
  );
}

export default RecipeDetails;
