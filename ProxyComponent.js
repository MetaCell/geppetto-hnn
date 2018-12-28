import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

import Run from './component/definition/run/Run';
import Inputs from './component/definition/inputs/Inputs';
import CellParams from './component/definition/cellParams/CellParams';
import HNNInstantiated from './component/instantiation/HNNInstantiated';
import SynapticGain from './component/definition/synapticGain/SynapticGain';
import NetworkParams from './component/definition/networkParams/NetworkParams';


export default class ProxyComponent extends Component {
  state = {
    showCanvas: false,
  }

  switchViews = this.switchViews.bind(this);
  switchViews() {
    this.setState( oldState =>({ showCanvas: !oldState.showCanvas }))
  }

  render() {
    const { showCanvas } = this.state;
    return (
      <div>
        <span style={{ visibility: showCanvas ? "hidden" : "visible" }}>
          <CellParams />
          <NetworkParams />
          <SynapticGain/>
          <Run/>
          <Inputs/>
          <Button onClick={this.switchViews}>Go to 3D canvas</Button>
        </span>
        
        <HNNInstantiated showCanvas={showCanvas} handleGoBack={this.switchViews}/>
      </div>
    )
  }
}
