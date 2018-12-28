import React from 'react';
import HNNAppBar from "./component/settings/HNNAppBar";

export default ({ data }) => {
	if (data == undefined) {
		return <div />
	}
	else {
		window.isDocker = data.isDocker;
		window.metadata = data.metadata;
		window.currentFolder = data.currentFolder;
    
		return <HNNAppBar />
	}
}