import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import Metadata from '../../../Metadata';
import EvokedNavigation from './EvokedNavigation';
import InputsNavigation from './InputsNavigation';
import Card from '../../common/materialComponents/Card';

export default class Inputs extends Component {
  static contextType = Metadata;

  state = { selection: "Evoked", };

  models = this.context.inputs;
  unordered_tabs = Object.keys(this.context.inputs);
  tabs = [
    this.unordered_tabs.find(name => name === "Rhythmic distal"),
    this.unordered_tabs.find(name => name === "Rhythmic proximal"),
    this.unordered_tabs.find(name => name === "Tonic"),
    this.unordered_tabs.find(name => name === "Poisson"),
    this.unordered_tabs.find(name => name === "Evoked")
  ];
  
  tabIcons = {
    "Evoked": "fa fa-cubes",
    "Poisson": "fa fa-cube",
    "Tonic": "fa fa-cube",
    "Rhythmic proximal": "fa fa-cube",
    "Rhythmic distal": "fa fa-cube"
  };

  render () {
    const { selection } = this.state;

    return (
      <Card
        title="Input Parameters"
        subtitle="Define here input properties"
      >
        <div style={{ width: "100%" }}>
          <BottomNavigation
            showLabels
            value={selection}
            style={{ marginBottom: "40px" }}
            onChange={(event, selection) => this.setState({ selection })}
          >
            {this.tabs.map(tab => (
              <BottomNavigationAction 
                key={tab}
                label={tab}
                value={tab}
                icon={<Icon className={this.tabIcons[tab]}/>}
              />
            ))}
          </BottomNavigation>
          
          {selection == "Evoked"
            ? <EvokedNavigation />
            : <InputsNavigation models={this.models[selection]} />
          }
          
        </div>
      </Card>
    )
  }
}
