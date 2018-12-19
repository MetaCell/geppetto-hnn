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

export default withStyles(styles)(({ classes }) => (
  <Card
    title="Synaptic gains"
    subtitle="Scale synaptic gains by group"
  >
    <div className={classes.container}>
      <div className={classes.subContainer}>
        <Thumbnail
          name="Gains"
          handleClick={() => {}}
        />
      </div>
      <div className={classes.subContainer}>
        <CreateComponentsFromMetadata {...metadata.synapticGain}/>
      </div>
    </div>
  </Card>
));
  