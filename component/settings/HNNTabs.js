import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  tabsIndicator: {
    backgroundColor: theme.status.active,
  },
  tabLabel: {
    color: "white",
    fontSize: "15px",
  },
  container: {
    width: "100%"
  }
});

export default withStyles(styles)(({ value, onChange, classes }) => (
  <span className={classes.container}>
    <Tabs 
      fullWidth 
      value={value} 
      onChange={onChange}
      classes={{ indicator: classes.tabsIndicator }}
    >
      <Tab 
        value='parameters' 
        label="Set Parameters"
        className={classes.tabLabel} 
      />
      <Tab 
        value='canvas' 
        label="Run Simulation"
        className={classes.tabLabel} 
      />
    </Tabs>
  </span>
))