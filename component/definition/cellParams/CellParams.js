import React, { Component }from 'react';

import Metadata from '../../../Metadata';
import HierarchyNavigation from './HierarchyNavigation';
import Card from '../../general/materialComponents/Card';
import Thumbnail from '../../general/materialComponents/Thumbnail';
import Navigation from '../../general/materialComponents/Navigation';

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
    General: {
      General: "fa fa-bars"
    },
    Sections: {
      Geometry: "gpt-neuron"
    },
    Synapses: {
      Exp2syn: "fa fa-bars"
    },
    Biophysics: {
      Mechanisms: "gpt-ion-channel"
    },
  }

  changeView(view) {
    const { currentView } = this.state;
    if (view !== currentView) {
      this.setState({ 
        currentView: view, 
        selectedSubRule: this.subRules[view][0]
      })
    }
    
  }
  

  render() {
    const { currentView, selectedRule, selectedSubRule } = this.state;
    const model = this.models[selectedRule][currentView];

    let thumbnails;
    if (currentView == "General") {
      thumbnails = (
        <Thumbnail 
          type={"circle"}
          selected={selectedRule}
          names={this.rules}
          handleClick={selectedRule => this.setState({ selectedRule })}
        />
      )
    } else {
      thumbnails = (
        <Thumbnail 
          type={"rect"}
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
          <div>
            <HierarchyNavigation 
              selection={selectedRule}
              currentView={currentView}
              changeView={(newView) => this.changeView(newView)}
            />
            {thumbnails}
          </div>
          
          <Navigation
            models={currentView === "General" ? model : model[selectedSubRule]}
            selection={selectedRule}
            tabIcons={this.tabIcons[currentView]}
          />
        </div>
      </Card>
    )
  }
}