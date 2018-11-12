define(function (require) {
    return function (GEPPETTO) {
        var ReactDOM = require('react-dom');
        var React = require('react');
        var createMuiTheme = require('@material-ui/core/styles/createMuiTheme').default;
        var MuiThemeProvider = require('@material-ui/core/styles/MuiThemeProvider').default;
        var HNNMain = require('./HNNMain').default;
        var Utils = require('./Utils').default;
        var Console = require('../../js/components/interface/console/Console');
        var TabbedDrawer = require('../../js/components/interface/drawer/TabbedDrawer');
        var PythonConsole = require('../../js/components/interface/pythonConsole/PythonConsole');


        require('./css/hnn.less');
        require('./css/material.less');

        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#802989',
                },
                secondary: {
                    main: '#1156a2',
                },
                tertiary: {
                    main: '#ffd600',
                },
            }
        });

        function App(data = {}) {
            return (
                <div>
                    <MuiThemeProvider theme={theme}>
                        <HNNMain/>
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
                //FIXME: Hack to remove backslashes manually
                var data = JSON.parse(response.replace(/\\/g, "/"))
                ReactDOM.render(<App data={data} />, document.querySelector('#mainContainer'));
                GEPPETTO.trigger("spinner:hide");
            })
        });
    };
});
