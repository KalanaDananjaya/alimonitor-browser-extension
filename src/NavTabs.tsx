import { useEffect, useState } from 'react';
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
        <Box sx={{ p: 12 }}>
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
        return ({opacity: 100})
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    props.setTabIndex(newValue);
  };

  const handleChangeIndex = (index: number) => {
    props.setTabIndex(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper'}} style={mainStyle(props.menuOpened)}>
      <AppBar position="static">
        <Tabs
          value={props.tabIndex}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Site" {...a11yProps(0)} />
          <Tab label="Grid" {...a11yProps(1)} />
          <Tab label="Alerts" {...a11yProps(2)} />
          <Tab label="Configuration" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={props.tabIndex}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={props.tabIndex} index={0} dir={theme.direction}>
            <Guages menuOpened={props.menuOpened} type="Site" siteList={props.siteList} forceUpdate={props.forceUpdate} setIssues={props.setIssues} createTab={props.createTab} changeIcon={props.changeIcon}></Guages>
        </TabPanel>
        <TabPanel value={props.tabIndex} index={1} dir={theme.direction}>
            <Guages menuOpened={props.menuOpened} type="Grid" siteList={props.siteList} forceUpdate={props.forceUpdate} setIssues={props.setIssues} createTab={props.createTab} changeIcon={props.changeIcon}></Guages>
        </TabPanel>
        <TabPanel value={props.tabIndex} index={2} dir={theme.direction}>
            <Alerts issues={props.issues} createTab={props.createTab}></Alerts>
        </TabPanel>
        <TabPanel value={props.tabIndex} index={3} dir={theme.direction}>
            <Form menuOpened={props.menuOpened} forceUpdate={props.forceUpdate} setTabIndex={props.setTabIndex}></Form>
        </TabPanel>
        
      </SwipeableViews>
    </Box>
  );
}

export default NavTabs;