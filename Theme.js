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
		secondary: {
			main: '#1156a2',
		},
		ternary: {
			main: '#473f94'
		}
	},
	status: {
		active: '#ffd600',
	},
	overrides: {
		MuiBottomNavigationAction: {
			label: {
				fontSize: "1.0rem",
				"&selected": {
					fontSize: "1.125rem!important"
				}
			}
		},
		MuiFormLabel: {
			root: {
				fontSize: "1.25rem",
				"&focused": {
					fontSize: "1.0rem"
				},
			}
		},
		MuiExpansionPanelSummary: {
			root: {
				backgroundColor: '#1156a2',
			},
			expandIcon: {
				color: "white",
			}
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
			select: {
				"&:focus" :{
					background: "none"
				}
			}
		},
		MuiTab: {
			root:{
				fontSize:"1.1rem!important"
			}
		}
	}
});