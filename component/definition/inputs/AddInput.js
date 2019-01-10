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
  typo: {
    margin: "4px 12px 2px"
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
          color={"primary"}
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