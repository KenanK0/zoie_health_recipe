import {
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  CircularProgress,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

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
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [apiError, setApiError] = useState(false);
  const { user, setUser } = useContext(UserContext);
  setUser(user.toUpperCase());
  console.log(user);
  const fetchRecipes = async (search) => {
    let headersList = {
      Accept: "*/*",
    };

    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${search}&apiKey=${apiKey}`,
      {
        method: "GET",
        headers: headersList,
      }
    )
      .then((response) => {
        setLoading(false);
        if (!response.ok) {
          setApiError(true);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data.results);
        console.log(recipes);
      })
      .catch((error) => {
        console.error(`Fetch Error =\n`, error);
        setLoading(false);
      });
  };
  const handleIconClick = () => {
    if (query === "") {
      setError(true);
      return;
    }
    fetchRecipes(query);
    setError(false);
    setLoading(true);
  };

  const navigateToRecipe = (recipeId, recipeTitle) => {
    navigate(`/recipe/${recipeTitle}+${recipeId}`);
  };

  useEffect(() => {
    fetchRecipes("fruits");
  }, []);
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
        {apiError && (
          <Typography
            textAlign={"center"}
            variant="h5"
            component="div"
            sx={{ color: "red", fontWeight: "bold" }}
          >
            Oops! Something went wrong. Please try again later.
          </Typography>
        )}
        {!loading ? (
          <Grid container spacing={3}>
            {recipes.length > 0 && (
              <Grid container spacing={3}>
                {recipes.map((recipe) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
                    <MyCard
                      onClick={() => navigateToRecipe(recipe.id, recipe.title)}
                    >
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
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "75vh",
            }}
          >
            <CircularProgress size={200} />
          </Box>
        )}
      </Container>
    </MyDrawer>
  );
}

export default Home;
