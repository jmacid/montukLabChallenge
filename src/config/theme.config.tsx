import React from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline
} from "@mui/material"

type ThemeProps = {
  children: JSX.Element,
}

export enum themePallette {
  BG = "#12181b",
  PRIMARY = "#C8FA5F",
  SECONDARY = "#C8FA5F",
  FONT_GLOBAL = "'Ubuntu', sans-serif",

  // Alert styles
  ERROR_MAIN = "#f44336",
  BG_ERROR_MAIN = "rgba(244,67,54,0.1)",
  SUCCESS_MAIN = "#66bb6a",
  BG_SUCCESS_MAIN = "rgba(102,187,106,0.1)"
}

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: themePallette.BG
    },
    primary: {
      main: themePallette.PRIMARY,
    },
    secondary: {
      main: themePallette.SECONDARY,
    },
  },
  typography: {
    fontFamily: themePallette.FONT_GLOBAL,
    h1: {
      fontSize: '55px',
      color: themePallette.PRIMARY
    },
    h4: {
      fontSize: '24px'
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: "0.5em"
        },
      },
    },
    MuiAlert: {
      defaultProps: {
        style: {
          borderRadius: "0.8em",
          fontSize: "1em",
        },
      },
      styleOverrides: {
        standardError: {
          border: `1px solid ${themePallette.ERROR_MAIN}`,
          background: themePallette.BG_ERROR_MAIN
        },
        standardSuccess: {
          border: `1px solid ${themePallette.SUCCESS_MAIN}`,
          background: themePallette.BG_SUCCESS_MAIN
        }
      },
    },
  },
});

export const ThemeConfig:React.FC<ThemeProps> = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>

  )
}