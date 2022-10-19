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
  PRIMARY = "#FF5858",
  SECONDARY = "#C8FA5F",
  FONT_GLOBAL = "'Ubuntu', sans-serif",
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
    }
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