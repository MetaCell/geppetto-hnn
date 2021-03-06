import React, { Component } from 'react';

import Metadata from '../../../Metadata';
import HierarchyNavigation from './HierarchyNavigation';
import Card from '../../common/materialComponents/Card';
import Thumbnail from '../../common/materialComponents/Thumbnail';
import Navigation from '../../common/materialComponents/Navigation';

export default class CellParams extends Component {
  static contextType = Metadata;
  state = { 
    selectedSubRule: "",
    currentView: "General",
    selectedRule: "Layer 2/3",
  };
  
  models = this.context.cellParams;
  rules = Object.keys(this.context.cellParams)
  
  subRules = {
    General: [""],
    Biophysics: Object.keys(this.context.cellParams["Layer 2/3"]["Biophysics"]),
    Sections: Object.keys(this.context.cellParams["Layer 2/3"]["Sections"]),
    Synapses: Object.keys(this.context.cellParams["Layer 2/3"]["Synapses"])
  }
  
  tabIcons = {
    General: { General: "fa fa-bars" },
    Sections: { Geometry: "gpt-neuron" },
    Synapses: { Exp2syn: "fa fa-bars" },
    Biophysics: { Mechanisms: "gpt-ion-channel" },
  }

  changeView (view) {
    const { currentView } = this.state;
    if (view !== currentView) {
      this.setState({ 
        currentView: view, 
        selectedSubRule: this.subRules[view][0]
      })
    }
  }
  
  shouldComponentUpdate (nextProps, nextState){ 
    const { currentView, selectedRule, selectedSubRule } = this.state;
    return nextState.currentView !== currentView || nextState.selectedRule !== selectedRule || nextState.selectedSubRule !== selectedSubRule;
  }

  render () {
    const { currentView, selectedRule, selectedSubRule } = this.state;
    const model = this.models[selectedRule][currentView];

    let thumbnails;
    if (currentView == "General") {
      thumbnails = (
        <Thumbnail 
          selected={selectedRule}
          names={this.rules}
          handleClick={selectedRule => this.setState({ selectedRule })}
        />
      )
    } else {
      thumbnails = (
        <Thumbnail 
          variant="extended"
          selected={selectedSubRule}
          names={this.subRules[currentView]}
          handleClick={selectedSubRule => this.setState({ selectedSubRule })}
        />
      )
    }
    return (
      <Card
        title="Cell Parameters"
        subtitle="Define here cell properties"
      >
        <div className="Card">
          <div >
            <HierarchyNavigation 
              selection={selectedRule}
              currentView={currentView}
              changeView={newView => this.changeView(newView)}
            />
            {thumbnails}
          </div>
          
          <Navigation
            selection={selectedRule}
            tabIcons={this.tabIcons[currentView]}
            models={currentView === "General" ? model : model[selectedSubRule]}
          />
        </div>
      </Card>
    )
  }
}
