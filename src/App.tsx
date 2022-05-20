import { ThemeProvider, Typography } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useMemo, useState } from 'react';
import Menu from './Menu';
import NavTabs from './NavTabs';
import Config from './Config';

function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [menuOpened, setMenuOpened] = useState(false);
  const [, forceUpdate] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [issues, setIssues] = useState({
    siteIssues : [],
    csIssues: []
  });

  const createTab = (url) => {
    browser.tabs.create({
      url: url
    });
  }

  const changeIcon = (color) => {
    browser.browserAction.setIcon({
      path: "./images/alert-" + color + ".png"
    })
  }

  const theme = useMemo(
    () =>
    createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
        typography: {
          h1: {
            fontSize: 36,
            fontWeight: 400,
          },
          body2: {
            fontSize: 18,
            float: 'right'
          },
        }
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <div style={{padding: '1%'}}>
        <Typography variant="h1" align="center">AliMonitor Extension</Typography>
        <Menu menuOpened={menuOpened} setMenuOpened={setMenuOpened} createTab={createTab}></Menu>
        <Typography variant="body2" align="center">Sitelist : [ {localStorage.getItem(Config.siteList)} ]</Typography>
        <NavTabs menuOpened={menuOpened} siteList={localStorage.getItem(Config.siteList)} forceUpdate={forceUpdate} tabIndex={tabIndex} setTabIndex={setTabIndex} issues={issues} setIssues={setIssues} createTab={createTab} changeIcon={changeIcon}></NavTabs>
      </div>
    </ThemeProvider>
  );
}

export default App;
