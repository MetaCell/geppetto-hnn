import React, { Component }from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import EvokedNavigation from './EvokedNavigation';
import Card from '../../general/materialComponents/Card';
import Navigation from '../../general/materialComponents/Navigation';

export default class Inputs extends Component {
  state = {
    selection: "Rhythmic proximal"
  }
  models = metadata.inputs;
  ruleLabels = Object.keys(metadata.inputs);

  render() {
    let model = {}
    const { selection } = this.state;
    const tabLabels = Object.keys(this.models[selection]);

    tabLabels.forEach((tabLabel, index) => model[index] = this.models[selection][tabLabel])

    return (
      <Card
        title="Input Parameters"
        subtitle="Define here input properties"
      >
        <div style={{ width: "100%" }}>
          <BottomNavigation
            showLabels
            value={selection}
            onChange={(event, selection) => this.setState({ selection })}
          >
            {this.ruleLabels.map((rule, index) => (
              <BottomNavigationAction 
                key={rule}
                label={rule} 
                value={rule}
              />
            ))}
          </BottomNavigation>
          
          {selection == "Evoked"
            ? <EvokedNavigation />
            : <Navigation
                models={model}
                selection={selection}
                labels={tabLabels}
                iconList={icons[selection]}
              />
          }
          
        </div>
      </Card>
    )
  }
}

const defaultIcons = [
  "fa fa-heart", 
  "fa fa-bathtub", 
  "fa fa-beer"
];

const icons = {
  "Evoked": defaultIcons,
  "Poisson": defaultIcons,
  "Rhythmic distal": defaultIcons,
  "Rhythmic proximal": defaultIcons,
  "Tonic": ["fa fa-heart", "fa fa-bathtub"],
}