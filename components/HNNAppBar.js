import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import BookIcon from '@material-ui/icons/Book';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { CloudUpload, Save, Cancel, Settings, Chat } from '@material-ui/icons';
import HNNTabs from './HNNTabs';
import HNNLogo from './general/hnn_logo.png'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    backgroundColor: theme.status.gray_out,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class HNNAppBar extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <span style={{ width: "100%" }}>
              <HNNTabs />
            </span>
            <IconButton color="inherit">
              <BookIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <img style={{ marginLeft: 5, marginTop: 5, marginBottom: 0, marginRight:70, width: 95 }} src={HNNLogo} />
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button key='Load Model Parameters'>
              <ListItemIcon>
                <CloudUpload />
              </ListItemIcon>
              <ListItemText primary='Load Model Parameters' />
            </ListItem>
            <ListItem button key='Load Experimental Data'>
              <ListItemIcon>
                <CloudUpload />
              </ListItemIcon>
              <ListItemText primary='Load Experimental Parameters' />
            </ListItem>
            <ListItem button key='Save Model Parameters'>
              <ListItemIcon>
                <Save />
              </ListItemIcon>
              <ListItemText primary='Save Model Parameters' />
            </ListItem>
            <ListItem button key='Remove Simulation'>
              <ListItemIcon>
                <Cancel />
              </ListItemIcon>
              <ListItemText primary='Remove Simulation' />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button key='Settings'>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItem>
            <ListItem button key='About HNN'>
              <ListItemIcon>
                <Chat />
              </ListItemIcon>
              <ListItemText primary='About HNN' />
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

HNNAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(HNNAppBar);