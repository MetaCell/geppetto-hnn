import React, { Component, createRef } from 'react';
import { withStyles } from '@material-ui/core';

import ErrorDialog from '../common/ErrorDialog';
import Canvas from 'geppetto-client/js/components/interface/3dCanvas/Canvas';
import IconButton from 'geppetto-client/js/components/controls/iconButton/IconButton';
import ControlPanel from 'geppetto-client/js/components/interface/controlPanel/controlpanel';

const styles = {
  instantiatedContainer: {
    height: '100%',
    width: '100%',
    left: "0px",
    top: "32px",
    position: 'relative',
  },
  controlpanelBtn: {
    position: 'absolute',
    left: 34,
    top: 320
  },
};

class HNN3DViewer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      modelExist: false,
      errorMessage: '',
      errorDetails: '',
      openErrorDialog: false
    };
    this.canvasRef = createRef();
    this.updateInstances = this.updateInstances.bind(this);

  }


  componentDidMount () {
    this.canvasRef.current.engine.setLinesThreshold(10000);
    this.canvasRef.current.displayAllInstances();
  }

  updateInstances () {
    this.canvasRef.current.engine.updateSceneWithNewInstances(window.Instances);
  }

  render () {
    const { classes } = this.props;
    const { openErrorDialog, errorMessage, errorDetails } = this.state;
    return (
      <div
        id="instantiatedContainer"
        className={classes.instantiatedContainer}
      >
        <Canvas
          ref={this.canvasRef}
          name="Canvas"
          id="CanvasContainer"
          componentType={'Canvas'}
          style={{ height: '100%', width: '100%' }}
        />

        <div id="controlpanel" style={{ top: 0 }}>
          <ControlPanel
            enablePagination={true}
            useBuiltInFilters={false}
          />
        </div>

        <IconButton className={classes.controlpanelBtn}
          icon={"fa-list"}
          id={"ControlPanelButton"}
          onClick={() => $('#controlpanel').show()}
        />

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

export default withStyles(styles)(HNN3DViewer)
