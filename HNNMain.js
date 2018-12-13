import React from 'react';
import CellParams from './component/definition/cellParams/CellParams';
import NetworkParams from './component/definition/networkParams/NetworkParams';

export default class HNNMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      console.log("Initialising NetPyNE Tabs")
      window.metadata = nextProps.data.metadata;
      window.currentFolder = nextProps.data.currentFolder;
      window.isDocker = nextProps.data.isDocker;
      this.setState({ model: nextProps.data })
    }
  };

  render() {
    const { model } = this.state;
    if (model == null) {
      return <div/>
    }
    else {
      return (
        <div>
          <CellParams/>
          <NetworkParams/>
        </div>
      )
    }
  }
}
