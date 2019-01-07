import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import { PROXIMAL, DISTAL } from "../../general/constants";

const styles = theme => ({
	actions: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly"
	},
	addAction: {
		width: "140px",
	},
	extendedIcon: {
		marginRight: theme.spacing.unit,
	}
});

export default withStyles(styles)(({ addInput, removeInput, evokedInputLabels, value, classes }) => (
	<div className={classes.actions}>
		<Fab 
			size="small"
			color="secondary"
			variant="extended" 
			aria-label="proximal"
			className={classes.addAction}
			onClick={() => addInput(PROXIMAL)}
		>
			<AddIcon className={classes.extendedIcon} />
			{PROXIMAL}
		</Fab>

		<Fab 
			size="small"
			color="secondary"
			variant="extended" 
			aria-label="distal"
			className={classes.addAction} 
			onClick={() => addInput(DISTAL)}
		>
			<AddIcon className={classes.extendedIcon} />
			{DISTAL}
		</Fab>
    
		<Fab
			size="small"
			color="secondary"
			aria-label="Delete" 
			onClick={() => removeInput(value)}
			disabled={evokedInputLabels.length == 0}
		>
			<DeleteIcon />
		</Fab>
	</div>
))