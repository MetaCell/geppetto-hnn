import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';
import {PROXIMAL} from "../../general/constants";

const anchor = {
  origin:{
    vertical: 'top',
    horizontal: 'center',
  },
  transform: {
    vertical: 'center',
    horizontal: 'center',
  },
}

const styles = {
  root: {
    width: "120px",
    height: "120px",
    margin: "10px",
    float: "left"
  },
  label: { margin: "12px" },
  modal: { backgroundColor: "#00000055" }
}

class DynamicThumbnail extends Component {

  constructor (props) {
    super(props);
    this.state = {
      hover: false,
      anchorEl: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event) {
    const { selected, id, handleSelect } = this.props;
    if (selected === id) {
      this.setState({ anchorEl: event.currentTarget })
    } else {
      handleSelect(id)
    } 
  }

  handleClose (){
    this.setState({ anchorEl: null })
  }
  

  render () {
    const { anchorEl, hover } = this.state;
    const { name, id, selected, handleDelete, classes } = this.props;

    return (
      <div>
        <Fab
          id={`Thumnail_${id}`}
          onClick={this.handleClick}
          color={ selected === id ? "primary" : "default" }
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
          classes={{ root: classes.root, label: classes.label }}
        >
          {selected === id && hover
            ? <Icon className='fa fa-trash-o' />
            : name
          }
        </Fab>

        <Popover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.handleClose()}
          anchorOrigin={anchor.origin}
          transformOrigin={anchor.transform}
          ModalClasses={{ root: classes.modal }}
        >
          <Button 
            color="primary" 
            onClick={() => {
              this.handleClose(); handleDelete(id)
            }}
          >Delete</Button>
        </Popover>
      </div> 
    )
  }
}

export default withStyles(styles)(DynamicThumbnail);
