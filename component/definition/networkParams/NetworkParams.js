import React, { Component } from 'react';

import Metadata from '../../../Metadata';
import Card from '../../general/materialComponents/Card';
import Thumbnail from '../../general/materialComponents/Thumbnail';
import Navigation from '../../general/materialComponents/Navigation';

export default class NetworkParams extends Component {
  static contextType = Metadata;

  state = { selection: "Layer 2/3 Pyramidal" }
  
  models = this.context.networkParams;
  ruleLabels = Object.keys(this.context.networkParams);

  tabIcons = { Weights: "fa fa-bars" }

  render () {
    const { selection } = this.state;

    return (
      <Card
        title="Network parameters"
        subtitle="Define here network parameters"
      >
        <div className="Card">
          <div>
            <div className="breadcrumb"/>
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