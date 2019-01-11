import React from 'react';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CardActionArea from '@material-ui/core/CardActionArea';



const styles = {
	card: {
		width: "100%",
  },
  expandIcon: {
    float: "right"
  }
};

class NewCard extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			expanded: false
		}
	}

	render () {
		const { expanded } = this.state;
		const { title, subtitle, children, classes } = this.props;

		return (
			<Card className={classes.card}>
				<CardActionArea onClick={() => this.setState(oldState => ({ expanded: !oldState.expanded }))}>
          <CardHeader
            title={title}
            subheader={subtitle}
            avatar={expanded ? <ExpandLessIcon style={{float: "right"}}/> : <ExpandMoreIcon style={{float: "right"}}/>}
          />
        </CardActionArea>
        
				<Collapse in={expanded}>
					<CardContent>
						{children}
					</CardContent>
				</Collapse>
			</Card>
		);
	}
}

export default withStyles(styles)(NewCard);