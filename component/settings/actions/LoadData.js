import React from 'react';
import Button from '@material-ui/core/Button';
import Dropzone from "react-dropzone";
import DialogContent from "@material-ui/core/DialogContent";
import FileBrowser from '../../general/FileBrowser';
import AlertDialog from './AlertDialog';

const styles = {
	button: {
		margin: 0,
		padding: 0,
		textTransform: 'none',
	},
	baseStyle: {
		width: 400,
		height: 200,
		borderWidth: 2,
		borderColor: '#666',
		borderStyle: 'dashed',
		borderRadius: 5,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	activeStyle: {
		borderStyle: 'solid',
		borderColor: '#6c6',
		backgroundColor: '#eee'
	},
	rejectStyle: {
		borderStyle: 'solid',
		borderColor: '#c66',
		backgroundColor: '#eee'
	}
};


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
		const { title, filesAccepted, mimeAccepted, ...others } = this.props;
		const { explorerDialogOpen, exploreOnlyDirs } = this.state;
		const files = this.state.files.map(file => (
			<li key={file.name}>
				{file.name} - {file.size} bytes
			</li>
		))

		return (
			<AlertDialog
				title={title}
				{...others}
			>
				<DialogContent>
					<Dropzone
						accept={mimeAccepted}
						onDrop={this.onDrop.bind(this)}
						onFileDialogCancel={this.onCancel.bind(this)}
					>
						{({ getRootProps, isDragActive, isDragAccept, isDragReject }) => {
							let style = { ...styles.baseStyle }
							style = isDragActive ? { ...style, ...styles.activeStyle } : style;
							style = isDragReject ? { ...style, ...styles.rejectStyle } : style;

							let content;
							if (files.length !== 0){
								content = (files)
							}
							else if (isDragReject){
								content = (<div>Unsupported file type...</div>)
							}
							else content = (<p> {isDragAccept ? 'Drop' : 'Drag'} file here or <Button color="secondary" style={styles.button} onClick={() => this.showExplorerDialog(false)}> Click Here To Upload </Button> </p>)

							return (
								<div
									{...getRootProps()}
									style={style}
								>
									{content}
								</div>
							)
						}}
					</Dropzone>
				</DialogContent>

				<FileBrowser
					open={explorerDialogOpen}
					exploreOnlyDirs={exploreOnlyDirs}
					filterFiles={filesAccepted}
					onRequestClose={selection => this.closeExplorerDialog(selection)}
				/>
			</AlertDialog>
		)
	}
}

export default LoadData;