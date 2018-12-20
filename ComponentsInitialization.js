define(function (require) {
    return function (GEPPETTO) {
        var React = require('react');
        var ReactDOM = require('react-dom');
        var MuiThemeProvider = require('@material-ui/core/styles/MuiThemeProvider').default;
        var Utils = require('./Utils').default;
        var HNNMain = require('./HNNMain').default;
        var theme = require('./Theme').default;
        var Console = require('../../js/components/interface/console/Console');
        var TabbedDrawer = require('../../js/components/interface/drawer/TabbedDrawer');
        var PythonConsole = require('../../js/components/interface/pythonConsole/PythonConsole');
        
        require('./css/hnn.less');

        function App(data = {}) {
            return (
                <div>
                    <MuiThemeProvider theme={theme}>
                        <HNNMain {...data}/>
                    </MuiThemeProvider>

                    <div id="footer">
                        <div id="footerHeader">
                            <TabbedDrawer labels={["Console", "Python"]} iconClass={["fa fa-terminal", "fa fa-flask"]} >
                                <Console />
                                <PythonConsole pythonNotebookPath={"http://" + window.location.hostname + ":" + window.location.port + "/notebooks/notebook.ipynb"} />
                            </TabbedDrawer>
                        </div>
                    </div>
                </div>
            );
        }
        ReactDOM.render(<App />, document.querySelector('#mainContainer'));

        GEPPETTO.G.setIdleTimeOut(-1);
        GEPPETTO.G.debug(true); //Change this to true to see messages on the Geppetto console while loading
        GEPPETTO.Resources.COLORS.DEFAULT = "#008ea0";
        
        GEPPETTO.trigger(GEPPETTO.Events.Show_spinner, "Initialising HNN");

        GEPPETTO.on('jupyter_geppetto_extension_ready',  (data) => {
          Utils.execPythonMessage('from hnn_ui.hnn_geppetto import hnn_geppetto');
          Utils.evalPythonMessage('hnn_geppetto.getData',[]).then((response) => {
            let data = Utils.convertToJSON(response)
            ReactDOM.render(<App data={data} />, document.querySelector('#mainContainer'));
          })
        });
    };
});
