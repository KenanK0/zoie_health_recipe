import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Checkbox,
  Box,
} from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from "react-router-dom";
import MyDrawer from "../components/Drawer";
import MyHeading from "../components/MyHeading";
import { apiKey } from "../context/ContextProvider";
import MyCard from "../components/MyCard";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import LinearProgress from "@mui/material/LinearProgress";

function RecipeDetails() {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [recipeDetails, setRecipeDetails] = useState([]);
  let { recipe_details } = useParams();
  let [recipe_title, recipe_id] = recipe_details.split("+");
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [checkedSteps, setCheckedSteps] = useState([]);

  const handleToggleIngredient = (value) => () => {
    const currentIndex = checkedIngredients.indexOf(value);
    const newChecked = [...checkedIngredients];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedIngredients(newChecked);
  };

  const handleToggleStep = (value) => () => {
    const currentIndex = checkedSteps.indexOf(value);
    const newChecked = [...checkedSteps];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedSteps(newChecked);

    handleStepCompletion(value + 1);
  };
  const getRecipeDetails = async () => {
    let headersList = {
      Accept: "*/*",
    };

    let response = await fetch(
      `https://api.spoonacular.com/recipes/${recipe_id}/analyzedInstructions?apiKey=${apiKey}`,
      {
        method: "GET",
        headers: headersList,
      }
    );

    let data = await response.json();
    setRecipeDetails(data);
    console.log(data);
    console.log("length is :", data.length);
    setTotalSteps(data[0].steps.length);
  };
  useEffect(() => {
    getRecipeDetails();
  }, []);

  const handleStepCompletion = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <MyDrawer>
        <Container maxWidth="md">
          <MyHeading>{recipe_title}</MyHeading>
          <div>
            {/* LinearProgress added here */}
            <LinearProgress
              variant="determinate"
              value={(currentStep / totalSteps) * 100}
            />
          </div>
          <List>
            <Grid container>
              {recipeDetails.length > 0 &&
                recipeDetails[0].steps.map((step, index) => (
                  <Grid
                    sx={{ padding: "0" }}
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                  >
                    <MyCard
                      sx={{
                        margin: "15px",
                        bgcolor: "lightblue ",
                        padding: "0",
                      }}
                    >
                      <CardContent sx={{ padding: "0" }}>
                        <>
                          <ListItem
                            key={index}
                            button
                            onClick={handleToggleStep(index)}
                            // onClick={()=>{
                            //   handleToggleStep(index);
                            //   handleStepCompletion(index + 1);

                            // }}
                          >
                            <Checkbox
                              edge="start"
                              checked={checkedSteps.indexOf(index) !== -1}
                              tabIndex={-1}
                              disableRipple
                            />
                            <ListItemText
                              primary={`Step ${step.number}: ${step.step}`}
                            />
                          </ListItem>
                          <ListItem>
                            {step.ingredients.length > 0 && (
                              <Typography variant="p">Ingredients:</Typography>
                            )}
                            {step.ingredients.map((ingredient) => (
                              <Chip
                                label={ingredient.name}
                                variant={
                                  checkedIngredients.indexOf(
                                    ingredient.name
                                  ) !== -1
                                    ? "default"
                                    : "outlined"
                                }
                                color="primary"
                                size="small"
                                style={{ margin: "2px" }}
                                clickable
                                onClick={handleToggleIngredient(
                                  ingredient.name
                                )}
                              />
                            ))}
                          </ListItem>
                          <ListItem>
                            {step.equipment.length > 0 && (
                              <Typography variant="p">Equipment:</Typography>
                            )}
                            {step.equipment.map((equip) => (
                              <Chip
                                label={equip.name}
                                variant="outlined"
                                color="secondary"
                                size="small"
                                style={{ margin: "2px" }}
                              />
                            ))}
                          </ListItem>
                        </>
                      </CardContent>
                    </MyCard>
                  </Grid>
                ))}
            </Grid>
          </List>
        </Container>
      </MyDrawer>
    </Box>
  );
}

export default RecipeDetails;
