import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import { PROXIMAL, DISTAL } from "../../general/constants";

const styles = {
  button: {
    backgroundColor: "#e9e9e9",
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.2)",
    "&:hover": {
      backgroundColor: "#e9e9e9",
      boxShadow: "0 5px 5px -3px rgba(0,0,0,0.2), 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12)"
    }
  },
  typo: {
    margin: "4px 12px 2px"
  },
  modal: {
    backgroundColor: "#00000055"
  }
}

const anchor = {
  origin: {
    vertical: 'center',
    horizontal: 'center',
  },
  transform: {
    vertical: 'top',
    horizontal: 'left',
  }
}

class AddInput extends Component {
  state = { anchorEl: null}

  handleClick(input) {
    this.props.addInput(input)
    this.handleClose()
  }

  handleClose(){
    this.setState({ anchorEl: null })
  }

  render(){
    const { anchorEl } = this.state;
    const { classes } = this.props;
    return (
      <div className="breadcrumb">
        <Fab 
          className={classes.button}
          onClick={(event) => this.setState({ anchorEl: event.currentTarget })}
        >
          <AddIcon />
        </Fab>

        <Popover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.handleClose()}
          anchorOrigin={anchor.origin}
          transformOrigin={anchor.transform}
          ModalClasses={{ root: classes.modal }}
        >
          <Typography variant="subtitle1" className={classes.typo}>Type</Typography>
          <Divider/>
          <MenuItem onClick={() => this.handleClick(PROXIMAL)}>{PROXIMAL}</MenuItem>
          <MenuItem onClick={() => this.handleClick(DISTAL)}>{DISTAL}</MenuItem>
        </Popover>
      </div>
    )
  }
}

export default withStyles(styles)(AddInput);