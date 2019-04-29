import React, { Component } from 'react';

import Metadata from '../../../Metadata';
import Card from '../../general/materialComponents/Card';
import Navigation from '../../general/materialComponents/Navigation';

export default class Run extends Component {
  static contextType = Metadata;
  
  models = this.context.run;
  tabLabels = Object.keys(this.context.run)

  tabIcons = {
    Analysis: "gpt-analysis2", 
    Cells: "gpt-3dshow", 
    Gain: "fa fa-sort", 
    Run: "gpt-gpt_logo"
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