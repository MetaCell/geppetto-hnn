import React, { Component, createRef } from 'react';
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import { changeNodeAtPath } from "react-sortable-tree";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";

import Utils from "../../Utils";
import Tree from 'geppetto-client/js/components/interface/tree/Tree'


const styles = {
  docker: {
    border: "1px solid rgba(0, 0, 0, 0.1)", 
    borderRadius: "3px", 
    backgroundColor: "rgba(0, 0, 0, 0.05)", 
    padding: "2px", 
    margin: "4px"
  },
  tree: { 
    width: "100%", 
    height: "400px", 
    float: 'left' 
  }
}

export default class FileBrowser extends Component {

  state = {
    selection: false,
    exploreOnlyDirs: false,

  };
  treeRef = createRef();
  handleClickVisualize = this.handleClickVisualize.bind(this);

  async getDirList (treeData, rowInfo) {
    const { exploreOnlyDirs, filterFiles } = this.props;
    const path = rowInfo !== undefined ? rowInfo.node.path : "";

    const dirList = await Utils.evalPythonMessage('hnn_geppetto.getDirList', [path, exploreOnlyDirs, filterFiles]);
      
    let newTreeData;
    if (treeData !== [] && treeData.length > 0) {
      rowInfo.node.children = dirList;
      rowInfo.node.expanded = true;
      rowInfo.node.load = true;
      newTreeData = changeNodeAtPath({ treeData: treeData, path: rowInfo.path, newNode: rowInfo.node, getNodeKey: ({ treeIndex }) => treeIndex });
    } else {
      newTreeData = dirList;
    }
    if (!exploreOnlyDirs || rowInfo === undefined){
      this.setState({ selection: undefined })
    } else {
      this.setState({ selection: rowInfo.node })
    }
    this.treeRef.current.updateTreeData(newTreeData);
  }


  handleClickVisualize (event, rowInfo) {
    const { exploreOnlyDirs } = this.props;
    if (rowInfo.node.load === false) {
      this.getDirList(this.treeRef.current.state.treeData, rowInfo);
    } else if (exploreOnlyDirs || (rowInfo.node.children === undefined && rowInfo.node.load === undefined)) {
      this.setState({ selection: rowInfo.node })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.open === false && this.props.open) {
      this.getDirList([]);
    }
  }

  render () {
    const { selection } = this.state;
    const { open, exploreOnlyDirs, onRequestClose } = this.props;
    const selectMessage = exploreOnlyDirs ? "Select a folder. " : "Select a file. ";
    return (
      <Dialog
        fullWidth
        open={open}
        aria-labelledby="alert-dialog-title"
      >
        <DialogContent>
          <div style={{ marginBottom: '15px' }}>
            <b>{selectMessage}</b>
            These paths are relative to:
            
            
            <br />
            {window.isDocker ? " the folder you shared with docker (your mounted volume)"
              : <span style={styles.docker}>{window.currentFolder}</span>}
          </div>
          <Tree
            id="TreeContainerCutting"
            style={styles.tree}
            treeData={[]}
            handleClick={this.handleClickVisualize}
            rowHeight={30}
            activateParentsNodeOnClick={exploreOnlyDirs}
            ref={this.treeRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onRequestClose()} color="primary">
            Cancel
          </Button>

          <Button onClick={() => onRequestClose(selection)} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}