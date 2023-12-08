import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Drawer, Typography, makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { AddCircleOutline, SubjectOutlined } from "@material-ui/icons";
import { AppBar, Toolbar } from "@material-ui/core";
import format from "date-fns/format/index";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(3),
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
  };
});

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Note",
      icon: <AddCircleOutline color="secondary" />,
      path: "/create",
    },
  ];

  return (
    <div className={classes.root}>
      {/*  App bar */}
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          <Typography className={classes.date}>
            <img src="sologan.png" alt="sologan" />
          </Typography>
          <Typography>Noémie</Typography>
          <Avatar src="sheep.png" className={classes.avatar} />
        </Toolbar>
      </AppBar>
      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <img alt="Remy Sharp" src="logoBlog.jpg" />
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              button
              onClick={() => navigate(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemText>{item.icon}</ListItemText>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
