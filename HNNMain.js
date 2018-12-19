import React from 'react';
import CellParams from './component/definition/cellParams/CellParams';
import NetworkParams from './component/definition/networkParams/NetworkParams';
import SynapticGain from './component/definition/synapticGain/SynapticGain';
import Run from './component/definition/run/Run';

export default ({ data }) => {
  if (data == undefined) {
    return <div/>
  }
  else {
    window.isDocker = data.isDocker;
    window.metadata = data.metadata;
    window.currentFolder = data.currentFolder;
    return (
      <div>
        <CellParams/>
        <NetworkParams/>
        <SynapticGain/>
        <Run/>
      </div>
    )
  }
}