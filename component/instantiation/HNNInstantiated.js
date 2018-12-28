import React from 'react';
import Send from '@material-ui/icons/SendOutlined';
import MaterialIconButton from '@material-ui/core/IconButton';
import Canvas from '../../../../js/components/interface/3dCanvas/Canvas';
import IconButton from '../../../../js/components/controls/iconButton/IconButton';
import ControlPanel from '../../../../js/components/interface/controlPanel/controlpanel';

import ErrorDialog from './ErrorDialog';
import Utils from '../../Utils';

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
	lauchSimBtn: {
		position: 'absolute', 
		right: 34, 
		top: 16 
	}
};

export default class HNNInstantiated extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			openErrorDialog: false,
			errorMessage: '',
			errorDetails: ''
		};
	}

	componentDidMount () {
		this.refs.canvas.engine.setLinesThreshold(10000);
		this.refs.canvas.displayAllInstances();
	}
	async instantiate () {
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

	processError (response) {
		let parsedResponse = Utils.getErrorResponse(response);
		if (parsedResponse) {
			GEPPETTO.trigger(GEPPETTO.Events.Hide_spinner);
			this.setState({ openErrorDialog: true, errorMessage: parsedResponse['message'], errorDetails: parsedResponse['details'] })
			return true;
		}
		return false;
	}

	render () {
		const { openErrorDialog, errorMessage, errorDetails } = this.state;
		return (
			<div id="instantiatedContainer" style={styles.instantiatedContainer}>
				<Canvas
					ref="canvas"
					name="Canvas"
					id="CanvasContainer"
					componentType="Canvas"
					style={{ height: '100%', width: '100%' }}
				/>
        
				<div id="controlpanel" style={{ top: 0 }}>
					<ControlPanel
						icon="styles.Modal"
						enablePagination
						useBuiltInFilters={false}
					/>
				</div>

				<IconButton
					style={styles.controlpanelBtn}
					icon="fa-list"
					id="ControlPanelButton"
					onClick={() => $('#controlpanel').show()}
				/>

				<MaterialIconButton 
					style={styles.lauchSimBtn}
					onClick={() => this.instantiate()}
				>
					<Send />
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