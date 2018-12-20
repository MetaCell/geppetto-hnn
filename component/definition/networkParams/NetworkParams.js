import React, { Component }from 'react';

import Card from '../../general/materialComponents/Card';
import Thumbnail from '../../general/materialComponents/Thumbnail';
import CreateComponentsFromMetadata from '../../general/CreateComponentsFromMetadata';

export default class NetworkParams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: "L2",
    }
    this.models = metadata.networkParams;
    this.ruleLabels = Object.keys(metadata.networkParams);
  }

  render() {
    const { selection } = this.state;

    return (
      <Card
        title="Network parameters"
        subtitle="Define here network parameters"
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
};