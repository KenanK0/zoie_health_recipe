import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Menu,
  KitchenOutlined,
  CasinoOutlined,
  HomeOutlined,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
const drawerWidth = 240;

export default function MyDrawer(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ bgcolor: "#FF6B6B" }} />

      <List>
        <ListItem
          disablePadding
          onClick={() => {
            navigate("/home");
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <HomeOutlined color="primary" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem
          disablePadding
          onClick={() => {
            navigate("/FeelingLucky");
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <CasinoOutlined color="primary" />
            </ListItemIcon>
            <ListItemText primary="Feeling Lucky?" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem
          disablePadding
          onClick={() => {
            navigate("/Fridge");
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <KitchenOutlined color="primary" />
            </ListItemIcon>
            <ListItemText primary="What's in your fridge?" />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#FF6B6B",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Zoie Health Recipe Challenge
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
