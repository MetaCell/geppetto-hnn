import React from 'react';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  round: {
    width: "120px",
    height: "120px",
    margin: "10px"
  },
  roundLabel: { margin: "12px", fontWeight: "400" },
  extendedLabel: { margin: "0px" },
  extended: {
    margin: "10px",
    width: "135px",
    height: "60px"
  }
}

export default withStyles(styles)(({ names, selected, handleClick, variant = "round", classes }) => {
  let aux = false;
  if (names && names.length) {
    if (names[0] == "Layer 5" && names.length == 2) {
      aux = Array(2)
      const newOrder = [1, 0]
      newOrder.forEach((i, index) => aux[index] = names[i])

    } else if (names[0] == "Basal 1 dend" && names.length == 8){
      aux = Array(8)
      const newOrder = [1, 2, 4, 6, 7, 0, 5, 3];
      newOrder.forEach((i, index) => aux[index] = names[i])
    
    } else if (names[0] == "Soma" && names.length == 2) {
      // we got this one right
      aux = names;

    } else if (names[0] == "Layer 2/3 Basket" && names.length == 4) {
      aux = Array(4)
      const newOrder = [3, 0, 2, 1];
      newOrder.forEach((i, index) => aux[index] = names[i])
    
    } else if (names[0] == "Timing" && names.length == 3) {
      aux = Array(3)
      const newOrder = [2, 1, 0];
      newOrder.forEach((i, index) => aux[index] = names[i])
    
    } else {
      aux = names
    }  

  } else {
    aux = names
  }
  return (
    <div>
      {aux.map(name => (
        <Fab
          id={name}
          key={name}
          variant={variant}
          onClick={ () => handleClick(name) }
          color={ selected == name ? "primary" : "default" }
          classes={{ root: classes[variant], label: classes[variant + "Label"] }}
        >
          {name}
        </Fab>
      ))}
    </div>
  )
})