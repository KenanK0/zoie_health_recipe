import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import landing_video from "./assets/landing_video.gif";
import { UserContext } from "./context/ContextProvider";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const GoToHome = () => {
    if (user === "") {
      setError(true);
      return;
    }
    navigate("/home");

    setError(false);
    console.log(user);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          padding: "0",
          margin: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundImage: `url(${landing_video})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Card
          sx={{
            width: {
              xs: "90vw", // For extra small devices (mobile phones)
              sm: "60vw", // For small devices (tablets)
              md: "40vw", // For medium devices (laptops)
              lg: "30vw", // For large devices (desktops)
              xl: "20vw", // For extra large devices (large desktops)
            },
          }}
        >
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Hey Chef!
            </Typography>
            <Box mt={4} mb={4}>
              <TextField
                value={user}
                error={error}
                onChange={(e) => setUser(e.target.value)}
                fullWidth
                variant="outlined"
                label="What's your name?"
              />
            </Box>
            <Button variant="outlined" onClick={GoToHome}>
              Let's Cook!
            </Button>
          </CardContent>
          {/* </Box> */}
        </Card>
      </Box>
      {/* </Box> */}
    </React.Fragment>
  );
}

export default App;
