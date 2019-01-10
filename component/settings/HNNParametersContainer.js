import React from 'react'
import CellParams from "../definition/cellParams/CellParams";
import NetworkParams from "../definition/networkParams/NetworkParams";
import Run from "../definition/run/Run";
import Inputs from "../definition/inputs/Inputs";

export default ({ visibility }) => (
  <div style={{ width: "100%", visibility, marginTop: "64px" }}>
    <CellParams/>  
    <NetworkParams/>
    <Inputs />
    <Run />
  </div>
)