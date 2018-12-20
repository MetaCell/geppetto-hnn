import React, { Component }from 'react';

import Card from '../../general/materialComponents/Card';
import Thumbnail from '../../general/materialComponents/Thumbnail';
import CreateComponentsFromMetadata from '../../general/CreateComponentsFromMetadata';

export default class Run extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: "Run",
    };
    this.models = metadata.run;
    this.ruleLabels = Object.keys(metadata.run);
  }

  render() {
    const { selection } = this.state;

    return (
      <Card
        title="Simulation parameters"
        subtitle="Define here running parameters"
      >
        <div className="Card">
          <div >
            <Thumbnail 
              selected={selection}
              names={this.ruleLabels}
              handleClick={selection => this.setState({ selection })}
            />
          </div>
          <div >
            <CreateComponentsFromMetadata {...this.models[selection]}/>
          </div>
        </div>
      </Card>
    )
  }
}