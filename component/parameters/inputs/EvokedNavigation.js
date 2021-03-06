import React, { Component } from 'react';

import AddInput from './AddInput';
import Utils from '../../../Utils';
import Metadata from '../../../Metadata';
import DynamicThumbnail from './DynamicThumbnail';
import Navigation from '../../common/materialComponents/Navigation';
import { PROXIMAL, DISTAL } from "../../common/constants";


export default class EvokedNavigation extends Component {
  static contextType = Metadata;
  constructor (props, context) {
    super(props);
    this.state = { 
      value: PROXIMAL + '_1',
      evokedInputLabels: []
    };

    this[DISTAL] = context.inputs.Evoked.items.distalInput;
    this[PROXIMAL] = context.inputs.Evoked.items.proximalInput;
    
    this.tabIcons = {
      Statistics: "fa fa-bars",
      Weights: "fa fa-bars"
    }
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
      Object.keys(clonedMetadata).forEach(tab =>
        clonedMetadata[tab].children.forEach(child => child.id = child.id.replace("{}", value))
      )
      return clonedMetadata
    } else {
      return false
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { value, evokedInputLabels } = this.state;
    return nextState.evokedInputLabels.length !== evokedInputLabels.length || nextState.value !== value;
  }


  render () {
    const { value, evokedInputLabels } = this.state;
    const models = this.populateIdMetadataFields();

    let idToName = function (id) {
      let name = id.replace("evprox_", "Proximal ");
      return name !== id ? name : id.replace("evdist_", "Distal ")
    };

    return (
      <div className="Card">
        <div>
          <AddInput addInput={type => this.addInput(type)} />
          
          {evokedInputLabels.map(label => (
            <DynamicThumbnail
              key={label}
              id={label}
              name={idToName(label)}
              selected={value}
              handleDelete={input => this.removeInput(input)}
              handleSelect={value => this.setState({ value })}
            />)
          )}
        </div>

        <Navigation
          models={models}
          tabIcons={this.tabIcons}
        />
        
      </div>
    );
  }
}
