import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { getUser } from "../azure-devops";
import { User } from "../azure-devops/profile";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

const menu = [];

export default function ButtonAppBar() {
  const classes = useStyles();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser().then(data => {
      setUser(data);
    });
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {menu.length > 0 && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            Build Monitor
          </Typography>
          {user && user.avatarUrl && <img src={user.avatarUrl} alt="Login" />}
        </Toolbar>
      </AppBar>
    </div>
  );
}
