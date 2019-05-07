import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import HNNTabs from './HNNTabs';
import HNNParametersContainer from './HNNParametersContainer';
import HNNFlexLayoutContainer from './HNNFlexLayoutContainer';
import HNNLogo from '../../static/hnn_logo.png'
import AboutPage from "./actions/AboutPage";
import LoadData from "./actions/LoadData";
import DrawerList from './DrawerList';

const drawerWidth = 240;

const styles = theme => ({
  root: { display: 'flex', },
  menuButton: { marginRight: 20, },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: { width: drawerWidth, },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    backgroundColor: theme.status.gray_out,
  },
  img: {
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 0,
    marginRight: 70,
    width: 95
  }

});

class HNNAppBar extends React.Component {
  state = {
    open: false,
    openDialogBox: false,
    action: null,
    value: 'canvas'
  };

  handleMenuItemClick = action => {
    this.setState({ action: action, openDialogBox: true, open: false })
  };

  render () {
    const { classes } = this.props;
    const { open, action, openDialogBox, value } = this.state;

    let content;
    if (openDialogBox) {
      switch (action) {
      case 'AboutPage':
        content = (
          <AboutPage
            open={openDialogBox}
            onRequestClose={() => this.setState({ openDialogBox: false })}
          />
        );
        break;
      case 'LoadExperimentalData':
        content = (
          <LoadData
            title="Load Experimental Parameters"
            filesAccepted=".txt"
            mimeAccepted="text/plain"
            open={openDialogBox}
            onRequestClose={() => this.setState({ openDialogBox: false })}
          />
        );
        break;

      case 'LoadModelData':
        content = (
          <LoadData
            title="Load Model Parameters"
            filesAccepted=".param"
            open={openDialogBox}
            onRequestClose={() => this.setState({ openDialogBox: false })}
          />
        );
        break;
      }
    }

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              className={classes.menuButton}
              onClick={() => this.setState({ open: true })}
            >
              <Icon className='fa fa-bars' />
            </IconButton>

            <HNNTabs value={value} onChange={(event, value) => this.setState({ value })} />

            <IconButton color="inherit">
              <Icon className='fa fa-book' />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          open={open}
          anchor="left"
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          onClose={() => this.setState({ open: false })}
        >
          <div className={classes.drawerHeader}>
            <img className={classes.img} src={HNNLogo} alt="HNN Logo" />
          </div>
          <DrawerList handleMenuItemClick={name => this.handleMenuItemClick(name)} />
        </Drawer>

        <HNNFlexLayoutContainer showCanvas={value === "canvas"} visibility={value === "canvas" ? "visible" : "hidden"} />
        <HNNParametersContainer visibility={value === "canvas" ? "hidden" : "visible"} />
        {content}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(HNNAppBar);
