import React, { Component } from 'react'
import HNNInstantiated from '../instantiation/HNNInstantiated';
import * as FlexLayout from 'geppetto-client/js/components/interface/flexLayout2/src/index';
import Actions from 'geppetto-client/js/components/interface/flexLayout2/src/model/Actions';
import Plots from "../general/materialComponents/Plots";
import MaterialIconButton from "../general/materialComponents/IconButtonWithTooltip";
import Utils from "../../Utils";
import { withStyles } from "@material-ui/core";
import Rnd from "react-rnd";

const json = {
  "global": { sideBorders: 8 },
  "layout": {
    "type": "row",
    "weight": 100,
    "id": "root",
    "children": [
      {
        "type": "row",
        "weight": 100,
        "children": [
          {
            "type": "tabset",
            "weight": 40,
            "id": "top",
            "children": [
              {
                "type": "tab",
                "name": "Dipole",
                "component": "DipoleIframe",
                "id":"dipole",
              }
            ]
          },
          {
            "type": "tabset",
            "weight": 60,
            "id": "bottom",
            "children": [
              {
                "type": "tab",
                "name": "3D",
                "component": "HNNInstantiated",
                "id":"3d",
              }
            ]
          }
        ]
      }
    ]
  },
  "borders": [
    {
      "type": "border",
      "location": "bottom",
      "size": 100,
      "children": [],
      "barSize": 35
    }
  ]
};


const styles = {
  button: {
    transition: "background-color 150ms cubic-bezier(0.2, 0, 0.1, 1) 0ms",
    padding: "8px",
    top: "0"
  }
};

class HNNFlexLayoutContainer extends Component {

  constructor (props) {
    super(props);

    this.model = FlexLayout.Model.fromJson(json);
    this.state = {
      modelExist: false,
      canvasUpdateRequired: false,
      simulationUpdateRequired: true,
      hnnInstantiatedVisible: true,
      plots: {
        'dipole': { name: 'Dipole', component: 'DipoleIframe', id:'dipole', location:'Top', isVisible: true, html: null, getPlotMessage: 'hnn_geppetto.get_dipole_plot' },
        'traces': { name: 'Traces', component: 'TracesIframe', id:'traces', location:'Bottom', isVisible: false, html: null, getPlotMessage: 'hnn_geppetto.get_traces_plot' },
        'psd': { name: 'PSD', component: 'PSDIframe', id:'psd', location:'Bottom', isVisible: false, html: null, getPlotMessage: 'hnn_geppetto.get_psd_plot' },
        'raster': { name: 'Raster', component: 'RasterIframe', id:'raster', location:'Bottom', isVisible: false, html: null, getPlotMessage: 'hnn_geppetto.get_raster_plot' },
        'spectrogram': { name: 'Spectrogram', component: 'SpectrogramIframe', id:'spectrogram', location:'Bottom', isVisible: false, html: null, getPlotMessage: 'hnn_geppetto.get_spectrogram_plot' },
      }
    };


  }

  async componentDidMount (prevProps, prevState) {
    const { plots } = this.state;

    if (plots['dipole'].html === null) {
      const message = plots['dipole'].getPlotMessage;

      Utils.evalPythonMessage(message,[]).then(response => {
        let html_quoted = response.replace(/\\n/g, '').replace(/\\/g, '');
        let html = html_quoted.substring(1, html_quoted.length - 1);
        this.setState({ plots: { ...this.state.plots, 'dipole': { ...this.state.plots['dipole'], html: html } } });
      })
    }
  }

