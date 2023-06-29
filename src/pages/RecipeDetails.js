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
} from "@mui/material";

import { useParams } from "react-router-dom";
import MyDrawer from "../components/Drawer";
import MyHeading from "../components/MyHeading";
import { apiKey } from "../context/ContextProvider";
import MyCard from "../components/MyCard";
function RecipeDetails() {
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
  };
  useEffect(() => {
    getRecipeDetails();
  }, []);

  return (
    <MyDrawer>
      <Container>
        <MyHeading>{recipe_title}</MyHeading>

        <List>
          {recipeDetails.length > 0 &&
            recipeDetails[0].steps.map((step, index) => (
              <MyCard
                sx={{ margin: "15px", bgcolor: "lightblue " }}
              >
                <CardContent>
                  <>
                    <ListItem
                      key={index}
                      button
                      onClick={handleToggleStep(index)}
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
                            checkedIngredients.indexOf(ingredient.name) !== -1
                              ? "default"
                              : "outlined"
                          }
                          color="primary"
                          size="small"
                          style={{ margin: "2px" }}
                          clickable
                          onClick={handleToggleIngredient(ingredient.name)}
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
            ))}
        </List>
      </Container>
    </MyDrawer>
  );
}

export default RecipeDetails;
