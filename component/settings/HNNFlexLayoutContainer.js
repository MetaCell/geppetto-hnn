import React, { Component } from 'react'
import HNNInstantiated from '../instantiation/HNNInstantiated';
import * as FlexLayout from '../../../../js/components/interface/flexLayout2/src/index';
import Plots from "../general/materialComponents/Plots";
import MaterialIconButton from "../general/materialComponents/IconButtonWithTooltip";
import Utils from "../../Utils";
import {withStyles} from "@material-ui/core";
import Rnd from "react-rnd";

const json = {
	"global": {
		sideBorders: 8
	},
	"layout": {
		"type": "row",
		"weight": 100,
		"id": "root",
		"children": [
			{
				"type": "row",
				"weight": 100,
				"id": "top",
				"children": [
					{
						"type": "tabset",
						"weight": 40,
						"children": [
							{
								"type": "tab",
								"name": "Dipole",
								"component": "DipoleIframe",
							}
						]
					},
					{
						"type": "tabset",
						"weight": 60,
						"id": "bottom",
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
			"location": "bottom",
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
		top: "0"
	}
};

class HNNFlexLayoutContainer extends Component {


	constructor (props) {
		super(props);
		this.model = FlexLayout.Model.fromJson(json);
		this.state = {
			modelExist: false,
			canvasUpdateRequired: false,
			simulationUpdateRequired: true,
			dipoleHTML: null,
			tracesHTML: null,
			psdHTML: null,
			rasterHTML: null,
			spectrogramHTML: null,
			hnnInstantiatedVisible: true,
			dipoleIframeVisible: true,
			tracesIframeVisible: false,
			psdIframeVisible: false,
			rasterIframeVisible: false,
			spectrogramIframeVisible: false,
		};
	}

	async componentDidMount(prevProps, prevState) {
		const { dipoleHTML } = this.state;

		if (dipoleHTML===null) {
			const message = 'hnn_geppetto.get_dipole_plot';

			Utils.evalPythonMessage(message,[]).then(response => {
				let html_quoted = response.replace(/\\n/g, '').replace(/\\/g, '');
				let html = html_quoted.substring(1, html_quoted.length-1);
				this.setState({ dipoleHTML: html });
			  })
		}
	}

	async componentDidUpdate(prevProps, prevState) {
		const { showCanvas } = this.props;
		const { modelExist } = this.state;
		// when showing the canvas, check if the model has changed
		// to know if we need to re-run simulation or update the canvas
		if (showCanvas && !prevProps.showCanvas && modelExist) {
			const message = 'hnn_geppetto.compare_cfg_to_last_snapshot';
			const { canvasUpdateRequired, simulationUpdateRequired } = await Utils.evalPythonMessage(message, []);
			this.setState({ canvasUpdateRequired, simulationUpdateRequired });
		}

		if((this.state.dipoleIframeVisible !== prevState.dipoleIframeVisible) && this.state.dipoleIframeVisible) {
			this.refs.layout.addTabToTabSet("bottom",{
				"name": "Dipole",
				"component": "DipoleIframe"
			});
		}
		if((this.state.tracesIframeVisible !== prevState.tracesIframeVisible) && this.state.tracesIframeVisible) {
			this.refs.layout.addTabToTabSet("bottom",{
				"name": "Traces",
				"component": "TracesIframe"
			});
		}
		if((this.state.psdIframeVisible !== prevState.psdIframeVisible) && this.state.psdIframeVisible) {
			this.refs.layout.addTabToTabSet("bottom",{
				"name": "PSD",
				"component": "PSDIframe"
			});
		}
		if((this.state.rasterIframeVisible !== prevState.rasterIframeVisible) && this.state.rasterIframeVisible) {
			this.refs.layout.addTabToTabSet("bottom",{
				"name": "Raster",
				"component": "RasterIframe"
			});
		}
		if((this.state.spectrogramIframeVisible !== prevState.spectrogramIframeVisible) && this.state.spectrogramIframeVisible) {
			this.refs.layout.addTabToTabSet("bottom",{
				"name": "Spectrogram",
				"component": "SpectrogramIframe"
			});
		}

		if((this.state.hnnInstantiatedVisible !== prevState.hnnInstantiatedVisible) && this.state.hnnInstantiatedVisible) {
			this.refs.layout.addTabWithDragAndDropIndirect("Add the 3D Network to the layout - Drag it.", {
				"name": "3D",
				"component": "HNNInstantiated"
			}, this.setState({simulationUpdateRequired: true}));
		}
	
	}


	factory (node) {
		const { showCanvas } = this.props;
		const { dipoleHTML, tracesHTML, psdHTML, rasterHTML, spectrogramHTML } = this.state;
		let component = node.getComponent();
		let loadingSpinner =
			(
			<div style={{textAlign: "center"}}>
				<i style= {{color: "#802989"}} className='fa fa-spinner fa-spin fa-5x'/>
			</div>
			);
		if (component === "DipoleIframe" ) {
			if (dipoleHTML === null) {
				return loadingSpinner
			}
			node.setEventListener("close", () => {
				this.setState({
					dipoleIframeVisible: false,
				});
			});
			return (
				<div style={{width: '100%', height: '100%', textAlign: "center"}}>
					<iframe srcDoc={dipoleHTML} style={{border: 0, width: '100%', height: '100%'}}/>
				</div>  	
			);
		}
		if (component === "TracesIframe" ) {
			if (tracesHTML === null) {
				return loadingSpinner
			}
			node.setEventListener("close", () => {
				this.setState({
					tracesIframeVisible: false,
				});
			});
			return (
				<div style={{width: '100%', height: '100%', textAlign: "center"}}>
					<iframe srcDoc={tracesHTML} style={{border: 0, width: '100%', height: '100%'}}/>
				</div>
			);
		}
		if (component === "TracesIframe" ) {
			if (tracesHTML === null) {
				return loadingSpinner
			}
			node.setEventListener("close", () => {
				this.setState({
					tracesIframeVisible: false,
				});
			});
			return (
				<div style={{width: '100%', height: '100%', textAlign: "center"}}>
					<iframe srcDoc={tracesHTML} style={{border: 0, width: '100%', height: '100%'}}/>
				</div>
			);
		}
		if (component === "PSDIframe" ) {
			if (psdHTML === null) {
				return loadingSpinner
			}
			node.setEventListener("close", () => {
				this.setState({
					psdIframeVisible: false,
				});
			});
			return (
				<div style={{width: '100%', height: '100%', textAlign: "center"}}>
					<iframe srcDoc={psdHTML} style={{border: 0, width: '100%', height: '100%'}}/>
				</div>
			);
		}
		if (component === "RasterIframe" ) {
			if (rasterHTML === null) {
				return loadingSpinner
			}
			node.setEventListener("close", () => {
				this.setState({
					rasterIframeVisible: false,
				});
			});
			return (
				<div style={{width: '100%', height: '100%', textAlign: "center"}}>
					<iframe srcDoc={rasterHTML} style={{border: 0, width: '100%', height: '100%'}}/>
				</div>
			);
		}
		if (component === "SpectrogramIframe" ) {
			if (spectrogramHTML === null) {
				return loadingSpinner
			}
			node.setEventListener("close", () => {
				this.setState({
					spectrogramIframeVisible: false,
				});
			});

			return (
				<div style={{width: '100%', height: '100%', textAlign: "center"}}>
					<iframe srcDoc={spectrogramHTML} style={{border: 0, width: '100%', height: '100%'}}/>
				</div>
			);
		}
		else if (component === "HNNInstantiated") {
			node.setEventListener("close", () => {
				this.setState({
					hnnInstantiatedVisible: false,
					canvasUpdateRequired: false,
					simulationUpdateRequired: false,
				});
			});
			return (<HNNInstantiated showCanvas={showCanvas}/>);
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
		const response = await Utils.evalPythonMessage('hnn_geppetto.instantiateModelInGeppetto', []);

		if (!this.processError(response)) {
			GEPPETTO.trigger(GEPPETTO.Events.Show_spinner, GEPPETTO.Resources.PARSING_MODEL);
			GEPPETTO.Manager.loadModel(response);
			GEPPETTO.CommandController.log("The model instantiation was completed");
			this.setState({ simulationUpdateRequired: false, modelExist: true });
			GEPPETTO.trigger(GEPPETTO.Events.Hide_spinner);

		}
	}

	processError (response) {
		let parsedResponse = Utils.getErrorResponse(response);
		if (parsedResponse) {
			GEPPETTO.trigger(GEPPETTO.Events.Hide_spinner);
			this.setState({ openErrorDialog: true, errorMessage: parsedResponse['message'], errorDetails: parsedResponse['details'] });
			return true;
		}
		return false;
	}

	dipoleHandler() {
		this.setState({
			dipoleIframeVisible: true
		})
	}

	tracesHandler() {
		if (this.state.tracesHTML===null) {
			const message = 'hnn_geppetto.get_traces_plot';
			Utils.evalPythonMessage(message,[]).then(response => {
				let html_quoted = response.replace(/\\n/g, '').replace(/\\/g, '');
				let html = html_quoted.substring(1, html_quoted.length-1);
				this.setState({ tracesHTML: html, tracesIframeVisible: true });
			})
		}
	}
	psdHandler() {
		if (this.state.psdHTML===null) {
			const message = 'hnn_geppetto.get_psd_plot';

			Utils.evalPythonMessage(message,[]).then(response => {
				let html_quoted = response.replace(/\\n/g, '').replace(/\\/g, '');
				let html = html_quoted.substring(1, html_quoted.length-1);
				this.setState({ psdHTML: html, psdIframeVisible: true });
			})
		}
	}
	rasterHandler() {
		if (this.state.rasterHTML===null) {
			const message = 'hnn_geppetto.get_raster_plot';

			Utils.evalPythonMessage(message,[]).then(response => {
				let html_quoted = response.replace(/\\n/g, '').replace(/\\/g, '');
				let html = html_quoted.substring(1, html_quoted.length-1);
				this.setState({ rasterHTML: html, rasterIframeVisible: true });
			})
		}
	}
	spectrogramHandler() {
		if (this.state.spectrogramHTML===null) {
			const message = 'hnn_geppetto.get_spectrogram_plot';

			Utils.evalPythonMessage(message,[]).then(response => {
				let html_quoted = response.replace(/\\n/g, '').replace(/\\/g, '');
				let html = html_quoted.substring(1, html_quoted.length-1);
				this.setState({ spectrogramHTML: html, spectrogramIframeVisible: true });
			})
		}
	}

	render () {
		const { visibility, classes } = this.props;
		const { hnnInstantiatedVisible,  canvasUpdateRequired, simulationUpdateRequired  } = this.state;

		const plotList = [
			{
				title: "Dipole",
				subtitle: "Dipole plot",
				handler: this.dipoleHandler.bind(this)
			},
			{
				title: "Traces",
				subtitle: "Traces plot",
				handler: this.tracesHandler.bind(this)
			},
			{
				title: "PSD",
				subtitle: "Power spectral density plot",
				handler: this.psdHandler.bind(this)
			},
			{
				title: "Raster",
				subtitle: "Raster plot",
				handler: this.rasterHandler.bind(this)
			},
			{
				title: "Spectrogram",
				subtitle: "Spectrogram plot",
				handler: this.spectrogramHandler.bind(this)
			},
		];

		let key = 0;
		let onRenderTabSet = function (node, renderValues) {
			if(node.getType() === "tabset") {
				renderValues.buttons.push(<div key={key} className="fa fa-window-minimize customIconFlexLayout" onClick={() => {
					this.model.doAction(FlexLayout.Actions.moveNode(node.getSelectedNode().getId(), "border_bottom", FlexLayout.DockLocation.CENTER, 0));
				}} />);
				key++;
			}
		};

		let clickOnBordersAction = function (node) {
			let idChild = 0;
			let bottomChild = 0;
			let tempModel = node.getModel();
			let modelChildren = tempModel.getRoot().getChildren();
			if (node instanceof FlexLayout.TabNode || node instanceof FlexLayout.TabSetNode) {

				for(let i=0; i <= (modelChildren.length - 1); i++) {
					if(modelChildren[i].getRect().getBottom() > bottomChild) {
						bottomChild = modelChildren[i].getRect().getBottom();
						idChild = i;
					}
				}

				let component = node.getComponent();
				let toNode = modelChildren[idChild];
				if (toNode instanceof FlexLayout.TabSetNode || toNode instanceof FlexLayout.BorderNode || toNode instanceof FlexLayout.RowNode) {
					let location = component === "DipoleIframe" ? FlexLayout.DockLocation.TOP : FlexLayout.DockLocation.BOTTOM
					this.model.doAction(FlexLayout.Actions.moveNode(node.getId(), toNode.getId(), location, 0));
				}
			}
		};

		let displayVisibility = visibility==="hidden" ? "none" : "block";

		return (
			<div style={{ top:`65px`, height:'100%', position:'absolute', width:'100%', bottom:'0px', visibility, display: displayVisibility }}>
				<Rnd
					enableResizing={{
						top: false, right: false, bottom: false, left: false,
						topRight: false, bottomRight: false, bottomLeft: false,
						topLeft: false
					}}
					default={{
						x: 0, y: 0,
						height: 40,
						width: '100%'
					}}
					style={{zIndex:'99', marginBottom:'8px'}}
					className="HNNToolBarClass"
					disableDragging={true}
					ref={e => { this.rnd = e; }} >
					<div style={{ float:'right', marginRight:'30px'}}>
						<Plots plots={plotList} />
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
							disabled={hnnInstantiatedVisible}
							onClick={() => {
								this.setState({
									hnnInstantiatedVisible: true,
								});
							}}
							className={" fa fa-cube "+ `${classes.button}`}
							tooltip={!hnnInstantiatedVisible ? "Show 3D Canvas" : "3D Canvas already showing"}
						/>
					</div>
				</Rnd>
				<div style={{ top:`0`, height:'93%', position:'absolute', width:'100%', bottom:'0px', visibility, display: displayVisibility }}>
					<FlexLayout.Layout
						ref="layout"
						model={this.model}
						factory={this.factory.bind(this)}
						onRenderTabSet={onRenderTabSet}
						clickOnBordersAction={clickOnBordersAction}
					/>
				</div>
			</div>
		)
	}
}
export default withStyles(styles)(HNNFlexLayoutContainer)
