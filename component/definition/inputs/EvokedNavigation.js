import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import Utils from '../../../Utils';
import NavigationActions from './NavigationActions';
import { PROXIMAL, DISTAL } from "../../general/constants";
import CreateComponentsFromMetadata from '../../general/CreateComponentsFromMetadata';

export default class EvokedNavigation extends React.Component {
	constructor (props) {
		super(props);
		this.state = { 
			value: PROXIMAL + '_1',
			evokedInputLabels: []
		};

		this.empty = { children: [] };
		this.addInput = this.addInput.bind(this);
		this.removeInput = this.removeInput.bind(this);
		this[DISTAL] = metadata.inputs.evokedInputs.items.distalInput;
		this[PROXIMAL] = metadata.inputs.evokedInputs.items.proximalInput;
	}

	async componentDidMount (){
		const evokedInputLabels = await Utils.evalPythonMessage("hnn_geppetto.getEvokedInputs", [])
		this.setState({ evokedInputLabels })
	}

	async addInput (input_type){
		const { inputs, selected_input } = await Utils.evalPythonMessage("hnn_geppetto.addEvokedInput", [input_type])
		this.setState({ 
			evokedInputLabels: inputs,
			value: selected_input
		})
	}

	async removeInput (input_name) {
		let value;
		const evokedInputLabels = await Utils.evalPythonMessage("hnn_geppetto.removeEvokedInput", [input_name])
		if (evokedInputLabels.length > 0) {
			value = evokedInputLabels[0]
		}
		this.setState({ evokedInputLabels, value })
	}

	populateIdMetadataFields (){
		const { value, evokedInputLabels } = this.state;
		if (evokedInputLabels.length > 0) {
			const selectedMetadata = value.replace(/[0-9_]/g, '');
			let clonedMetadata = JSON.parse(JSON.stringify(this[selectedMetadata]))
			clonedMetadata.children.forEach(child => child.id = child.id.replace("{}", value))
			return clonedMetadata
		}
		else {
			return this.empty
		}
    
	}

	render () {
		const { value, evokedInputLabels } = this.state;
		const model = this.populateIdMetadataFields();
		return (
			<div>
				<NavigationActions
					value={value}
					addInput={this.addInput}
					removeInput={this.removeInput}
					evokedInputLabels={evokedInputLabels}
				/>

				<Tabs
					fullWidth
					scrollable
					value={value}
					textColor="primary"
					indicatorColor="primary"
					onChange={(event, value) => this.setState({ value })}
				>
					{evokedInputLabels.map((label, index) => 
						(<Tab 
							key={label}
							label={label} 
							value={label}
						/>)
					)}
				</Tabs>

				<div>
					{CreateComponentsFromMetadata(model)}
				</div>
			</div>
		);
	}
}