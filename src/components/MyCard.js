import { styled } from "@mui/system";
import { Card } from "@mui/material";

const MyCard = styled(Card)({
  marginBottom: "1em",
  transition: "0.3s",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
  },
});

export default MyCard;
