import React from 'react';
import CreateComponentFromMetadata from './CreateComponentFromMetadata';

export default ({ children }) => (
	children.map(props => (
		<CreateComponentFromMetadata 
			key={props.id} 
			{...props} 
		/>
	))
)