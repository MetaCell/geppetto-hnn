import React from 'react';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import bluegrey from '@material-ui/core/colors/blueGrey';

const styles = theme => ({
  card: { height: "75px" },
  title: { color: "white", },
  subtitle: { color: bluegrey[50], }
});

export default withStyles(styles)(({ title, subtitle, children, classes }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary className={classes.card} expandIcon={<Icon className='fa fa-angle-up' />}>
      <div>
        <Typography variant="h6" className={classes.title}>{title}</Typography>
        <Typography variant="body2" className={classes.subtitle}>{subtitle}</Typography>
      </div>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      {children}
    </ExpansionPanelDetails>
  </ExpansionPanel>
))