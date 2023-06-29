import {
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import React, { useContext, useState } from "react";

import { UserContext, apiKey } from "../context/ContextProvider";
import MyDrawer from "../components/Drawer";
import { AccountCircle, ArrowBack, ArrowForward } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useNavigate } from "react-router-dom";
import MyHeading from "../components/MyHeading";
import MyCard from "../components/MyCard";


function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const { user, setUser } = useContext(UserContext);
  setUser(user.toUpperCase());
  console.log(user);
  const handleIconClick = async () => {
    if (query === "") {
      setError(true);
      return;
    }
    setError(false);

    let headersList = {
      Accept: "*/*",
    };

    let response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`,
      {
        method: "GET",
        headers: headersList,
      }
    );

    let data = await response.json();
    setRecipes(data.results);
    console.log(recipes);
    // console.log(data.results);
  };

  const navigateToRecipe = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };
  return (
    <MyDrawer>
      <MyHeading>
        {`Hi ${user ? user : "Guest"}! What are you in the mood for?`}{" "}
      </MyHeading>
      <Container>
        <TextField
          sx={{ marginBottom: "1em" }}
          fullWidth
          error={error}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          label="Search.."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleIconClick}>
                  <ArrowForward />
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <Grid container spacing={3}>
          {recipes.length > 0 && (
            <Grid container spacing={3}>
              {recipes.map((recipe) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
                  <MyCard onClick={() => navigateToRecipe(recipe.id)}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={recipe.image}
                      alt={recipe.title}
                    />
                    <CardContent>
                      <Typography variant="p" component="div">
                        {recipe.title}
                      </Typography>
                    </CardContent>
                  </MyCard>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Container>
    </MyDrawer>
  );
}

export default Home;
