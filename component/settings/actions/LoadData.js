import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core";
import Dropzone from "react-dropzone";
import FileBrowser from '../../general/FileBrowser';
import AlertDialog from './AlertDialog';
import DialogContent from "@material-ui/core/DialogContent";

const styles = theme => ({
	button: {
		margin: 0,
		padding: 0,
		textTransform: 'none',
	},
});

class LoadData extends React.Component {
	state = {
		explorerDialogOpen: false,
		exploreOnlyDirs: false,
		files: []
	};


	onDrop(files) {
		this.setState({ files });
	}

	onCancel() {
		this.setState({
			files: []
		});
	}


	showExplorerDialog (exploreOnlyDirs) {
		this.setState({ explorerDialogOpen: true, exploreOnlyDirs: exploreOnlyDirs })
	}

	closeExplorerDialog (fieldValue) {
		const newState = { explorerDialogOpen: false };
		if (fieldValue) {
			let fileName = fieldValue.path.replace(/^.*[\\]/, '');
			let path = fieldValue.path.split(fileName).slice(0, -1).join('');
			newState["modFolder"] = fieldValue.path;
			newState["modPath"] = path;
		}
		this.setState(newState);
	}

	render () {
		const { classes, title, ...others } = this.props;
		const { explorerDialogOpen, exploreOnlyDirs } = this.state;
		const files = this.state.files.map(file => (
			<li key={file.name}>
				{file.name} - {file.size} bytes
			</li>
		))
		console.log(title)

		return (
			<AlertDialog
				title={title}
				{...others}
			>
				<DialogContent>
					<section>
						<Dropzone
							onDrop={this.onDrop.bind(this)}
							onFileDialogCancel={this.onCancel.bind(this)}
						>
							{({ getRootProps, getInputProps }) => (
								<div {...getRootProps()}>
									<input {...getInputProps()} />
									Drop file here or <Button color="secondary" className={classes.button} onClick={() => this.showExplorerDialog(true)}> Click Here To Upload </Button>
								</div>
							)}
						</Dropzone>
						<aside>
							<h4>Files</h4>
							<ul>{files}</ul>
						</aside>
					</section>

				</DialogContent>

				<FileBrowser
					open={explorerDialogOpen}
					exploreOnlyDirs={exploreOnlyDirs}
					filterFiles=".txt"
					onRequestClose={selection => this.closeExplorerDialog(selection)}
				/>
			</AlertDialog>
		)
	}
}

export default withStyles(styles)(LoadData);