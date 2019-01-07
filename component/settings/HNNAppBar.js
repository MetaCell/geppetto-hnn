import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import BookIcon from '@material-ui/icons/Book';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HNNTabs from './HNNTabs';
import HNNParametersContainer from './HNNParametersContainer';
import HNNCanvasContainer from './HNNCanvasContainer';
import HNNLogo from '../../static/hnn_logo.png'
import AboutPage from "./actions/AboutPage";
import LoadData from "./actions/LoadData";
import DrawerList from './DrawerList';

const drawerWidth = 240;

const styles = theme => ({
	root: {
		display: 'flex',
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
		backgroundColor: theme.status.gray_out,
	},
	content: {
		flexGrow: 1,
		marginLeft: -drawerWidth,
	},
	contentShift: {
		marginLeft: 0,
	},
	img: {
		marginLeft: 5,
		marginTop: 5,
		marginBottom: 0,
		marginRight: 70,
		width: 95
	}

});

class HNNAppBar extends React.Component {
	state = {
		open: false,
		openDialogBox: false,
		action: null,
		value: 'canvas',
		showCanvas: true,
	};

	handleMenuItemClick = action => {
		this.setState({ action: action, openDialogBox: true, open: false })
	};

	render () {
		const { classes, theme } = this.props;
		const { open, action, openDialogBox, value, showCanvas } = this.state;

		let content;
		if (openDialogBox) {
			switch (action) {
			case 'AboutPage':
				content = (
					<AboutPage
						open={openDialogBox}
						onRequestClose={() => this.setState({ openDialogBox: false })}
					/>
				)
				break;
			case 'LoadExperimentalData':
				content = (
					<LoadData
						title="Load Experimental Parameters"
						filesAccepted=".param"
						mimeAccepted="text/plain"
						open={openDialogBox}
						onRequestClose={() => this.setState({ openDialogBox: false })}
					/>
				)
				break;

			case 'LoadModelData':
				content = (
					<LoadData
						title="Load Model Parameters"
						filesAccepted=".txt"
						mimeAccepted="text/plain"
						open={openDialogBox}
						onRequestClose={() => this.setState({ openDialogBox: false })}
					/>
				)
				break;
			}
		}

		return (

			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
				>
					<Toolbar disableGutters={!open}>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={() => this.setState({ open: true })}
							className={classNames(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>

						<HNNTabs value={value} onChange={(event, value) => this.setState({ value, showCanvas: value === 'canvas' })} />

						<IconButton color="inherit">
							<BookIcon />
						</IconButton>
					</Toolbar>
				</AppBar>

				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{ paper: classes.drawerPaper }}
				>
					<div className={classes.drawerHeader}>
						<img className={classes.img} src={HNNLogo} alt="HNN Logo" />
						<IconButton onClick={() => this.setState({ open: false })}>
							{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
						</IconButton>
					</div>
					<DrawerList handleMenuItemClick={name => this.handleMenuItemClick(name)} />
				</Drawer>
				<main className={classNames(classes.content, { [classes.contentShift]: open })}>
					<div className={classes.drawerHeader} />
					{value === 'parameters' && <HNNParametersContainer />}
					{value === 'canvas' && <HNNCanvasContainer showCanvas={showCanvas} />}
				</main>
				{content}
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(HNNAppBar);