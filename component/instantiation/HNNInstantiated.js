import React, { Component, createRef } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

import Utils from '../../Utils';
import ErrorDialog from './ErrorDialog';
import Plots from '../general/materialComponents/Plots';
import Canvas from '../../../../js/components/interface/3dCanvas/Canvas';
import IconButton from '../../../../js/components/controls/iconButton/IconButton';
import MaterialIconButton from '../general/materialComponents/IconButtonWithTooltip';
import ControlPanel from '../../../../js/components/interface/controlPanel/controlpanel';

const styles = {
    instantiatedContainer: {
        height: '100%',
        width: '100%',
        left: "0px",
        top: "32px",
        position: 'relative',
    },
    plotBtn: {
        position: 'absolute',
        left: 34,
        top: 374
    },
    refreshButton: {
        position: 'absolute',
        right: "10px",
        top: "45px",
    },
    launchButton: {
        position: 'absolute',
        right: "10px",
        top: "90px"
    },

};

class HNNInstantiated extends Component {
    state = {
        modelExist: false,
        canvasUpdateRequired: false,
        simulationUpdateRequired: true,
        errorMessage: '',
        errorDetails: '',
        openErrorDialog: false
    };
    canvasRef = createRef();


    componentDidMount() {
        this.canvasRef.current.engine.setLinesThreshold(10000);
        this.canvasRef.current.displayAllInstances();
    }

    async refreshCanvas() {
        const { simulationUpdateRequired } = this.state;
        if (simulationUpdateRequired) {
            await this.instantiate()
        }
        GEPPETTO.trigger(GEPPETTO.Events.Show_spinner, GEPPETTO.Resources.PARSING_MODEL);
        this.canvasRef.current.engine.updateSceneWithNewInstances(window.Instances)
        this.setState({ canvasUpdateRequired: false })
        GEPPETTO.trigger(GEPPETTO.Events.Hide_spinner);
    }

    async instantiate() {
        GEPPETTO.CommandController.log("The model is getting instantiated...");
        GEPPETTO.trigger(GEPPETTO.Events.Show_spinner, GEPPETTO.Resources.INSTANTIATING_MODEL);
        const response = await Utils.evalPythonMessage('hnn_geppetto.instantiateModelInGeppetto', [])

        if (!this.processError(response)) {
            GEPPETTO.trigger(GEPPETTO.Events.Show_spinner, GEPPETTO.Resources.PARSING_MODEL);
            GEPPETTO.Manager.loadModel(response);
            GEPPETTO.CommandController.log("The model instantiation was completed");
            this.setState({ simulationUpdateRequired: false, modelExist: true })
            GEPPETTO.trigger(GEPPETTO.Events.Hide_spinner);

        }
    }

    async componentDidUpdate(prevProps, prevState) {
        const { showCanvas } = this.props;
        const { modelExist } = this.state;
        // when showing the canvas, check if the model has changed
        // to know if we need to re-run simulation or update the canvas
        if (showCanvas && !prevProps.showCanvas && modelExist) {
            const message = 'hnn_geppetto.compare_cfg_to_last_snapshot'
            const { canvasUpdateRequired, simulationUpdateRequired } = await Utils.evalPythonMessage(message, [])
            this.setState({ canvasUpdateRequired, simulationUpdateRequired })
        }
    }

    processError (response) {
        var parsedResponse = Utils.getErrorResponse(response);
        if (parsedResponse) {
            GEPPETTO.trigger(GEPPETTO.Events.Hide_spinner);
            this.setState({ openErrorDialog: true, errorMessage: parsedResponse['message'], errorDetails: parsedResponse['details'] })
            return true;
        }
        return false;
    }

    render () {
        const { classes } = this.props;
        const { openErrorDialog, errorMessage, errorDetails, canvasUpdateRequired, simulationUpdateRequired } = this.state;
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

                <Plots iconStyle={styles.plotBtn}/>

                <IconButton className={classes.controlpanelBtn}
                            icon={"fa-list"}
                            id={"ControlPanelButton"}
                            onClick={() => $('#controlpanel').show()}
                />

                <MaterialIconButton
                    disabled={!canvasUpdateRequired}
                    onClick={() => this.refreshCanvas()}
                    className={classes.refreshButton + " fa fa-refresh"}
                    tooltip={canvasUpdateRequired ? "Update 3D view" : "Latest 3D view"}
                />

                <MaterialIconButton
                    disabled={!simulationUpdateRequired}
                    onClick={() => this.instantiate()}
                    className={classes.launchButton + " fa fa-rocket"}
                    tooltip={simulationUpdateRequired ? "Run simulation" : "Network already simulated"}
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

export default withStyles(styles)(HNNInstantiated)