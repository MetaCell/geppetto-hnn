define(function (require) {
    return function (GEPPETTO) {
        var React = require('react');
        var ReactDOM = require('react-dom');
        var createMuiTheme = require('@material-ui/core/styles/createMuiTheme').default;
        var MuiThemeProvider = require('@material-ui/core/styles/MuiThemeProvider').default;
        var HNNMain = require('./HNNMain').default;
        var Console = require('../../js/components/interface/console/Console');
        var TabbedDrawer = require('../../js/components/interface/drawer/TabbedDrawer');
        var PythonConsole = require('../../js/components/interface/pythonConsole/PythonConsole');
        var {getGeppettoCommonLibrary, getTypeById, execPythonMessage, sendPythonMessage} = require('../../js/communication/geppettoJupyter/GeppettoJupyterUtils');

        require('./css/hnn.less');

        const theme = createMuiTheme({
            palette: {
              primary: {
                main: '#802989',
              },
              secondary: {
                main: '#1156a2',
              },
            },
            status: {
                active: '#ffd600',
                gray_out: '#dbdbdb'
              },
});

        function App(data = {}) {
            return (
                <div>
                    <MuiThemeProvider theme={theme}>
                        <HNNMain/>
                    </MuiThemeProvider>

                    <div id="footer" style={{ zIndex: "10000" }}>
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
            execPythonMessage('from hnn_ui.hnn_geppetto import hnn_geppetto');
        });
    };
});
