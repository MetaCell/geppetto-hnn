import React from 'react';
import AlertDialog from './AlertDialog';
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import FileBrowser from '../../general/FileBrowser';
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    button: {
        margin: 0,
        padding: 0,
        textTransform: 'none',
    },
});

class LoadData extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        explorerDialogOpen: false,
        exploreOnlyDirs: false,

    };


    showExplorerDialog(exploreOnlyDirs) {
        this.setState({ explorerDialogOpen: true, exploreOnlyDirs: exploreOnlyDirs })
    }

    closeExplorerDialog(fieldValue) {
        const newState = {explorerDialogOpen: false};
        if (fieldValue) {
            let fileName = fieldValue.path.replace(/^.*[\\\/]/, '');
            let path = fieldValue.path.split(fileName).slice(0, -1).join('');
            newState["modFolder"] = fieldValue.path;
            newState["modPath"] = path;
        }
        this.setState(newState);
    }

    render() {
        const { classes } = this.props;
        return (
            <AlertDialog
                title={"Load Experimental Data"}
                {...this.props}
            >
                <DialogContentText>
                    Drop file here or <Button color="secondary" className={classes.button} onClick={() => this.showExplorerDialog(true)}> Click Here To Upload </Button>
                </DialogContentText>

                <FileBrowser open={this.state.explorerDialogOpen} exploreOnlyDirs={this.state.exploreOnlyDirs} filterFiles={'.txt'}  onRequestClose={(selection) => this.closeExplorerDialog(selection)}/>
            </AlertDialog>
        )
    }
}

export default withStyles(styles)(LoadData);