import React from 'react';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core';
import MaterialIconButton from '@material-ui/core/IconButton';

import Utils from '../../Utils';
import ErrorDialog from './ErrorDialog';
import Plots from '../general/materialComponents/Plots';
import Canvas from '../../../../js/components/interface/3dCanvas/Canvas';
import IconButton from '../../../../js/components/controls/iconButton/IconButton';
import ControlPanel from '../../../../js/components/interface/controlPanel/controlpanel';

const styles = {
  modal: {
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: '999',
    height: '100%',
    width: '100%',
    top: "0px"
  },
  instantiatedContainer: {
    height: '100%', 
    width: '100%', 
    position: 'fixed'
  },
  controlpanelBtn: {
    position: 'absolute', 
    left: 34, 
    top: 16 
  },
  plotBtn: {
    position: 'absolute', 
    left: 34, 
    top: 320 
  },
  lauchSimBtn: {
    position: 'absolute', 
      right: 34, 
      top: 16 
  }
};

class HNNInstantiated extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      errorDetails: '',
      openErrorDialog: false
    };
  }

  componentDidMount() {
    this.refs.canvas.engine.setLinesThreshold(10000);
    this.refs.canvas.displayAllInstances();
  }
  async instantiate() {
    GEPPETTO.CommandController.log("The model is getting instantiated...");
    GEPPETTO.trigger(GEPPETTO.Events.Show_spinner, GEPPETTO.Resources.INSTANTIATING_MODEL);
    const response = await Utils.evalPythonMessage('hnn_geppetto.instantiateModelInGeppetto', [])
      
    if (!this.processError(response)) {
      GEPPETTO.trigger(GEPPETTO.Events.Show_spinner, GEPPETTO.Resources.PARSING_MODEL);
      GEPPETTO.Manager.loadModel(response);
      GEPPETTO.CommandController.log("The model instantiation was completed");
      GEPPETTO.trigger(GEPPETTO.Events.Hide_spinner);
    }
  }

  processError(response) {
    var parsedResponse = Utils.getErrorResponse(response);
    if (parsedResponse) {
        GEPPETTO.trigger(GEPPETTO.Events.Hide_spinner);
        this.setState({ openErrorDialog: true, errorMessage: parsedResponse['message'], errorDetails: parsedResponse['details'] })
        return true;
    }
    return false;
  }

  render() {
    const { classes } = this.props;
    const { openErrorDialog, errorMessage, errorDetails } = this.state;
    return (
      <div id="instantiatedContainer" className={classes.instantiatedContainer}>
        <Canvas
          ref={"canvas"}
          name={"Canvas"}
          id="CanvasContainer"
          componentType={'Canvas'}
          style={{ height: '100%', width: '100%' }}
        />
        
        <div id="controlpanel" style={{ top: 0 }}>
          <ControlPanel
            icon={"styles.Modal"}
            enablePagination={true}
            useBuiltInFilters={false}
          />
        </div>

        <Plots iconStyle={styles.plotBtn}/>

        <IconButton className={classes.controlpanelBtn}
          icon={"fa-list"}
          id={"ControlPanelButton"}
          onClick={() => $('#controlpanel').show()}
        />

        <MaterialIconButton 
          color="primary"
          className={classes.lauchSimBtn}
          onClick={() => this.instantiate()}
        >
          <Icon className='fa fa-rocket' />
        </MaterialIconButton>

        <ErrorDialog
          open={openErrorDialog}
          errorMessage={errorMessage}
          errorDetails={errorDetails}
          onClose={() => this.setState({ openErrorDialog: false })} 
        />
      </div>
    );
  }
}

export default withStyles(styles)(HNNInstantiated)