import React from 'react';
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import AlertDialog from './AlertDialog';

export default class AboutPage extends React.Component {

  render () {
    return (
      <AlertDialog
        title="About HNN "
        {...this.props}
      >
        <DialogContentText>
                    Human Neocortical Neurosolver (HNN) v0.0.4
          <br />
          <a href="https://hnn.brown.edu">https://hnn.brown.edu </a>
          <br />
          <a href="https://github.com/jonescompneurolab/hnn"> HNN On Github</a> 
          <br />
                    © 2017-2018
          <a href="https://www.brown.edu/"> Brown University, Providence, RI</a>
          <br />
          <a href="https://github.com/jonescompneurolab/hnn/blob/master/LICENSE">Software License</a>
        </DialogContentText>
      </AlertDialog>
    )
  }
}