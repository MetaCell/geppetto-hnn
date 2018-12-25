import React, { Component }from 'react';

import Card from './materialComponents/Card';
import Navigation from './materialComponents/Navigation';
import Thumbnail from './materialComponents/Thumbnail';

export default class CreateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: props.initialRule,
    }
    this.models = metadata[props.metadataName];
    this.ruleLabels = Object.keys(metadata[props.metadataName]);
    this.tabLabels = Object.keys(metadata[props.metadataName][props.initialRule]);
  }
  
  render() {
    const { selection } = this.state;
    const { cardTitle, cardSubtitle, metadataName } = this.props;
    
    let model = {}
    this.tabLabels.forEach((tabLabel, index) => model[index] = this.models[selection][tabLabel])

    return (
      <Card
        title={cardTitle}
        subtitle={cardSubtitle}
      >
        <div className="Card">
          <Thumbnail 
            names={this.ruleLabels}
            selected={selection}
            handleClick={selection => this.setState({ selection })}
          />

          <Navigation
            models={model}
            selection={selection}
            labels={this.tabLabels}
            iconList={["fa fa-heart", "fa fa-bathtub", "fa fa-beer"]}  
          />
        </div>
      </Card>
    )
  }
}
