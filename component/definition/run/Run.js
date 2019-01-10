import React, { Component } from 'react';

import Metadata from '../../../Metadata';
import Card from '../../general/materialComponents/Card';
import Navigation from '../../general/materialComponents/Navigation';

export default class Run extends Component {
  static contextType = Metadata;
  
  models = this.context.run;
  tabLabels = Object.keys(this.context.run)

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