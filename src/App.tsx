import { ThemeProvider, Typography } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useMemo, useState } from 'react';
import Menu from './Menu';
import NavTabs from './NavTabs';
import Config from './Config';
import FavIcon from './images/ml2.png'
import SiteList from './SiteList';

function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [menuOpened, setMenuOpened] = useState(false);
  const [, forceUpdate] = useState(0);
  const [tabIndex, setTabIndex] = useState(()=> {
    const siteList = localStorage.getItem(Config.siteList);
    if ((siteList == null) || (siteList == undefined) || (siteList == "")) {
      return 1
    } else {
      return 0
    }
  });
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
      <div style={{padding: "1%"}}>
        <Menu menuOpened={menuOpened} setMenuOpened={setMenuOpened} createTab={createTab}></Menu>
        <div className="Title" style={{textAlign: "center", padding: "0% 20% 0% 20%"}}>
          <img src={FavIcon} alt="icon" style={{width:"7%", alignContent: "center", marginRight: "2%"}} />
          <Typography variant="h1" style={{display: "inline-block", verticalAlign: "top"}}>ALICE Grid</Typography>
        </div>
        {/* <SiteList menuOpened={menuOpened}></SiteList> */}
        <NavTabs menuOpened={menuOpened} siteList={localStorage.getItem(Config.siteList)} forceUpdate={forceUpdate} tabIndex={tabIndex} setTabIndex={setTabIndex} issues={issues} setIssues={setIssues} createTab={createTab} changeIcon={changeIcon}></NavTabs>
      </div>
    </ThemeProvider>
  );
}

export default App;
