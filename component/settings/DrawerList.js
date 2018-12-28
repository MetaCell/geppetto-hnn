import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { CloudUpload, Save, Cancel, Settings, Chat } from '@material-ui/icons';


export default ({ handleMenuItemClick }) => (
	<span>
		<Divider />
		<List>
			<ListItem button key='Load Model Parameters'>
				<ListItemIcon>
					<CloudUpload />
				</ListItemIcon>
				<ListItemText primary='Load Model Parameters' />
			</ListItem>
			<ListItem button key='Load Experimental Data' onClick={() => handleMenuItemClick('LoadData')}>
				<ListItemIcon>
					<CloudUpload />
				</ListItemIcon>
				<ListItemText primary='Load Experimental Parameters' />
			</ListItem>
			<ListItem button key='Save Model Parameters'>
				<ListItemIcon>
					<Save />
				</ListItemIcon>
				<ListItemText primary='Save Model Parameters' />
			</ListItem>
			<ListItem button key='Remove Simulation'>
				<ListItemIcon>
					<Cancel />
				</ListItemIcon>
				<ListItemText primary='Remove Simulation' />
			</ListItem>
		</List>
		<Divider />
		<List>
			<ListItem button key='Settings'>
				<ListItemIcon>
					<Settings />
				</ListItemIcon>
				<ListItemText primary='Settings' />
			</ListItem>
			<ListItem button key='About HNN' onClick={() => handleMenuItemClick('AboutPage')}>
				<ListItemIcon>
					<Chat />
				</ListItemIcon>
				<ListItemText primary='About HNN' />
			</ListItem>
		</List>
	</span>
)