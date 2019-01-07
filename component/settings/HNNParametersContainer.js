import React, { Component } from 'react'
import CellParams from "../definition/cellParams/CellParams";
import NetworkParams from "../definition/networkParams/NetworkParams";
import SynapticGain from "../definition/synapticGain/SynapticGain";
import Run from "../definition/run/Run";
import Inputs from "../definition/inputs/Inputs";

export default class HNNParametersContainer extends Component {
	render () {
		return (
			<div style={{ width: "100%" }}>
				<CellParams />
				<NetworkParams />
				<SynapticGain />
				<Run />
				<Inputs />
			</div>
		)
	}
}
