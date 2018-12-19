import React, { Component }from 'react';
import { withStyles } from '@material-ui/core';

import Card from '../../general/materialComponents/Card';
import Thumbnail from '../../general/materialComponents/Thumbnail';
import CreateComponentsFromMetadata from '../../general/CreateComponentsFromMetadata';

const styles = {
  container: {
    display: "flex", 
    flexDirection: "row", 
    width: "100%"
  },
  subContainer: {
    flex: 1
  },
  subContainerRight: {
    flex: 1,
    marginTop: "10px"
  }
}

class Run extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRule: "Run",
      models: metadata.run
    }
  }

  render() {
    const { classes } = this.props;
    const { selectedRule, models } = this.state;

    return (
        <Card
          title="Simulation parameters"
          subtitle="Define here running parameters"
        >
          <div className={classes.container}>
            <div className={classes.subContainer}>
              <Thumbnail
                name="Run"
                selected={selectedRule == "Run"}
                handleClick={() => this.setState({ selectedRule: "Run" })}
              />
              <Thumbnail
                name="Analysis"
                selected={selectedRule == "Analysis"}
                handleClick={() => this.setState({ selectedRule: "Analysis" })}
              />
            </div>
            <div className={classes.subContainer}>
              <CreateComponentsFromMetadata {...models[selectedRule]}/>
            </div>
          </div>
        </Card>
    )
  }
}

export default withStyles(styles)(Run);