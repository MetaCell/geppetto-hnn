import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    borderRadius: "30px",
    margin: "10px",
    width: "180px"
  }
}

export default withStyles(styles)(({ names, selected, handleClick, classes }) => (
	<div>
		{names.map(name => (
			<Button
				key={name}  
				id={name}
        variant="contained"
        className={classes.root} 
				onClick={ () => handleClick(name) }
				color={ selected == name ? "primary" : "secondary" }
			>
				{name}
			</Button>
		))}
	</div>
))