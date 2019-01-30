import React from 'react';
import Metadata from './Metadata';
import HNNAppBar from "./component/settings/HNNAppBar";

export default ({ data }) => {
	if (data == undefined) {
		return <div />
	}
	else {
		return (
      <Metadata.Provider value={data.metadata}>
        <HNNAppBar />
      </Metadata.Provider>
    )
	}
}