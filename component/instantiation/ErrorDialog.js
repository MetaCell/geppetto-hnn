import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import Utils from '../../Utils';

export default ({ open, onClose, errorMessage, errorDetails }) => (
	<Dialog
		open={open}
		maxWidth="md"
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description"
	>
		<DialogTitle id="alert-dialog-title">
			{errorMessage}
		</DialogTitle>
		<DialogContent>
			<DialogContentText id="alert-dialog-description">
				{Utils.parsePythonException(errorDetails)}
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button 
				autoFocus
				color="primary" 
				onClick={() => onClose()}
			>
				{'Got it'}
			</Button>
		</DialogActions>
	</Dialog>
)