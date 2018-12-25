import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Run from './component/definition/run/Run';
import Inputs from './component/definition/inputs/Inputs';
import CellParams from './component/definition/cellParams/CellParams';
import NetworkParams from './component/definition/networkParams/NetworkParams';
import SynapticGain from './component/definition/synapticGain/SynapticGain';
import HNNAppBar from './component/settings/HNNAppBar';
import HNNInstantiated from './component/instantiation/HNNInstantiated';

export default class ProxyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "parameters",
    }
  }
  render() {
    const { view } = this.state;
    var content;
    if (view == "parameters") {
      content = (
        <div>
          <HNNAppBar/>
          <CellParams />
          <NetworkParams />
          <SynapticGain/>
          <Run/>
          <Inputs/>
          <Button onClick={()=> this.setState({ view: 'canvas'})}>Go to 3D canvas</Button>
        </div>
      )
    }
    else if (view == "canvas") {
      content = <HNNInstantiated />
    }
    return (
      <div>
        {content}
      </div>
    )
  }
}
