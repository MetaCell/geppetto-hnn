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
    if (names.findIndex(name => name === "Layer 5") !== -1 && names.length === 2) {
      aux = [
        names.find(name => name === "Layer 2/3"),
        names.find(name => name === "Layer 5")
      ]

    } else if (names.findIndex(name => name === "Apical oblique dend") !== -1 && names.length === 8){
      aux = [
        names.find(name => name === "Soma"),
        names.find(name => name === "Apical 1 dend"),
        names.find(name => name === "Apical oblique dend"),
        names.find(name => name === "Apical trunk dend"),
        names.find(name => name === "Apical tuft dend"),
        names.find(name => name === "Basal 1 dend"),
        names.find(name => name === "Basal 2 dend"),
        names.find(name => name === "Basal 3 dend")
      ]
    
    } else if (names.findIndex(name => name === "Soma") && names.length === 2) {
      aux = [
        names.find(name => name === "Soma"),
        names.find(name => name === "Dendrites")
      ]

    } else if (names.findIndex(name => name === "Layer 2/3 Pyramidal") !== -1 && names.length === 4) {
      aux = [
        names.find(name => name === "Layer 2/3 Pyramidal"),
        names.find(name => name === "Layer 2/3 Basket"),
        names.find(name => name === "Layer 5 Pyramidal"),
        names.find(name => name === "Layer 5 Basket"),
      ]
    
    } else if (names.findIndex(name => name === "Timing") !== -1 && names.length === 3) {
      aux = [
        names.find(name => name === "Layer 2/3"),
        names.find(name => name === "Layer 5"),
        names.find(name => name === "Timing"),
      ]
    
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
          color={ selected === name ? "primary" : "default" }
          classes={{ root: classes[variant], label: classes[variant + "Label"] }}
        >
          {name}
        </Fab>
      ))}
    </div>
  )
})
