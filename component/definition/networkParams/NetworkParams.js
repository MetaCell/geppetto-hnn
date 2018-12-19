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

class NetworkParams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRule: "L2",
      model: metadata.networkParams
    }
  }

  render() {
    const { classes } = this.props;
    const { selectedRule, model } = this.state;

    return (
        <Card
          title="Network parameters"
          subtitle="Define here network parameters"
        >
          <div className={classes.container}>
            <div className={classes.subContainer}>
              <Thumbnail
                name="L2"
                selected={selectedRule == "L2"}
                handleClick={() => this.setState({ selectedRule: "L2" })}
              />
              <Thumbnail
                name="L5"
                selected={selectedRule == "L5"}
                handleClick={() => this.setState({ selectedRule: "L5" })}
              />
              <Thumbnail
                name="cells"
                selected={selectedRule == "cells"}
                handleClick={() => this.setState({ selectedRule: "cells" })}
              />
            </div>
            <div className={classes.subContainerRight}>
              <CreateComponentsFromMetadata {...model[selectedRule]}/>
            </div>
          </div>
        </Card>
    )
  }
}

export default withStyles(styles)(NetworkParams);