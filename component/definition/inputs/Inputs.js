import React, { Component }from 'react';

import EvokedNavigation from './EvokedNavigation';
import Card from '../../general/materialComponents/Card';
import Thumbnail from '../../general/materialComponents/Thumbnail';
import Navigation from '../../general/materialComponents/Navigation';

export default class Inputs extends Component {
  state = {
    selection: "Rhythmic proximal"
  }
  models = metadata.inputs;
  ruleLabels = Object.keys(metadata.inputs);
  tabLabels = Object.keys(metadata.inputs["Rhythmic proximal"]);

  render() {
    const { selection } = this.state;

    let model = {}
    this.tabLabels.forEach((tabLabel, index) => model[index] = this.models[selection][tabLabel])

    return (
      <Card
        title="Input Parameters"
        subtitle="Define here input properties"
      >
        <div className="Card">
          <Thumbnail 
            selected={selection}
            names={this.ruleLabels}
            handleClick={selection => this.setState({ selection })}
          />
          
          {selection == "Evoked"
            ? <EvokedNavigation />
            : <Navigation
                models={model}
                selection={selection}
                labels={this.tabLabels}
                iconList={["fa fa-heart", "fa fa-bathtub", "fa fa-beer"]}
              />
          }
          
        </div>
      </Card>
    )
  }
}