  async componentDidUpdate (prevProps, prevState) {
    const { showCanvas } = this.props;
    const { modelExist } = this.state;
    /*
     * when showing the canvas, check if the model has changed
     * to know if we need to re-run simulation or update the canvas
     */
    if (showCanvas && !prevProps.showCanvas && modelExist) {
      const message = 'hnn_geppetto.compare_cfg_to_last_snapshot';
      const { canvasUpdateRequired, simulationUpdateRequired } = await Utils.evalPythonMessage(message, []);
      this.setState({ canvasUpdateRequired, simulationUpdateRequired });
    }

    if (prevState.plots !== this.state.plots){
      this.updatePlots(prevState);
    }

    if ((this.state.hnnInstantiatedVisible !== prevState.hnnInstantiatedVisible) && this.state.hnnInstantiatedVisible) {
      this.addTabToTabSetOrCreate("Bottom", {
        "name": "3D",
        "component": "HNNInstantiated",
        "id": "3d"
      });
      this.instantiate()
    }

    if ((prevState.simulationUpdateRequired !== this.state.simulationUpdateRequired) && !this.state.simulationUpdateRequired){
      this.updateActivePlots()
    }

  }

  updatePlots (prevState){
    for (let plot in this.state.plots){
      let currentPlot = this.state.plots[plot];
      let prevPlot = prevState.plots[plot];
      if ((currentPlot.isVisible !== prevPlot.isVisible) && currentPlot.isVisible){
        this.addTabToTabSetOrCreate(currentPlot.location,{
          "name": currentPlot.name,
          "component" : currentPlot.component,
          "id" : currentPlot.id
        });
      }
    }
  }
  async updateActivePlots (){
    for (let plot in this.state.plots){
      let currentPlot = this.state.plots[plot];
      if (currentPlot.isVisible){
        const message = currentPlot.getPlotMessage;
        Utils.evalPythonMessage(message,[]).then(response => {
          // console.log("Response: " + response);
          let html_quoted = response.replace(/\\n/g, '').replace(/\\/g, '');
          let html = html_quoted.substring(1, html_quoted.length - 1);
          //* FIX THIS*
          this.setState({ plots: { ...this.state.plots, 'dipole': { ...this.state.plots[plot], html: html } } });

        })
      }
    }
  }

  addTabToTabSetOrCreate (location, json){
    let idChild = 0;
    let bottomChild = 0;
    let tempModel = this.refs.layout.model;
    let modelChildren = tempModel.getRoot().getChildren();

    for (let i = 0; i <= modelChildren.length - 1; i++) {
      if (modelChildren[i].getRect().getBottom() > bottomChild) {
        bottomChild = modelChildren[i].getRect().getBottom();
        idChild = i;
      }
    }

    let toNode = modelChildren[idChild];
    if (toNode instanceof FlexLayout.TabSetNode || toNode instanceof FlexLayout.BorderNode || toNode instanceof FlexLayout.RowNode) {
      if (location === "Top"){
        this.refs.layout.model.doAction(Actions.addNode(json, toNode.getId(), FlexLayout.DockLocation.TOP, -1));
      } else {
        let toNodeChildren = toNode.getChildren();
        let bottomTab = 0;
        let idTab = 0;
        for (let j = 0; j <= (toNodeChildren.length - 1); j++){
          if (toNodeChildren[j].getRect().getBottom() > bottomTab) {
            bottomTab = toNodeChildren[j].getRect().getBottom();
            idTab = j;
          }
        }
        let toTabSet = toNodeChildren[idTab];
        if (toTabSet instanceof FlexLayout.TabSetNode){
          this.refs.layout.addTabToTabSet(toTabSet.getId(),json);
        } else {
          this.refs.layout.model.doAction(Actions.addNode(json, toNode.getId(), FlexLayout.DockLocation.BOTTOM, -1));
        }

      }
    }
  }


