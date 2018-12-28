import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CreateComponentsFromMetadata from '../CreateComponentsFromMetadata';

const styles = {
	root: {
		width: "100%",
	},
	content: {
		marginTop: "25px"
	}
};

class Navigation extends React.Component {
	constructor (props) {
		super(props);
		this.state = { value: 0 };
	}

	render () {
		const { value } = this.state;
		const { models, labels, iconList, classes } = this.props;
    
		return (
			<div>
				<BottomNavigation
					showLabels
					value={value}
					className={classes.root}
					onChange={(event, value) => this.setState({ value })}
				>
					{labels.map((label, index) => (
						<BottomNavigationAction 
							key={label}
							label={label} 
							icon={iconList[index]} 
						/>
					))}
				</BottomNavigation>
				<div className={classes.content}>
					{CreateComponentsFromMetadata(models[value])}
				</div>
			</div>
      
		);
	}
}

export default withStyles(styles)(Navigation);