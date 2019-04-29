import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
    htmlFontSize: 20,
    fontSize: 20,
    button: {
      textTransform: "none",
      fontSize: "1.0rem"
    }
  },
  palette: {
    primary: {
      main: '#802989',
      light: '#824189'
    },
    secondary: { main: '#1156a2', },
    ternary: { main: '#473f94' }
  },
  status: { active: '#ffd600', },
  overrides: {
    MuiBottomNavigationAction: {
      label: {
        fontSize: "1.0rem",
        "&selected": { fontSize: "1.125rem!important" }
      }
    },
    MuiFormLabel: {
      root: {
        fontSize: "1.25rem",
        "&focused": { fontSize: "1.0rem" },
      }
    },
    MuiExpansionPanelSummary: {
      root: { backgroundColor: '#1156a2', },
      expandIcon: { color: "white", }
    },
    MuiInput: {
      input: {
        outline: 'none !important', 
        border: 'none !important', 
        boxShadow: 'none !important' 
      },
    },
    MuiSelect: {
      root: {
        outline: 'none !important', 
        border: 'none !important', 
        boxShadow: 'none !important'
      },
      select: { "&:focus" :{ background: "none" } }
    },
    MuiTab: { root:{ fontSize:"1.1rem!important" } },
    MuiFab: {
      root: {
        backgroundColor: "#fefefe",
        boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.2)",
        "&:hover": {
          backgroundColor: "#fcfcfc",
          boxShadow: "0 5px 5px -3px rgba(0,0,0,0.2), 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12)"
        }
      },
      primary: { boxShadow: "0 5px 5px -3px rgba(0,0,0,0.2), 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12)" },
      label: {
        fontSize:"1.1rem",
        fontWeight: "600"
      }
    },
    MuiButton: {
      contained: {
        backgroundColor: "#f8f6f6",
        boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.2)",
        "&:hover": {
          backgroundColor: "#ececec",
          boxShadow: "0 5px 5px -3px rgba(0,0,0,0.2), 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12)"
        }
      },
      label: { fontSize:"1.1rem" },
      containedSecondary: { boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.2)" }
    }
  }
});