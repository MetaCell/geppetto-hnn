import React, { Component } from 'react'
import HNNInstantiated from '../instantiation/HNNInstantiated';
import * as FlexLayout from '../../../../js/components/interface/flexLayout2/src/index';
import Plots from "../general/materialComponents/Plots";
import MaterialIconButton from "../general/materialComponents/IconButtonWithTooltip";

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

export default class HNNCanvasContainer extends Component {

	constructor (props) {
		super(props);
		this.model = FlexLayout.Model.fromJson(json);
		this.state = {
			network3DVisible: false,
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
			return (<HNNInstantiated showCanvas={showCanvas} />);
		}
	}

	render () {
		const { visibility } = this.props;
		const { network3DVisible } = this.state;

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
						disabled={network3DVisible}
						onClick={() => {
							console.log("Test");
							if(!this.state.network3DVisible) {
								this.refs.layout.addTabWithDragAndDropIndirect("Add the 3D Network to the layout - Drag it.", {
								"name": "3D",
								"component": "HNNInstantiated"
							}, undefined);
						}}}
						className={" fa fa-cube"}
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
