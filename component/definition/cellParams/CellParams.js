import React, { Component }from 'react';

import HierarchyNavigation from './HierarchyNavigation';
import Card from '../../general/materialComponents/Card';
import Thumbnail from '../../general/materialComponents/Thumbnail';
import RectThumbnail from '../../general/materialComponents/RectThumbnail';
import Navigation from '../../general/materialComponents/Navigation';

export default class CellParams extends Component {

  state = { 
    selectedSubRule: "",
    currentView: "General",
    selectedRule: "Layer 2/3",
  };
  
  models = metadata.cellParams;
  rules = Object.keys(metadata.cellParams)
  
  subRules = {
    Biophysics: Object.keys(metadata.cellParams["Layer 2/3"]["Biophysics"]),
    Sections: Object.keys(metadata.cellParams["Layer 2/3"]["Sections"]),
    Synapses: Object.keys(metadata.cellParams["Layer 2/3"]["Synapses"])
  }

  tabs = {
    General: Object.keys(metadata.cellParams["Layer 2/3"]["General"]),
    Biophysics: Object.keys(metadata.cellParams["Layer 2/3"]["Biophysics"]),
    Sections: Object.keys(metadata.cellParams["Layer 2/3"]["Sections"]),
    Synapses: Object.keys(metadata.cellParams["Layer 2/3"]["Synapses"])
  }
  
  tabIcons = {
    General: {
      General: "fa fa-bars"
    },
    Sections: {
      Geometry: "fa fa-bars"
    },
    Synapses: {
      Exp2syn: "fa fa-bars"
    },
    Biophysics: {
      Mechanisms: "fa fa-bars"
    },
  }

  render() {
    const { currentView, selectedRule, selectedSubRule } = this.state;

    // this.tabLabels.forEach((tabLabel, index) => model[index] = this.models[selectedRule][currentView])

    let models;
    let leftContent;
    if (currentView === "General") {
      models = this.models[selectedRule][currentView];
      leftContent = (
        <Thumbnail 
          names={this.rules}  
          selected={selectedRule}
          handleClick={selectedRule => this.setState({ selectedRule })}
        />
      )
    }
    else {
      models = this.models[selectedRule][currentView][selectedSubRule];
      leftContent = (
        <RectThumbnail 
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
              handleHierarchyClick={currentView  => this.setState({ currentView })}
            />
            {leftContent}
          </div>
          
          <Navigation
            models={models}
            selection={selectedRule}
            tabIcons={this.tabIcons[currentView]}
          />
        </div>
      </Card>
    )
  }
}