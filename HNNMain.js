import React from 'react';
import CreateComponentsFromMetadata from './component/general/CreateComponentsFromMetadata';

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
    if (this.state.model == null) {
      return <div/>
    }
    else {
      return CreateComponentsFromMetadata(model.metadata.cellParams.L2.synapses)
    }
  }
}