  factory (node) {
    const { showCanvas } = this.props;
    const { plots } = this.state;
    let component = node.getComponent();
    let loadingSpinner = (
      <div style={{ textAlign: "center" }}>
        <i style= {{ color: "#802989" }} className='fa fa-spinner fa-spin fa-5x'/>
      </div>
    );
    if (component === "DipoleIframe" ) {
      if (plots['dipole'].html === null) {
        return loadingSpinner
      }
      node.setEventListener("close", () => {
        this.setState({ plots: { ...this.state.plots, 'dipole': { ...this.state.plots['dipole'], isVisible: false } } });
      });
      return (
        <div style={{ width: '100%', height: '100%', textAlign: "center" }}>
          <iframe name='dipole' srcDoc={plots['dipole'].html}
            onLoad={() => this.centerIframe('dipole')}
            style={{ border: 0, width: '100%', height: '100%' }}/>
        </div>
      );
    }
    if (component === "TracesIframe" ) {
      if (plots['traces'].html === null) {
        return loadingSpinner
      }
      node.setEventListener("close", () => {
        this.setState({ plots: { ...this.state.plots, 'traces': { ...this.state.plots['traces'], isVisible: false } } });
      });
      return (
        <div style={{ width: '100%', height: '100%', textAlign: "center" }}>
          <iframe name='traces' srcDoc={plots['traces'].html}
            onLoad={() => this.centerIframe('traces')}
            style={{ border: 0, width: '100%', height: '100%' }}/>
        </div>
      );
    }
    if (component === "PSDIframe" ) {
      if (plots['psd'].html === null) {
        return loadingSpinner
      }
      node.setEventListener("close", () => {
        this.setState({ plots: { ...this.state.plots, 'psd': { ...this.state.plots['psd'], isVisible: false } } });
      });
      return (
        <div style={{ width: '100%', height: '100%', textAlign: "center" }}>
          <iframe name='psd' srcDoc={plots['psd'].html}
            onLoad={() => this.centerIframe('psd')}
            style={{ border: 0, width: '100%', height: '100%' }}/>
        </div>
      );
    }
    if (component === "RasterIframe" ) {
      if (plots['raster'].html === null) {
        return loadingSpinner
      }
      node.setEventListener("close", () => {
        this.setState({ plots: { ...this.state.plots, 'raster': { ...this.state.plots['raster'], isVisible: false } } });
      });
      return (
        <div style={{ width: '100%', height: '100%', textAlign: "center" }}>
          <iframe name='raster'
            srcDoc={plots['raster'].html}
            onLoad={() => this.centerIframe('raster')}
            style={{ border: 0, width: '100%', height: '100%' }}/>
        </div>
      );
    }
    if (component === "SpectrogramIframe" ) {
      if (plots['spectrogram'].html === null) {
        return loadingSpinner
      }
      node.setEventListener("close", () => {
        this.setState({ plots: { ...this.state.plots, 'spectrogram': { ...this.state.plots['spectrogram'], isVisible: false } } });
      });

      return (
        <div style={{ width: '100%', height: '100%', textAlign: "center" }}>
          <iframe name='spectrogram' srcDoc={plots['spectrogram'].html}
            onLoad={() => this.centerIframe('spectrogram')}
            style={{ border: 0, width: '100%', height: '100%' }}/>
        </div>
      );
    } else if (component === "HNNInstantiated") {
      node.setEventListener("close", () => {
        this.setState({
          hnnInstantiatedVisible: false,
          canvasUpdateRequired: false,
        });
      });
      return (<HNNInstantiated showCanvas={showCanvas}/>);
    }
  }

  centerIframe (plot){
    let cssLink = document.createElement("link");
    cssLink.href = "geppetto/css/iframeStyle.css";
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    frames[plot].document.body.appendChild(cssLink)
  }

  async refreshCanvas () {
    const { simulationUpdateRequired } = this.state;
    if (simulationUpdateRequired) {
      await this.instantiate()
    }
    GEPPETTO.trigger(GEPPETTO.Events.Show_spinner, GEPPETTO.Resources.PARSING_MODEL);
    this.canvasRef.current.engine.updateSceneWithNewInstances(window.Instances);
    this.setState({ canvasUpdateRequired: false });
    GEPPETTO.trigger(GEPPETTO.Events.Hide_spinner);
  }

  async instantiate () {
    GEPPETTO.CommandController.log("The model is getting instantiated...");
    GEPPETTO.trigger(GEPPETTO.Events.Show_spinner, GEPPETTO.Resources.INSTANTIATING_MODEL);
    const response = await Utils.evalPythonMessage('hnn_geppetto.instantiateModelInGeppetto', []);

    if (!this.processError(response)) {
      GEPPETTO.trigger(GEPPETTO.Events.Show_spinner, GEPPETTO.Resources.PARSING_MODEL);
      GEPPETTO.Manager.loadModel(response);
      GEPPETTO.CommandController.log("The model instantiation was completed");
      this.setState({ simulationUpdateRequired: false, modelExist: true });
      GEPPETTO.trigger(GEPPETTO.Events.Hide_spinner);

    }
  }

