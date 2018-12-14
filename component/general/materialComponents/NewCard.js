import React from 'react';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  card: {
    width: "100%",
  }
});

class NewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
  }

  render() {
    const { expanded } = this.state;
    const { title, subtitle, children, classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title={title}
          subheader={subtitle}
          action={
            <IconButton
              style={{ marginTop: "10px" }}
              onClick={() => this.setState(({ expanded }) => ({ expanded: !expanded }))}
            >
              <ExpandMoreIcon />
            </IconButton>
          }
        />
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