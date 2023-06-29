import {
  Box,
  Container,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import React, { useContext, useState } from "react";

import { UserContext } from "../context/ContextProvider";
import MyDrawer from "../components/Drawer";
import { styled } from "@mui/system";
import { AccountCircle, ArrowBack, ArrowForward } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const MyHeading = styled("h1")({
  padding: "0",
  margin: "0",
  marginBottom: "15px",
  fontSize: "2.5rem",
  textAlign: "center",
  background: "linear-gradient(to right, #FF6B6B 0%, purple 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontFamily: "Gloria Hallelujah",
});
const StyledCard = styled(Card)({
  marginBottom: "1em",
  transition: "0.3s",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
  },
});
function Home() {
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
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=343179a1455a44d5ac94af2e345fe8bd`,
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
          id="input-with-icon-textfield"
          label="What's on your mind?"
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
                  <StyledCard>
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
                  </StyledCard>
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
