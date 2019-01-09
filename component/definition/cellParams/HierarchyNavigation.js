import React from 'react';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

const styles = {
  medium: {
    fontSize: "60px",
    textAlign: "center"
  },
  big: {
    fontSize: "80px",
    textAlign: "center"
  },
  button: {
    borderRadius: "30px",
    margin: "10px",
    width: "120px",
    display: "block"
  }
}

export default withStyles(styles)(({ selection, currentView, handleHierarchyClick, classes }) => (
  <div className="breadcrumb">
    <IconButton 
      onClick={() => handleHierarchyClick("General")}
      className={"fa fa-home " + classes.big} color="primary" 
    />

    <Icon className={"fa fa-angle-right " + classes.medium} color="disabled"/>
    
    <Fab 
      color={"primary"}
      className="actionButtonSmall"
      onClick={() => handleHierarchyClick("General")}
    >{selection}</Fab>
    
    <Icon className={"fa fa-angle-right " + classes.medium} color="disabled"/>

    <div>
      <Button 
        className={classes.button} 
        variant="contained" 
        color={currentView == "Sections" ? "primary" : "secondary"}
        onClick={() => handleHierarchyClick("Sections")}
      >Sections</Button>

      <Button 
        className={classes.button} 
        variant="contained" 
        color={currentView == "Synapses" ? "primary" : "secondary"}
        onClick={() => handleHierarchyClick("Synapses")}
      >Synapses</Button>

      <Button 
        className={classes.button} 
        variant="contained" 
        color={currentView == "Biophysics" ? "primary" : "secondary"}
        onClick={() => handleHierarchyClick("Biophysics")}
      >Biophysics</Button>
    </div>
  </div>
))