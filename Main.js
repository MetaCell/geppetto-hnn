import React from 'react';
import Metadata from './Metadata';
import HNNMain from "./component/main/HNNMain";

export default ({ data }) => {
  if (data === undefined) {
    return <div />
  } else {
    window.isDocker = data.isDocker;
    window.currentFolder = data.currentFolder;
    
    return (
      <Metadata.Provider value={data.metadata}>
        <HNNMain />
      </Metadata.Provider>
    )
  }
}
