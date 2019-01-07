import React, { Component } from 'react'
import HNNInstantiated from "../instantiation/HNNInstantiated";

export default class HNNCanvasContainer extends Component {
	render () {
		const { showCanvas } = this.props;
		return (
			<div>
				<HNNInstantiated showCanvas={showCanvas} />
			</div>
		)
	}
}
