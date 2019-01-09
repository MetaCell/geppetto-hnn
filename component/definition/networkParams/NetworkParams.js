import React, { Component } from 'react';

import Card from '../../general/materialComponents/Card';
import Thumbnail from '../../general/materialComponents/Thumbnail';
import Navigation from '../../general/materialComponents/Navigation';
import CreateComponentsFromMetadata from '../../general/CreateComponentsFromMetadata';

export default class NetworkParams extends Component {
	state = { selection: "Layer 2/3" }
	models = metadata.networkParams;
  ruleLabels = Object.keys(metadata.networkParams);

  tabIcons = {
    Weights: "fa fa-bars"
  }

	render () {
		const { selection } = this.state;

		return (
			<Card
				title="Network parameters"
				subtitle="Define here network parameters"
			>
				<div className="Card">
					<div>
						<Thumbnail 
							selected={selection}
							names={this.ruleLabels}
							handleClick={selection => this.setState({ selection })}
						/>
					</div>

          <Navigation
            tabIcons={this.tabIcons}
            models={this.models[selection]}
          />
				
				</div>
			</Card>
		)
	}
}	
{/* <div>
<CreateComponentsFromMetadata {...this.models[selection]} />
</div> */}