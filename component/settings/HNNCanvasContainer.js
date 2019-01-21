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
						"weight": 50,
						"children": [
							{
								"type": "tab",
								"name": "FX",
								"component": "text",
							}
						]
					},
					{
						"type": "tabset",
						"weight": 50,
						"children": [
							{
								"type": "tab",
								"name": "FI",
								"component": "text",
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
					backgroundColor:'#222',
					border:'1px solid #555',
					boxSizing:'border-box'
				}}
				>
Panel 
					
					
					{' '}
					{node.getName()}
				</div>
			);
		}
		else if (component === "HNNInstantiated") {
			return (<HNNInstantiated showCanvas={showCanvas} />);
		}
	}

	render () {
		return (
			<div style={{top:`40px`, height:'100%', position:'absolute', width:'100%', bottom:'0px'}}>
				<FlexLayout.Layout
					model={this.model}
					factory={this.factory.bind(this)}
				/>
			</div>
		)
	}
}
