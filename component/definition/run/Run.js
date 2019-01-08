import React, { Component } from 'react';

import Card from '../../general/materialComponents/Card';
import Navigation from '../../general/materialComponents/Navigation';

export default class Run extends Component {
	state = { selection: "Run" };
  models = metadata.run;
  tabLabels = Object.keys(metadata.run)

	render () {
    let model = {}
    this.tabLabels.forEach((tabLabel, index) => model[index] = this.models[tabLabel])

		return (
			<Card
				title="Simulation parameters"
				subtitle="Define here running parameters"
			>
				<div className="Card">
					<div>
            <Navigation
              models={model}
              iconList={["fa fa-heart", "fa fa-bathtub", "fa fa-bars", "fa fa-shower"]}
              labels={this.tabLabels}
            />
					</div>
				</div>
			</Card>
		)
	}
}