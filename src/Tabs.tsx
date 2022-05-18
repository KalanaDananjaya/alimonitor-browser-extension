import { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Base from './Base';
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
          <Typography>{children}</Typography>
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

  // let gridTabIndex = 0;
  // let siteTabIndex = 1;
  // if (localStorage.getItem(Config.siteList) !== null){
  //   gridTabIndex = 1;
  //   siteTabIndex = 0;
  // }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    props.setTabIndex(newValue);
  };

  const handleChangeIndex = (index: number) => {
    props.setTabIndex(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
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
            <Base menuOpened={props.menuOpened} type="Grid" siteList={props.siteList} forceUpdate={props.forceUpdate}></Base>
        </TabPanel>
        <TabPanel value={props.tabIndex} index={1} dir={theme.direction}>
            <Base menuOpened={props.menuOpened} type="Site" siteList={props.siteList} forceUpdate={props.forceUpdate}></Base>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}

export default FullWidthTabs;