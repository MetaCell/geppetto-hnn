import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import DeleteIcon from '@material-ui/icons/Delete';

const anchor = {
  origin:{
    vertical: 'top',
    horizontal: 'center',
  },
  transform: {
    vertical: 'center',
    horizontal: 'center',
  }
}

class DynamicThumbnail extends Component {
  state = {
    hover: false,
    anchorEl: null
  }
  handleClick = this.handleClick.bind(this);

  handleClick(event) {
    const { selected, name, handleSelect } = this.props;
    if (selected === name) {
      this.setState({ anchorEl: event.currentTarget })
    }
    else {
      handleSelect(name) 
    } 
  }

  handleClose(){
    this.setState({ anchorEl: null })
  }
  

  render() {
    const { anchorEl, hover } = this.state;
    const { name, selected, handleDelete } = this.props;

    return (
      <div>
        <Fab
          id={`Thumnail_${name}`}
          className="actionButton"
          style={{ float: "left" }}
          onClick={this.handleClick}
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
          color={ selected == name ? "primary" : "secondary" }
        >
          {selected === name && hover ? <DeleteIcon fontSize="large" /> : name}
        </Fab>

        <Popover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.handleClose()}
          anchorOrigin={anchor.origin}
          transformOrigin={anchor.transform}
        >
          <Button 
            color="primary" 
            onClick={() => { this.handleClose(); handleDelete(name) }}
          >Delete</Button>
        </Popover>
      </div> 
    )
  }
}

export default DynamicThumbnail;