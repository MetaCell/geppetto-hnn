import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
  state = { open: this.props.open, };

  handleClose = () => {
    this.setState({ open: false });
    this.props.onRequestClose();
  };

  handleConfirm = () => {
    this.props.onRequestConfirm();
    this.setState({ open: false });

  };

  componentDidUpdate = prevProps => {
    const { open } = this.props;
    if (open !== prevProps.open) {
      this.setState({ open });
    }
  };

  render () {
    const { open } = this.state;
    const { title, children: content } = this.props;
    
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {content}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>

          <Button onClick={this.handleConfirm} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AlertDialog;
