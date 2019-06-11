import React from 'react'
import CellParams from "../parameters/cellParams/CellParams";
import NetworkParams from "../parameters/networkParams/NetworkParams";
import Run from "../parameters/run/Run";
import Inputs from "../parameters/inputs/Inputs";

export default ({ visibility }) => (
  <div style={{ width: "100%", visibility, marginTop: "64px" }}>
    <CellParams />
    <NetworkParams />
    <Inputs />
    <Run />
  </div>
)
