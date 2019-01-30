import React from 'react';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  round: {
    width: "120px",
    height: "120px",
    margin: "10px"
  },
  roundLabel: {
    margin: "12px"
  },
  extendedLabel: {
    margin: "0px"
  },
  extended: {
    margin: "10px",
    width: "135px",
    height: "60px"
  }
}

export default withStyles(styles)(({ names, selected, handleClick, variant="round", classes }) => (
  <div>
    {names.map(name => (
      <Fab
        id={name}
        key={name}
        variant={variant}
        onClick={ () => handleClick(name) }
        color={ selected == name ? "primary" : "default" }
        classes={{ root: classes[variant], label: classes[variant+"Label"] }}
      >
        {name}
      </Fab>
    ))}
  </div>
))