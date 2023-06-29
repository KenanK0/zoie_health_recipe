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
import landing_video from "./assets/landing_video.mp4";
import { UserContext } from "./context/ContextProvider";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const StyledBox = styled(Box)({
  padding: "0",
  margin: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${landing_video})`,
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
});

const MyCard = styled(Card)({
  backgroundColor: "#ffffff",
  borderRadius: "15px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  transition: "0.3s ease-in-out",
  ":hover": {
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    transform: "translateY(-3px)",
    backgroundColor: "#FFC0CB",
    color: "#ffffff",
    border: "0.5px solid white",
  },
  marginBottom: "1em",
});

const MyButton = styled(Button)({
  color: "#ffffff",
  backgroundColor: "#FF6B6B",
  ":hover": {
    backgroundColor: "#ffffff",
    color: "#FF6B6B",
  },
});
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
      <StyledBox>
        <video
          autoPlay
          playsInline
          loop
          muted
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            minWidth: "100%",
            minHeight: "100%",
            width: "auto",
            height: "auto",
            zIndex: "-100",
            transform: "translate(-50%, -50%)",
            background: "transparent no-repeat center",
            backgroundSize: "cover",
          }}
        >
          <source src={landing_video} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <Box>
          <MyCard
            sx={{
              width: {
                xs: "75vw", // Smaller width for small (xs) screens
                sm: "60vw", // Larger width for larger (sm and above) screens
                md: "40vw", // Even larger width for md and above screens
                lg: "30vw", // Even larger width for lg and above screens
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
              <MyButton variant="outlined" onClick={GoToHome}>
                Let's Cook!
              </MyButton>
            </CardContent>
            {/* </Box> */}
          </MyCard>
        </Box>
      </StyledBox>
      {/* </Box> */}
    </React.Fragment>
  );
}

export default App;
