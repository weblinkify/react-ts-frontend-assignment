import React from "react";
import UserList from "./components/UserList";
import { Container, Typography, useMediaQuery, useTheme } from "@mui/material";

const App: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container>
      <Typography
        variant={isSmallScreen ? "h4" : "h3"}
        align="center"
        gutterBottom
      >
        User Dashboard
      </Typography>
      <UserList />
    </Container>
  );
};

export default App;
