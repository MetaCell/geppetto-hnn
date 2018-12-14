import React from 'react';
import CellParams from './component/definition/cellParams/CellParams';

export default ({ data }) => {
  if (data == undefined) {
    return <div/>
  }
  else {
    window.isDocker = data.isDocker;
    window.metadata = data.metadata;
    window.currentFolder = data.currentFolder;
    return (
      <div>
        <CellParams/>
      </div>
    )
  }
}

