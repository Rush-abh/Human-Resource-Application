import React, {useEffect, useState} from "react";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import BusinessIcon from '@material-ui/icons/Business';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

import {Link, useLocation} from "react-router-dom";



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(5),
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [sideLinks, updateLinks] = React.useState(props);

  //useEffect hook to look for any changes in the sideLinks props
    useEffect(() => {
        updateLinks(props)
    }, [props]);

    let currentLocation = useLocation();
    let activeLinkArr = currentLocation.pathname.split("/");
    let activeLink = activeLinkArr[activeLinkArr.length-1];
    let parentLink = activeLinkArr[1];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
        <div className="navlogotitle">
          <Typography variant="h6" noWrap>
            HR Application
          </Typography>
        </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />

        <List>

        {sideLinks.sideLinks.map((link, index) => {
                        return <Link className="navbutton" to={link.path}>
                        <ListItem button >
                            <ListItemIcon>
                                {link.icon}
                            </ListItemIcon>
                            <ListItemText primary={link.displayText} />
                        </ListItem>
                        </Link>
            })}
            <ListItem button className="navbutton">
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                <ListItemText primary="Personal" />
            </ListItem>
            <ListItem button className="navbutton">
              <ListItemIcon>
                <ContactPhoneIcon />
              </ListItemIcon>
              <ListItemText primary="Emergency" />
            </ListItem>
            <ListItem button className="navbutton">
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary="Work Rights" />
            </ListItem>
            <ListItem button className="navbutton">
              <ListItemIcon>
                <LocalHospitalIcon />
              </ListItemIcon>
              <ListItemText primary="GP Details" />
            </ListItem>
            <ListItem button className="navbutton">
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="Bank Details" />
            </ListItem>
            <ListItem button className="navbutton">
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText primary="Documents" />
            </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
