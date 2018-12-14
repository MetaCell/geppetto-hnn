import React, { Component }from 'react';
import { withStyles } from '@material-ui/core';
import RHS from './RHS';
import Card from '../../general/materialComponents/Card';
import Thumbnail from '../../general/materialComponents/Thumbnail';

const styles = {
  container: {
    display: "flex", 
    flexDirection: "row", 
    width: "100%"
  },
  subContainer: {
    flex: 1
  }
}

class NetworkParams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRule: "L2"
    }
  }

  render() {
    const { classes } = this.props;
    const { selectedRule } = this.state;

    return (
        <Card
          title="Cell Parameters"
          subtitle="Define here cell properties"
        >
          <div className={classes.container}>
            <div className={classes.subContainer}>
              <Thumbnail
                name="L2"
                selected={selectedRule == "L2"}
                handleClick={() => this.setState({ selected: "L2" })}
              />
              <Thumbnail
                name="L5"
                selected={selectedRule == "L5"}
                handleClick={() => this.setState({ selected: "L5" })}
              />
              <Thumbnail
                name="cells"
                selected={selectedRule == "cells"}
                handleClick={() => this.setState({ selected: "cells" })}
              />
            </div>
            <div className={classes.subContainer}>
              <RHS selection={selectedRule}/>
            </div>
          </div>
        </Card>
    )
  }
}

export default withStyles(styles)(NetworkParams);