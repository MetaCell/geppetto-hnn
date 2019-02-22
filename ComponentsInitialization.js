global.jQuery = require("jquery");
global.GEPPETTO_CONFIGURATION = require('./GeppettoConfiguration.json');

jQuery(function () {
  require('geppetto-client-initialization');
  const React = require('react');
  const ReactDOM = require('react-dom');
  const MuiThemeProvider = require('@material-ui/core/styles/MuiThemeProvider').default;
  const Utils = require('./Utils').default;
  const HNNMain = require('./HNNMain').default;
  const theme = require('./Theme').default;
  const Console = require('../../js/components/interface/console/Console');
  const TabbedDrawer = require('../../js/components/interface/drawer/TabbedDrawer');
  const PythonConsole = require('../../js/components/interface/pythonConsole/PythonConsole');
      
  require('./css/hnn.less');

  function App (data = {}) {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <HNNMain {...data} />
        </MuiThemeProvider>

        <div id="footer" style={{ visibility:"hidden" }}>
          <div id="footerHeader">
            <TabbedDrawer labels={["Console", "Python"]} iconClass={["fa fa-terminal", "fa fa-flask"]}>
              <Console />
              <PythonConsole pythonNotebookPath={"../notebooks/notebook.ipynb"} />
            </TabbedDrawer>
          </div>
        </div>
      </div>
    );
  }
  ReactDOM.render(<App />, document.querySelector('#mainContainer'));

  GEPPETTO.G.setIdconstimeOut(-1);
  GEPPETTO.G.debug(true); // Change this to true to see messages on the Geppetto console while loading
  GEPPETTO.Resources.COLORS.DEFAULT = "#008ea0";
      
  GEPPETTO.trigger(GEPPETTO.Events.Show_spinner, "Initialising HNN");

  GEPPETTO.on('jupyter_geppetto_extension_ready', data => {
    Utils.execPythonMessage('from hnn_ui.hnn_geppetto import hnn_geppetto');
    Utils.evalPythonMessage('hnn_geppetto.getData',[]).then(response => {
      const data = Utils.convertToJSON(response)
      ReactDOM.render(<App data={data} />, document.querySelector('#mainContainer'));
      GEPPETTO.trigger(GEPPETTO.Events.Hide_spinner);
    })
  });
});
