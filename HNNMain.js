import React from 'react';
import ProxyComponent from './ProxyComponent'

export default ({ data }) => {
  if (data == undefined) {
    return <div/>
  }
  else {
    window.isDocker = data.isDocker;
    window.metadata = data.metadata;
    window.currentFolder = data.currentFolder;
    
    return <ProxyComponent/>
  }
}