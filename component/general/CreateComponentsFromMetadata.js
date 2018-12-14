import React from 'react';
import CreateComponentFromMetadata from './CreateComponentFromMetadata';
// children.filter((child, index)=> index==0).map(props => <CreateComponentFromMetadata key={props.id} {...props} />)
export default ({ children }) => (
  children.map(props => <CreateComponentFromMetadata key={props.id} {...props} />)
)