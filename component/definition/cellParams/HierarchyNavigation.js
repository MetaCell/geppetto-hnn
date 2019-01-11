import React from 'react';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const styles = {
  medium: {
    fontSize: "60px",
    textAlign: "center"
  },
  button: {
    borderRadius: "30px",
    margin: "10px",
    width: "105px",
    display: "block",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%"
  },
  ruleButton: {
    width: "90px",
    height: "90px"
  },
  text: {
    color: "white"
  }
}

export default withStyles(styles)(({ selection, currentView, changeView, classes }) => (
  <div className="breadcrumb">
    <div className={classes.container}>
      <Fab 
        color="secondary"
        className={classes.ruleButton}
        onClick={() => changeView("General")}
      ><Typography variant="subtitle1" className={classes.text}>{selection}</Typography></Fab>
      
      <Icon className={"fa fa-angle-right " + classes.medium} color="disabled"/>
      
      <Button 
        variant="contained"
        className={classes.button} 
        onClick={() => changeView("Sections")}
        color={currentView == "Sections" ? "secondary" : "default"}
      >Sections</Button>

      <Button 
        variant="contained"
        className={classes.button} 
        onClick={() => changeView("Synapses")}
        color={currentView == "Synapses" ? "secondary" : "default"}
      >Synapses</Button>

      <Button 
        variant="contained"
        className={classes.button} 
        onClick={() => changeView("Biophysics")}
        color={currentView == "Biophysics" ? "secondary" : "default"}
      >Biophysics</Button>
      
    </div>
    
  </div>
))