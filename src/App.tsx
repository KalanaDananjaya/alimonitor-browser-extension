import { Grid, ThemeProvider, Paper, Box, Typography } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useMemo, useState, useEffect } from 'react';
import RecursiveTreeView from './RecursiveTreeView';
import FullWidthTabs from './Tabs';
import Form from './Form';
import Config from './Config';

function App() {

  
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [menuOpened, setMenuOpened] = useState(false);
  const [, forceUpdate] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);

  const theme = useMemo(
    () =>
    createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
        typography: {
          h1: {
            fontSize: 16,
            fontWeight: 400,
          },
          body1: {
            fontFamily: 'monospace',
            fontSize: 18,
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h1" align="center">AliMonitor</Typography>
      <RecursiveTreeView menuOpened={menuOpened} setMenuOpened={setMenuOpened} ></RecursiveTreeView>
      <Form forceUpdate={forceUpdate} setTabIndex={setTabIndex}></Form>
      <FullWidthTabs menuOpened={menuOpened} siteList={localStorage.getItem(Config.siteList)} forceUpdate={forceUpdate} tabIndex={tabIndex} setTabIndex={setTabIndex}></FullWidthTabs>
    
    </ThemeProvider>
  );

  
}

export default App;
