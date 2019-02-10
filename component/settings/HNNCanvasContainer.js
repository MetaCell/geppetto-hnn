import React, { Component } from 'react'
import HNNInstantiated from '../instantiation/HNNInstantiated';
import * as FlexLayout from '../../../../js/components/interface/flexLayout2/src/index';
import Plots from "../general/materialComponents/Plots";
import MaterialIconButton from "../general/materialComponents/IconButtonWithTooltip";
import Utils from "../../Utils";
import {withStyles} from "@material-ui/core";

const json = {
	"global": {
		sideBorders: 8
	},
	"layout": {
		"type": "row",
		"weight": 100,
		"children": [
			{
				"type": "row",
				"weight": 100,
				"children": [
					{
						"type": "tabset",
						"weight": 40,
						"children": [
							{
								"type": "tab",
								"name": "Dipole",
								"component": "text",
							}
						]
					},
					{
						"type": "tabset",
						"weight": 60,
						"children": [
							{
								"type": "tab",
								"name": "3D",
								"component": "HNNInstantiated",
							}
						]
					}
				]
			}
		]
	},
	"borders": [
		{
			"type": "border",
			"location": "right",
			"size": 100,
			"children": [],
			"barSize": 35
		}
	]
};


const styles = {
	button: {
		transition: "background-color 150ms cubic-bezier(0.2, 0, 0.1, 1) 0ms",
		padding: "8px",
		top: "8px"
	}
};

class HNNCanvasContainer extends Component {

	constructor (props) {
		super(props);
		this.model = FlexLayout.Model.fromJson(json);
		this.state = {
			modelExist: false,
			network3DVisible: false,
			canvasUpdateRequired: false,
			simulationUpdateRequired: true,
		};
	}

	async componentDidUpdate(prevProps, prevState) {
		const { showCanvas } = this.props;
		const { modelExist } = this.state;
		// when showing the canvas, check if the model has changed
		// to know if we need to re-run simulation or update the canvas
		if (showCanvas && !prevProps.showCanvas && modelExist) {
			const message = 'hnn_geppetto.compare_cfg_to_last_snapshot'
			const { canvasUpdateRequired, simulationUpdateRequired } = await Utils.evalPythonMessage(message, [])
			this.setState({ canvasUpdateRequired, simulationUpdateRequired });
		}
	}


	factory (node) {
		const { showCanvas } = this.props;
		let component = node.getComponent();
		if (component === "text") {
			return (
				<div style={{
					height:'100%',
					display:'flex',
					justifyContent:'center',
					alignItems:'center',
					boxSizing:'border-box',
					backgroundImage: 'url(https://i.imgur.com/KgkzATv.png)',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center'
				}}
				>
				</div>
			);
		}
		else if (component === "HNNInstantiated") {
			return (<HNNInstantiated showCanvas={showCanvas}
									 canvasUpdateHandler={this.canvasUpdateHandler}
									 simulationUpdateHandler={this.simulationUpdateHandler}/>);
		}
	}


	async refreshCanvas() {
		const { simulationUpdateRequired } = this.state;
		if (simulationUpdateRequired) {
			await this.instantiate()
		}
		GEPPETTO.trigger(GEPPETTO.Events.Show_spinner, GEPPETTO.Resources.PARSING_MODEL);
		this.canvasRef.current.engine.updateSceneWithNewInstances(window.Instances);
		this.setState({ canvasUpdateRequired: false });
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
			this.setState({ simulationUpdateRequired: false, modelExist: true });
			GEPPETTO.trigger(GEPPETTO.Events.Hide_spinner);

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
		const { visibility, classes } = this.props;
		const { network3DVisible,  canvasUpdateRequired, simulationUpdateRequired  } = this.state;

		let key = 0;
		let onRenderTabSet = function (node, renderValues) {
			if(node.getType() === "tabset") {
				renderValues.buttons.push(<div key={key} className="fa fa-window-minimize customIconFlexLayout" onClick={() => {
					this.model.doAction(FlexLayout.Actions.moveNode(node.getSelectedNode().getId(), "border_right", FlexLayout.DockLocation.CENTER, 0));
				}} />);
				key++;
			}
		};


		return (

			<div style={{ top:`40px`, height:'100%', position:'absolute', width:'100%', bottom:'0px', visibility }}>

				<div className="flexlayout__border_top"
					 style={{ left:`0px`, top:'25px', width:'100%', height:'50px', position:'absolute', visibility }}>

					<Plots />

					<MaterialIconButton
						disabled={!simulationUpdateRequired}
						onClick={() => this.instantiate()}
						className={" fa fa-rocket " + `${classes.button}`}
						tooltip={simulationUpdateRequired ? "Run simulation" : "Network already simulated"}
					/>

					<MaterialIconButton
						disabled={!canvasUpdateRequired}
						onClick={() => this.refreshCanvas()}
						className={" fa fa-refresh " + `${classes.button}`}
						tooltip={canvasUpdateRequired ? "Update 3D view" : "Latest 3D view"}
					/>

					<MaterialIconButton
						disabled={network3DVisible}
						onClick={() => {
							if(!this.state.network3DVisible) {
								this.refs.layout.addTabWithDragAndDropIndirect("Add the 3D Network to the layout - Drag it.", {
								"name": "3D",
								"component": "HNNInstantiated"
							}, undefined);
						}}}
						className={" fa fa-cube "+ `${classes.button}`}
						tooltip={!network3DVisible ? "Show 3D Canvas" : "3D Canvas already showing"}
					/>


				</div>

					<FlexLayout.Layout
						ref="layout"
						model={this.model}
						factory={this.factory.bind(this)}
						onRenderTabSet={onRenderTabSet}
					/>
			</div>
		)
	}
}
export default withStyles(styles)(HNNCanvasContainer)