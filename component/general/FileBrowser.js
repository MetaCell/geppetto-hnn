import React from 'react';
import Utils from "../../Utils";
import {changeNodeAtPath} from "react-sortable-tree";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Tree from '../../../../js/components/interface/tree/Tree'


export default class FileBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickVisualize = this.handleClickVisualize.bind(this);

    }

    state = {
        selection: false,
        exploreOnlyDirs: false,

    };

    getDirList(treeData, rowInfo) {
        let path;
        if (rowInfo !== undefined) {
            path = rowInfo.node.path;
        }
        else{
            path = "";
        }

        Utils.evalPythonMessage('hnn_geppetto.getDirList', [path, this.props.exploreOnlyDirs, this.props.filterFiles])
            .then((dirList) => {
                let newTreeData;
                if (treeData !== [] && treeData.length > 0) {
                    rowInfo.node.children = dirList;
                    rowInfo.node.expanded = true;
                    rowInfo.node.load = true;
                    newTreeData = changeNodeAtPath({ treeData: treeData, path: rowInfo.path, newNode: rowInfo.node, getNodeKey: ({ treeIndex }) => treeIndex });
                }
                else {
                    newTreeData = dirList;
                }
                if (!this.props.exploreOnlyDirs || rowInfo === undefined){
                    this.setState({ selection: undefined })
                }
                else{
                    this.setState({ selection: rowInfo.node })
                }
                this.refs.tree.updateTreeData(newTreeData);
            });
    }


    handleClickVisualize(event, rowInfo) {
        if (rowInfo.node.load === false) {
            this.getDirList(this.refs.tree.state.treeData, rowInfo);
        }
        else if (this.props.exploreOnlyDirs || (rowInfo.node.children === undefined && rowInfo.node.load === undefined)) {
            this.setState({ selection: rowInfo.node })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.open === false && this.props.open) {
            this.getDirList([]);
        }
    }

    render() {
        const selectMessage = this.props.exploreOnlyDirs ? "Select a folder. " : "Select a file. ";
        return (
            <Dialog
                open={this.props.open}
                aria-labelledby="alert-dialog-title"
            >
                <DialogContent>
                    <div style={{marginBottom: '15px'}}>
                        <b>{selectMessage}</b>
                        These paths are relative to:<br/>
                        {window.isDocker ? " the folder you shared with docker (your mounted volume)" :
                            <span style={{border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: "3px", backgroundColor: "rgba(0, 0, 0, 0.05)", padding: "2px", margin: "4px"}}>{window.currentFolder}</span>}
                    </div>
                    <Tree
                        id="TreeContainerCutting"
                        style={{ width: "100%", height: "400px", float: 'left'}}
                        treeData={[]}
                        handleClick={this.handleClickVisualize}
                        rowHeight={30}
                        activateParentsNodeOnClick={this.props.exploreOnlyDirs}
                        ref="tree"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.onRequestClose()} color="primary">
                        Cancel
                    </Button>;
                    <Button onClick={() => this.props.onRequestClose(this.state.selection)} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

FileBrowser.defaultProps = {
    exploreOnlyDirs: false,
    filterFiles: false
};