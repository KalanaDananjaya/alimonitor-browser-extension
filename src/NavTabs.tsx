import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Guages from './Guages';
import Form from './Form'
import Alerts from './Alerts'
import Composition from './Composition'
import Config from './Config'
import { useEffect, useState } from 'react'

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1.2 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function NavTabs(props) {
  const theme = useTheme();

  const mainStyle = (menuOpened) => {
    if (menuOpened) {
      return ({
        opacity: 0.25,
        zindex: 0
      })
    } else {
      return ({ opacity: 100 })
    }
  }

  const [isLoaded, setIsLoaded] = useState(false);

  const [gridData, setGridData] = useState({
    siteActiveJobs: 0,
    siteMaxActiveJobs: 0,
    gridActiveJobs: 0,
    gridMaxActiveJobs: 0,
    siteSesTotalSize: 0,
    siteSesUsedSpace: 0,
    gridTotalSize: 0,
    gridUsedSpace: 0,
    issues: {
      siteIssues: [],
      csIssues: []
    },
    gridTotalIssues: [],
    cpuEfficiency: {},
    lanWanTraffic: {},
    composition: {}
  })
  const [gridRunningJobsPerc, setGridRunningJobsPerc] = useState(0);
  const [gridStorageUsedPerc, setGridStorageUsedPerc] = useState(0);
  const [gridCpuEfficiency, setGridCpuEfficiency] = useState(0);
  const [gridAlertsCount, setGridAlertsCount] = useState(0)
  const [siteRunningJobsPerc, setSiteRunningJobsPerc] = useState(0);
  const [siteStorageUsedPerc, setSiteStorageUsedPerc] = useState(0);
  const [siteCpuEfficiency, setSiteCpuEfficiency] = useState(0);
  const [siteAlertsCount, setSiteAlertsCount] = useState(0);
  const [siteSeUrl, setSiteSeUrl] = useState("");
  const [error, setError] = useState(null);
  const [gridLanIn, setGridLanIn] = useState(0);
  const [gridLanOut, setGridLanOut] = useState(0);
  const [gridWanIn, setGridWanIn] = useState(0);
  const [gridWanOut, setGridWanOut] = useState(0);
  const [siteLanIn, setSiteLanIn] = useState(0);
  const [siteLanOut, setSiteLanOut] = useState(0);
  const [siteWanIn, setSiteWanIn] = useState(0);
  const [siteWanOut, setSiteWanOut] = useState(0);

  const updateGridData = (response) => {
    let gridStatusData = response.result
    console.log(gridStatusData)
    let gridStatusDataObj = {
      siteActiveJobs: gridStatusData.activeJobs,
      siteMaxActiveJobs: gridStatusData.maxActiveJobs,
      gridActiveJobs: gridStatusData.gridActiveJobs,
      gridMaxActiveJobs: gridStatusData.gridMaxActiveJobs,
      siteSesTotalSize: gridStatusData.sesTotalSize / 1000000000000000,
      siteSesUsedSpace: gridStatusData.sesUsedSpace / 1000000000000000,
      gridTotalSize: gridStatusData.gridTotalSize / 1000000000000000,
      gridUsedSpace: gridStatusData.gridUsedSpace / 1000000000000000,
      issues: {
        siteIssues: gridStatusData.siteIssues,
        csIssues: gridStatusData.csIssues,
      },
      gridTotalIssues: gridStatusData.gridTotalIssues,
      cpuEfficiency: gridStatusData.CPUEfficiency,
      lanWanTraffic: gridStatusData.LanWanTraffic,
      composition: gridStatusData.ActiveJobsSummary,
    }

    setGridData(gridStatusDataObj)

    // Whole Grid data
    let gridRunningJobsPercLocal = gridStatusDataObj.gridActiveJobs / gridStatusDataObj.gridMaxActiveJobs
    let gridStorageUsedLocal = gridStatusDataObj.gridUsedSpace / gridStatusDataObj.gridTotalSize
    setGridRunningJobsPerc(isNaN(gridRunningJobsPercLocal) ? 0 : gridRunningJobsPercLocal);
    setGridStorageUsedPerc(isNaN(gridStorageUsedLocal) ? 0 : gridStorageUsedLocal);
    setGridCpuEfficiency(isNaN(gridStatusDataObj.cpuEfficiency.TOTALS) ? 0 : gridStatusDataObj.cpuEfficiency.TOTALS / 100);
    setGridAlertsCount(gridStatusDataObj.gridTotalIssues);
    setGridLanIn(gridStatusData.LanWanTraffic.TOTALS.LAN_IN / 1000000000)
    setGridLanOut(gridStatusData.LanWanTraffic.TOTALS.LAN_OUT / 1000000000)
    setGridWanIn(gridStatusData.LanWanTraffic.TOTALS.WAN_IN / 1000000000)
    setGridWanOut(gridStatusData.LanWanTraffic.TOTALS.WAN_OUT / 1000000000)

    // Site specific data
    let siteRunningJobsPercLocal = gridStatusDataObj.siteActiveJobs / gridStatusDataObj.siteMaxActiveJobs
    let siteStorageUsedLocal = gridStatusDataObj.siteSesUsedSpace / gridStatusDataObj.siteSesTotalSize
    let siteAlertCount = gridStatusDataObj.issues.csIssues.length + gridStatusDataObj.issues.siteIssues.length
    setSiteRunningJobsPerc(isNaN(siteRunningJobsPercLocal) ? 0 : siteRunningJobsPercLocal);
    setSiteStorageUsedPerc(isNaN(siteStorageUsedLocal) ? 0 : siteStorageUsedLocal);
    setSiteCpuEfficiency(isNaN(gridStatusDataObj.cpuEfficiency.Filtered) ? 0 : gridStatusDataObj.cpuEfficiency.Filtered / 100);
    setSiteAlertsCount(siteAlertCount);
    setIsLoaded(true);
    setSiteLanIn(gridStatusData.LanWanTraffic.Filtered.LAN_IN / 1000000000)
    setSiteLanOut(gridStatusData.LanWanTraffic.Filtered.LAN_OUT / 1000000000)
    setSiteWanIn(gridStatusData.LanWanTraffic.Filtered.WAN_IN / 1000000000)
    setSiteWanOut(gridStatusData.LanWanTraffic.Filtered.WAN_OUT / 1000000000)
  }

  let myPort = browser.runtime.connect({ name: "port-from-cs" });

  myPort.onMessage.addListener((data) => {
    console.log(data);
    updateGridData(data);
  });

  useEffect(() => {
    const storedSiteList = localStorage.getItem(Config.siteList)
    let siteList = ""
    if (storedSiteList !== null) {
      siteList = storedSiteList
      setSiteSeUrl("https://alimonitor.cern.ch/stats?filter_0_0=" + encodeURIComponent(siteList) + "&page=SE%2Ftable")
    } else {
      setSiteSeUrl("https://alimonitor.cern.ch/stats?page=SE/table")
    }
    myPort.postMessage({ getData: true , url: Config.baseUrl + "/plugin/pluginData.jsp?filter=" + siteList});
  }, [localStorage.getItem(Config.siteList)]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    props.setTabIndex(newValue);
  };

  const handleChangeIndex = (index: number) => {
    props.setTabIndex(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper' }} style={mainStyle(props.menuOpened)}>
      <AppBar position="static">
        <Tabs
          value={props.tabIndex}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs"
        >
          <Tab label="Site" {...a11yProps(0)} />
          <Tab label="Grid" {...a11yProps(1)} />
          <Tab label="Alerts" {...a11yProps(2)} />
          <Tab label="Active Jobs" {...a11yProps(3)} />
          <Tab label="Config" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={props.tabIndex}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={props.tabIndex} index={0} dir={theme.direction}>
          <Guages menuOpened={props.menuOpened} handleChangeIndex={handleChangeIndex} type="Site" siteList={props.siteList} forceUpdate={props.forceUpdate} siteActiveJobs={gridData.siteActiveJobs} siteMaxActiveJobs={gridData.siteMaxActiveJobs} siteSesUsedSpace={gridData.siteSesUsedSpace} siteSesTotalSize={gridData.siteSesTotalSize} siteAlertsCount={siteAlertsCount} siteRunningJobsPerc={siteRunningJobsPerc} siteStorageUsedPerc={siteStorageUsedPerc} siteSeUrl={siteSeUrl}
            siteCpuEfficiency={siteCpuEfficiency} siteLanIn={siteLanIn} siteLanOut={siteLanOut} siteWanIn={siteWanIn} siteWanOut={siteWanOut} createTab={props.createTab}></Guages>
        </TabPanel>
        <TabPanel value={props.tabIndex} index={1} dir={theme.direction}>
          <Guages menuOpened={props.menuOpened} handleChangeIndex={handleChangeIndex} type="Grid" siteList={props.siteList} forceUpdate={props.forceUpdate} gridActiveJobs={gridData.gridActiveJobs} gridMaxActiveJobs={gridData.gridMaxActiveJobs} gridUsedSpace={gridData.gridUsedSpace} gridTotalSize={gridData.gridTotalSize} gridAlertsCount={gridAlertsCount} gridRunningJobsPerc={gridRunningJobsPerc} gridStorageUsedPerc={gridStorageUsedPerc} gridCpuEfficiency={gridCpuEfficiency}
            gridLanIn={gridLanIn} gridLanOut={gridLanOut} gridWanIn={gridWanIn} gridWanOut={gridWanOut} createTab={props.createTab} siteAlertsCount={siteAlertsCount}></Guages>
        </TabPanel>
        <TabPanel value={props.tabIndex} index={2} dir={theme.direction}>
          <Alerts issues={gridData.issues} createTab={props.createTab}></Alerts>
        </TabPanel>
        <TabPanel value={props.tabIndex} index={3} dir={theme.direction}>
          <Composition composition={gridData.composition} activeJobs={gridData.gridActiveJobs}></Composition>
        </TabPanel>
        <TabPanel value={props.tabIndex} index={4} dir={theme.direction}>
          <Form menuOpened={props.menuOpened} forceUpdate={props.forceUpdate} setTabIndex={props.setTabIndex}></Form>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}

export default NavTabs;