  processError (response) {
    let parsedResponse = Utils.getErrorResponse(response);
    if (parsedResponse) {
      GEPPETTO.trigger(GEPPETTO.Events.Hide_spinner);
      this.setState({ openErrorDialog: true, errorMessage: parsedResponse['message'], errorDetails: parsedResponse['details'] });
      return true;
    }
    return false;
  }

  dipoleHandler () {
    if (this.state.plots['dipole'].isVisible){
      this.refs.layout.model.doAction(Actions.selectTab("dipole"));
    }
    this.setState({ plots: { ...this.state.plots, 'dipole': { ...this.state.plots['dipole'], isVisible: true } } });
  }

  tracesHandler () {
    if (this.state.plots['traces'].isVisible){
      this.refs.layout.model.doAction(Actions.selectTab("traces"));
    }
    if (this.state.plots['traces'].html === null) {
      const message = 'hnn_geppetto.get_traces_plot';
      Utils.evalPythonMessage(message,[]).then(response => {
        let html_quoted = response.replace(/\\n/g, '').replace(/\\/g, '');
        let html = html_quoted.substring(1, html_quoted.length - 1);
        this.setState({ plots: { ...this.state.plots, 'traces': { ...this.state.plots['traces'], isVisible: true, html: html } } });
      })
    }
  }
  psdHandler () {
    if (this.state.plots['psd'].isVisible){
      this.refs.layout.model.doAction(Actions.selectTab("psd"));
    }
    if (this.state.plots['psd'].html === null) {
      const message = 'hnn_geppetto.get_psd_plot';

      Utils.evalPythonMessage(message,[]).then(response => {
        let html_quoted = response.replace(/\\n/g, '').replace(/\\/g, '');
        let html = html_quoted.substring(1, html_quoted.length - 1);
        this.setState({ plots: { ...this.state.plots, 'psd': { ...this.state.plots['psd'], isVisible: true, html: html } } });

      })
    }
  }
  rasterHandler () {
    if (this.state.plots['raster'].isVisible){
      this.refs.layout.model.doAction(Actions.selectTab("raster"));
    }
    if (this.state.plots['raster'].html === null) {
      const message = 'hnn_geppetto.get_raster_plot';

      Utils.evalPythonMessage(message,[]).then(response => {
        let html_quoted = response.replace(/\\n/g, '').replace(/\\/g, '');
        let html = html_quoted.substring(1, html_quoted.length - 1);
        this.setState({ plots: { ...this.state.plots, 'raster': { ...this.state.plots['raster'], isVisible: true, html: html } } });
      })
    }
  }
  spectrogramHandler () {
    if (this.state.plots['spectrogram'].isVisible){
      this.refs.layout.model.doAction(Actions.selectTab("spectrogram"));
    }
    if (this.state.plots['spectrogram'].html === null) {
      const message = 'hnn_geppetto.get_spectrogram_plot';

      Utils.evalPythonMessage(message,[]).then(response => {
        let html_quoted = response.replace(/\\n/g, '').replace(/\\/g, '');
        let html = html_quoted.substring(1, html_quoted.length - 1);
        this.setState({ plots: { ...this.state.plots, 'spectrogram': { ...this.state.plots['spectrogram'], isVisible: true, html: html } } });
      })
    }
  }

