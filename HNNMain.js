import React from 'react';
import Metadata from './Metadata';
import HNNAppBar from "./component/main/HNNAppBar";

export default ({ data }) => {
  if (data === undefined) {
    return <div />
  } else {
    window.isDocker = data.isDocker;
    window.currentFolder = data.currentFolder;
    
    return (
      <Metadata.Provider value={data.metadata}>
        <HNNAppBar />
      </Metadata.Provider>
    )
  }
}
