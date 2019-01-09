import React, { Component } from 'react';

import Card from '../../general/materialComponents/Card';
import Navigation from '../../general/materialComponents/Navigation';

export default class Run extends Component {
  models = metadata.run;
  tabLabels = Object.keys(metadata.run)

  tabIcons = {
    Analysis: "fa fa-heart", 
    Cells: "fa fa-bathtub", 
    Gain: "fa fa-bars", 
    Run: "fa fa-shower"
  }

	render () {
    
		return (
			<Card
				title="Simulation parameters"
				subtitle="Define here running parameters"
			>
				<div className="Card">
					<div>
            <Navigation
              models={this.models}
              tabIcons={this.tabIcons}
            />
					</div>
				</div>
			</Card>
		)
	}
}