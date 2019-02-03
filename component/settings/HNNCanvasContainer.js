import React, { Component } from 'react'
import HNNInstantiated from '../instantiation/HNNInstantiated';
import * as FlexLayout from '../../../../js/components/interface/flexLayout2/src/index';

const json = {
	"global": {},
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
	]
};

export default class HNNCanvasContainer extends Component {

	constructor (props) {
		super(props);
		this.model = FlexLayout.Model.fromJson(json)
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

		return (
			<div style={{ top:`40px`, height:'100%', position:'absolute', width:'100%', bottom:'0px', visibility }}>
				<FlexLayout.Layout
					model={this.model}
					factory={this.factory.bind(this)}
				/>
			</div>
		)
	}
}
