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
import Utils from "../../Utils";
import FileSaver from "file-saver";

const uuidv1 = require('uuid/v1');
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
    value: 'canvas',
    experimentalUpdate: false
  };

  handleMenuItemClick = action => {
    switch (action) {
    case "SaveModelData":
      this.handleSaveModel();
      break;
    default:
      this.setState({ action: action, openDialogBox: true, open: false })
    }
  };

  handleSaveModel () {
    Utils.evalPythonMessage('hnn_geppetto.save_model', [])
      .then(response => {
        let unescapedResponse = response.replace(/\\\\/g, "\\");
        let blob = new Blob([unescapedResponse], { type: "application/json" });
        FileSaver.saveAs(blob, uuidv1() + '.json')
      }
      );

    this.setState({ openDialogBox: false })

  }

  handleLoadCfg (file){
    const ext = file.name.substr(file.name.lastIndexOf('.') + 1);
    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      const myBuffer = reader.result;
      Utils.evalPythonMessage('hnn_geppetto.load_cfg_from_' + ext,[JSON.stringify(Array.from(new Uint8Array(myBuffer)))])
        .then(console.log("Data Loaded"))
    };
    reader.readAsArrayBuffer(file);

  }

  handleLoadExperimental (file){
    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      const myBuffer = reader.result;
      Utils.evalPythonMessage('hnn_geppetto.load_experimental',[JSON.stringify(Array.from(new Uint8Array(myBuffer)))])
        .then(
          this.setState({ experimentalUpdate: true })
        )
    };
    reader.readAsArrayBuffer(file);
  }

  render (){
    const { classes } = this.props;
    const { open, action, openDialogBox, value, experimentalUpdate } = this.state;

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
            title="Experimental Data"
            filesAccepted="txt"
            mimeAccepted="text/plain"
            open={openDialogBox}
            onRequestClose={() => this.setState({ openDialogBox: false })}
            handleRequest={this.handleLoadExperimental.bind(this)}

          />
        );
        break;

      case 'LoadModelData':
        content = (
          <LoadData
            title="Model Parameters"
            filesAccepted="json or param"
            open={openDialogBox}
            onRequestClose={() => this.setState({ openDialogBox: false })}
            handleRequest={this.handleLoadCfg.bind(this)}
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

        <HNNFlexLayoutContainer showCanvas={value === "canvas"} visibility={value === "canvas" ? "visible" : "hidden"}
          experimentalUpdate={experimentalUpdate} handleExperimentalUpdate={() => this.setState({ experimentalUpdate: false })}/>
        <HNNParametersContainer visibility={value === "canvas" ? "hidden" : "visible"} />
        {content}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(HNNAppBar);
