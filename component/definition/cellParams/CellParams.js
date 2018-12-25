import React, { Component }from 'react';

import Card from '../../general/materialComponents/Card';
import Thumbnail from '../../general/materialComponents/Thumbnail';
import Navigation from '../../general/materialComponents/Navigation';

export default class CellParams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: "L2",
    }
    this.models = metadata.cellParams;
    this.ruleLabels = Object.keys(metadata.cellParams);
    this.tabLabels = Object.keys(metadata.cellParams.L2)
  }
  
  render() {
    const { selection } = this.state;

    let model = {}
    this.tabLabels.forEach((tabLabel, index) => model[index] = this.models[selection][tabLabel])

    return (
      <Card
        title="Cell Parameters"
        subtitle="Define here cell properties"
      >
        <div className="Card">
          <Thumbnail 
            selected={selection}
            names={this.ruleLabels}
            handleClick={selection => this.setState({ selection })}
          />

          <Navigation
            models={model}
            selection={selection}
            iconList={["fa fa-heart", "fa fa-bathtub", "fa fa-beer"]}
            labels={this.tabLabels}
          />
        </div>
      </Card>
    )
  }
}
