import React, { Component }from 'react';
import Card from '../../general/materialComponents/Card';
import Thumbnail from '../../general/materialComponents/Thumbnail';
import RHS from './RHS';
import { withStyles } from '@material-ui/core';


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

class CellParams extends Component {
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
              name="L2PyrRule"
              selected={selectedRule == "L2"}
              handleClick={() => this.setState({ selectedRule: "L2" })}
            />
            <Thumbnail
              name="L5PyrRule"
              selected={selectedRule == "L5"}
              handleClick={() => this.setState({ selectedRule: "L5" })}
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

export default withStyles(styles)(CellParams);