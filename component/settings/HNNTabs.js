import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  customTabIndicator: {
    boxSizing: 'border-box',
    minWidth: 64,
    minHeight: 48,
    flex: 1,
    borderRadius: 10,
    marginLeft: 5,
    backgroundColor: theme.palette.primary.light,
    zIndex: -1
  },
  tabLabel: {
    color: "white",
    fontSize: "15px",
  },
  container: { width: "100%" }
});

export default withStyles(styles)(({ value, onChange, classes }) => (
  <span className={classes.container}>
    <Tabs 
      fullWidth 
      value={value} 
      onChange={onChange}
      classes={{ indicator: classes.customTabIndicator }}
    >
      <Tab 
        value='canvas' 
        label="Run Simulation"
        className={classes.tabLabel}
      />
      <Tab
        value='parameters'
        label="Set Parameters"
        className={classes.tabLabel}
      />
    </Tabs>
  </span>
))