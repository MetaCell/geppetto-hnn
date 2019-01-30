import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default class Help extends Component {
	state = {
		open: false
	};

	render () {
    const { open } = this.state;
    const { help, component } = this.props;

		if (help != undefined && help != '') {
			return (
				<span>
					<span 
						className={component == "Checkbox" ? "checkboxHelpIcon" : "helpIcon"}
						onClick={() => this.setState({ open: true })}
					>
						<i className="fa fa-question" aria-hidden="true" />
					</span>
					<Dialog
						open={open}
						maxWidth="md"
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
						onClose={() => this.setState({ open:  false })}
					>
						<DialogTitle id="alert-dialog-title">
							{"HNN help"}
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								{help}
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button 
								autoFocus
								color="primary" 
								onClick={() => this.setState({ open: false })}
							>
								{'Got it'}
							</Button>
						</DialogActions>
					</Dialog>
				</span>
        
			)
		}
		else {
			return <span />
		}
	}
}
