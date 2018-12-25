import React, { Component }from 'react';

import EvokedNavigation from './EvokedNavigation';
import Card from '../../general/materialComponents/Card';
import Thumbnail from '../../general/materialComponents/Thumbnail';
import Navigation from '../../general/materialComponents/Navigation';

export default class Inputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: "rhythmicProximal",
    }
    this.models = metadata.inputs;
    this.ruleLabels = Object.keys(metadata.inputs);
    this.tabLabels = Object.keys(metadata.inputs.rhythmicProximal);
  }

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
          
          {selection == "evokedInputs"
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