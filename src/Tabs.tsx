import { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Guages from './Guages';
import Config from './Config'

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

function FullWidthTabs(props) {
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

  const storedTabIndex = localStorage.getItem(Config.tabIndex);

  if(storedTabIndex === "1") {
  console.log('storassssssssssssssssed tab index is',storedTabIndex)
  props.setTabIndex(1)
}

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("or i ti should handle thi")
    props.setTabIndex(newValue);
  };

  const handleChangeIndex = (index: number) => {
    console.log("ti should handle thi")
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
          <Tab label="Grid" {...a11yProps(0)} />
          <Tab label="Site" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={props.tabIndex}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={props.tabIndex} index={0} dir={theme.direction}>
            <Guages menuOpened={props.menuOpened} type="Grid" siteList={props.siteList} forceUpdate={props.forceUpdate}></Guages>
        </TabPanel>
        <TabPanel value={props.tabIndex} index={1} dir={theme.direction}>
            <Guages menuOpened={props.menuOpened} type="Site" siteList={props.siteList} forceUpdate={props.forceUpdate}></Guages>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}

export default FullWidthTabs;