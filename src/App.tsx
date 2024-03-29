import { ThemeProvider, Typography } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useMemo, useState } from 'react';
import Menu from './Menu';
import NavTabs from './NavTabs';
import Config from './Config';
import FavIcon from './images/ml2.png';
import {version} from "../package.json";


function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [menuOpened, setMenuOpened] = useState(false);
  const [, forceUpdate] = useState(0);
  const [browserTabId, setBrowserTabId] = useState(-1);

  const [tabIndex, setTabIndex] = useState(()=> {
    const siteList = localStorage.getItem(Config.siteList);
    if ((siteList == null) || (siteList == undefined) || (siteList == "")) {
      return 1
    } else {
      return 0
    }
  });
  

  const createTab = (url) => {
    // If a tab is opened by the extension, keep reusing it
    if (browserTabId != -1) {
      browser.tabs.update(browserTabId, {url: url});
    } else {
      browser.tabs.create({url: url,active: true}).then((tab) => {
        if (tab.id !== undefined) {
          setBrowserTabId(tab.id)
        }
      });
    }
  }

  const theme = useMemo(
    () =>
    createTheme({
        typography: {
          h1: {
            fontSize: 36,
            fontWeight: 400,
            textShadow: "0px 0px 1px #000000, 0px 0px 1px #000000, 0px 0px 1px #000000,0px 0px 1px #000000"
          },
          body2: {
            fontSize: 18,
            float: 'left'
          }
        }
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <div style={{width: '720px'}}>
        <Menu menuOpened={menuOpened} setMenuOpened={setMenuOpened} createTab={createTab}></Menu>
        <div className="Title" style={{textAlign: "center", padding: "0% 20% 0% 20%"}}>
        <Typography style={{position: 'absolute', right: '10px', fontSize: 10}}>v{version}</Typography>
          <img src={FavIcon} alt="icon" style={{width:"7%", alignContent: "center", marginRight: "2%", marginTop: '5px'}} />
          <Typography variant="h1" style={{display: "inline-block", verticalAlign: "top"}}>ALICE Grid</Typography>
        </div>
        <NavTabs menuOpened={menuOpened} siteList={localStorage.getItem(Config.siteList)} forceUpdate={forceUpdate} tabIndex={tabIndex} setTabIndex={setTabIndex} createTab={createTab}></NavTabs>
      </div>
    </ThemeProvider>
  );
}

export default App;
