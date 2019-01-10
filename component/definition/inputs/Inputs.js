import React, { Component }from 'react';
import Icon from '@material-ui/core/Icon';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import EvokedNavigation from './EvokedNavigation';
import InputsNavigation from './InputsNavigation';
import Card from '../../general/materialComponents/Card';

export default class Inputs extends Component {
  state = {
    selection: "Evoked",
  }
  models = metadata.inputs;
  
  tabs = Object.keys(metadata.inputs);
  
  tabIcons = {
    Evoked: "fa fa-bars",
    Poisson: "fa fa-bars",
    Tonic: "fa fa-bars",
    "Rhythmic proximal": "fa fa-bars",
    "Rhythmic distal": "fa fa-bars"
  }

  render() {
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