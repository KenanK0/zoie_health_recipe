import React, { useContext, useState } from "react";
import MyDrawer from "../components/Drawer";
import MyHeading from "../components/MyHeading";
import { Box, Card, CardContent, TextField } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import MyButton from "../components/MyButton";
import MyCard from "../components/MyCard";
import { UserContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
function Account() {
  const [newName, setNewName] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  return (
    <MyDrawer>
      <MyHeading>Update your Name</MyHeading>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          color: "white",
        }}
      >
        <MyCard sx={{ bgcolor: "lightblue" }}>
          <CardContent>
            <Box mt={2} mb={4}>
              <TextField
                value={newName}
                // error={error}
                onChange={(e) => setNewName(e.target.value)}
                fullWidth
                variant="outlined"
                label="Change your name.."
              />
            </Box>
            <MyButton
              variant="outlined"
              onClick={() => {
                setUser(newName);
                navigate("/home");
              }}
            >
              OK
            </MyButton>
          </CardContent>
        </MyCard>
      </Box>
    </MyDrawer>
  );
}

export default Account;
