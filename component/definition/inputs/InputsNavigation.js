import React, { Component } from 'react';

import Thumbnail from '../../general/materialComponents/Thumbnail';
import Navigation from '../../general/materialComponents/Navigation';

export default class InputsNavigation extends Component {
	state = { selection: Object.keys(this.props.models)[0] };

  tabIcons = {
    "Weights": "fa fa-bars"
  }

  componentDidUpdate() {
    const { models } = this.props;
    const { selection } = this.state;
    if (models && Object.keys(models).indexOf(selection) === -1) {
      this.setState({ selection: Object.keys(models)[0] })
    }
  }

	render () {
    const { models } = this.props;
    const { selection } = this.state;

    if (!selection) {
      return <div/>
    }
    
    return (
      <div className="Card">
        <div>
          <Thumbnail 
            selected={selection}
            names={Object.keys(models)}
            handleClick={selection => this.setState({ selection })}
          />
        </div>

        <Navigation
          tabIcons={this.tabIcons}
          models={models[selection]}
        />
      </div>
		);
	}
}