  render () {
    const { visibility, classes } = this.props;
    const { hnnInstantiatedVisible, canvasUpdateRequired, simulationUpdateRequired } = this.state;

    const plotList = [
      {
        title: "Dipole",
        subtitle: "Dipole plot",
        handler: this.dipoleHandler.bind(this)
      },
      {
        title: "Traces",
        subtitle: "Traces plot",
        handler: this.tracesHandler.bind(this)
      },
      {
        title: "PSD",
        subtitle: "Power spectral density plot",
        handler: this.psdHandler.bind(this)
      },
      {
        title: "Raster",
        subtitle: "Raster plot",
        handler: this.rasterHandler.bind(this)
      },
      {
        title: "Spectrogram",
        subtitle: "Spectrogram plot",
        handler: this.spectrogramHandler.bind(this)
      },
    ];

    let key = 0;
    let onRenderTabSet = function (node, renderValues) {
      if (node.getType() === "tabset") {
        renderValues.buttons.push(<div key={key} className="fa fa-window-minimize customIconFlexLayout" onClick={() => {
          this.model.doAction(FlexLayout.Actions.moveNode(node.getSelectedNode().getId(), "border_bottom", FlexLayout.DockLocation.CENTER, 0));
        }} />);
        key++;
      }
    };

    let clickOnBordersAction = function (node) {
      let idChild = 0;
      let bottomChild = 0;
      let tempModel = node.getModel();
      let modelChildren = tempModel.getRoot().getChildren();
      if (node instanceof FlexLayout.TabNode || node instanceof FlexLayout.TabSetNode) {

        for (let i = 0; i <= (modelChildren.length - 1); i++) {
          if (modelChildren[i].getRect().getBottom() > bottomChild) {
            bottomChild = modelChildren[i].getRect().getBottom();
            idChild = i;
          }
        }

        let component = node.getComponent();
        let toNode = modelChildren[idChild];
        if (toNode instanceof FlexLayout.TabSetNode || toNode instanceof FlexLayout.BorderNode || toNode instanceof FlexLayout.RowNode) {
          let location = component === "DipoleIframe" ? FlexLayout.DockLocation.TOP : FlexLayout.DockLocation.BOTTOM;
          this.model.doAction(FlexLayout.Actions.moveNode(node.getId(), toNode.getId(), location, 0));
        }
      }
    };

    let displayVisibility = visibility === "hidden" ? "none" : "block";


    return (
      <div style={{ top:`65px`, height:'100%', position:'absolute', width:'100%', bottom:'0px', visibility, display: displayVisibility }}>
        <Rnd
          enableResizing={{
            top: false, right: false, bottom: false, left: false,
            topRight: false, bottomRight: false, bottomLeft: false,
            topLeft: false
          }}
          default={{
            x: 0, y: 0,
            height: 40,
            width: '100%'
          }}
          style={{ zIndex:'99', marginBottom:'8px' }}
          className="HNNToolBarClass"
          disableDragging={true}
          ref={e => {
            this.rnd = e;
          }} >
          <div style={{ float:'right', marginRight:'30px' }}>
            <Plots plots={plotList} />
            <MaterialIconButton
              disabled={!simulationUpdateRequired}
              onClick={() => this.instantiate()}
              className={" fa fa-rocket " + `${classes.button}`}
              tooltip={simulationUpdateRequired ? "Run Simulation" : "Network already simulated"}
            />
            <MaterialIconButton
              disabled={!canvasUpdateRequired}
              onClick={() => this.refreshCanvas()}
              className={" fa fa-refresh " + `${classes.button}`}
              tooltip={canvasUpdateRequired ? "Update 3D view" : "Latest 3D view"}
            />
            <MaterialIconButton
              disabled={hnnInstantiatedVisible}
              onClick={() => {
                if (this.state.hnnInstantiatedVisible){
                  this.refs.layout.model.doAction(Actions.selectTab("3d"));
                }
                this.setState({ hnnInstantiatedVisible: true, });
              }}
              className={" fa fa-cube " + `${classes.button}`}
              tooltip={!hnnInstantiatedVisible ? "Show 3D Canvas" : "3D Canvas already showing"}
            />
          </div>
        </Rnd>
        <div style={{ top:`0`, height:'93%', position:'absolute', width:'100%', bottom:'0px', visibility, display: displayVisibility }}>
          <FlexLayout.Layout
            ref="layout"
            model={this.model}
            factory={this.factory.bind(this)}
            onRenderTabSet={onRenderTabSet}
            clickOnBordersAction={clickOnBordersAction}
          />
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(HNNFlexLayoutContainer)