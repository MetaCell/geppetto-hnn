import React from 'react';
import CreateComponentFromMetadata from './CreateComponentFromMetadata';

export default ({ children }) => {
  return children.map(props => <CreateComponentFromMetadata {...props} />)
}