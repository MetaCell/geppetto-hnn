import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';


export default ({ handleMenuItemClick }) => (
	<span>
		<Divider />
		<List>
			<ListItem button key='Load Model Parameters' onClick={() => handleMenuItemClick('LoadModelData')}>
				<ListItemIcon>
          <Icon className='fa fa-cloud-upload' />
				</ListItemIcon>
				<ListItemText primary='Load Model Parameters' />
			</ListItem>
			<ListItem button key='Load Experimental Data' onClick={() => handleMenuItemClick('LoadExperimentalData')}>
				<ListItemIcon>
					<Icon className='fa fa-cloud-upload' />
				</ListItemIcon>
				<ListItemText primary='Load Experimental Parameters' />
			</ListItem>
			<ListItem button key='Save Model Parameters'>
				<ListItemIcon>
          <Icon className='fa fa-floppy-o' />
				</ListItemIcon>
				<ListItemText primary='Save Model Parameters' />
			</ListItem>
			<ListItem button key='Remove Simulation'>
				<ListItemIcon>
          <Icon className='fa fa-times-circle' />
				</ListItemIcon>
				<ListItemText primary='Remove Simulation' />
			</ListItem>
		</List>
		<Divider />
		<List>
			<ListItem button key='Settings'>
				<ListItemIcon>
          <Icon className='fa fa-cog' />
				</ListItemIcon>
				<ListItemText primary='Settings' />
			</ListItem>
			<ListItem button key='About HNN' onClick={() => handleMenuItemClick('AboutPage')}>
				<ListItemIcon>
          <Icon className='fa fa-comment-o' />
				</ListItemIcon>
				<ListItemText primary='About HNN' />
			</ListItem>
		</List>
	</span>
)