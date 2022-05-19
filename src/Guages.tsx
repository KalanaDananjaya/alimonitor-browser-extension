import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import GaugeChart from 'react-gauge-chart';
import axios from 'axios';
import { Button, Grid, ThemeProvider, Paper, Box, Typography } from '@material-ui/core'
import alert from './images/alert.png'
import Config from './Config'

function Guage(props) {
  // const [isLoaded, setIsLoaded] = useState(false);
  const [gridData, setGridData] = useState({
    activeJobs: 0,
    maxActiveJobs: 1,
    gridActiveJobs: 0,
    gridMaxActiveJobs: 1,
    sesTotalSize: 1,
    sesUsedSpace: 0,
    gridTotalSize: 1,
    gridUsedSpace: 0,
    siteIssues: [],
    csIssues: []
  })
  const [gridRunningJobsPerc, setGridRunningJobsPerc] = useState(0);
  const [gridStorageUsedPerc, setGridStorageUsedPerc] = useState(0);
  const [gridAlerts, setGridAlerts] = useState(0)
  const [siteRunningJobsPerc, setSiteRunningJobsPerc] = useState(0);
  const [siteStorageUsedPerc, setSiteStorageUsedPerc] = useState(0);
  const [siteAlerts, setSiteAlerts] = useState(0)
  const [error, setError] = useState(null);

  const updateGridData = () => {
    let siteList = localStorage.getItem(Config.siteList) === null ? "" : localStorage.getItem(Config.siteList)
    axios
      .get(Config.baseUrl + "pluginData.jsp?filter=" + siteList)
      .then(function (response) {
        let gridStatusData = response.data
        if (gridStatusData.sesTotalSize == 0) {
          gridStatusData.sesTotalSize = 1
        } 
        if (gridStatusData.gridTotalSize == 0) {
          gridStatusData.gridTotalSize = 1
        }
        if (gridStatusData.gridMaxActiveJobs == 0) {
          gridStatusData.gridMaxActiveJobs = 1
        }
        if (gridStatusData.maxActiveJobs == 0) {
          gridStatusData.maxActiveJobs = 1
        }
        let gridStatusDataObj = {
          activeJobs: gridStatusData.activeJobs,
          maxActiveJobs: gridStatusData.maxActiveJobs,
          gridActiveJobs: gridStatusData.gridActiveJobs,
          gridMaxActiveJobs: gridStatusData.gridMaxActiveJobs,
          sesTotalSize: gridStatusData.sesTotalSize/1000000000000000,
          sesUsedSpace: gridStatusData.sesUsedSpace/1000000000000000,
          gridTotalSize: gridStatusData.gridTotalSize/1000000000000000,
          gridUsedSpace: gridStatusData.gridUsedSpace/1000000000000000,
          siteIssues: gridStatusData.siteIssues,
          csIssues: gridStatusData.csIssues
        }
        setGridData(gridStatusDataObj)
        console.log(gridStatusDataObj, gridData)
        console.log(gridData.activeJobs, gridData.maxActiveJobs)
        console.log((gridData.gridUsedSpace, gridData.gridTotalSize))

        // Whole Grid data
        setGridRunningJobsPerc(gridStatusDataObj.gridActiveJobs / gridStatusDataObj.gridMaxActiveJobs);
        setGridStorageUsedPerc(gridStatusDataObj.gridUsedSpace / gridStatusDataObj.gridTotalSize);
        setGridAlerts(gridStatusDataObj.csIssues.length + gridStatusDataObj.siteIssues.length);

        // Site specific data
        setSiteRunningJobsPerc(gridStatusDataObj.activeJobs / gridStatusDataObj.maxActiveJobs);
        setSiteStorageUsedPerc(gridStatusDataObj.sesUsedSpace / gridStatusDataObj.sesTotalSize);
        setSiteAlerts(gridStatusDataObj.csIssues.length + gridStatusDataObj.siteIssues.length);
        
        // Alerts
        props.setIssues({
          siteIssues: gridStatusDataObj.siteIssues,
          csIssues: gridStatusDataObj.csIssues
        })

        // setIsLoaded(true);
      })
      .catch(function (error) {
        setError(error)
        console.log(error);
      });
  }

  const handleClick = (tab, column, url) => {
    console.log(tab, column, url)
  }


  useEffect(() => {

    updateGridData();
  }, [localStorage.getItem(Config.siteList)]);

  const chartStyle = {
    height: '50%'
  }

  const imageStyle = {
    display: 'block',
    margin: 'auto',
    height: '30%'
  }

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

  if (props.type === "Grid") {
    return (
      <div className="guages" style={mainStyle(props.menuOpened)}>
        <Grid container spacing={3}>
          <Grid item xs={4} md={4} lg={4}  onClick={() => handleClick(props.type, "jobs", "http://alimonitor.cern.ch/display?page=jobStatusSites_RUNNING")}>
            <GaugeChart id="gauge-chart2"
              nrOfLevels={20}
              colors={["#FF0000", "#33FF4C"]}
              textColor="#464A4F"
              percent={gridRunningJobsPerc}
              style={chartStyle}
            />
            <Typography align="center">Active Jobs :  {gridData.gridActiveJobs}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={4} onClick={() => handleClick(props.type, "se", "http://alimonitor.cern.ch/stats?page=SE/table")}>
            <GaugeChart id="gauge-chart2"
              nrOfLevels={20}
              colors={["#33FF4C", "#FF0000"]}
              textColor="#464A4F"
              percent={gridStorageUsedPerc}
              style={chartStyle}
            />
            <Typography align="center">Storage Used  :  {(gridData.gridUsedSpace).toFixed(2)} PB </Typography>
            <Typography align="center">Total Storage :  {(gridData.gridTotalSize).toFixed(2)} PB </Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={4} onClick={() => handleClick(props.type, "alerts", "http://alimonitor.cern.ch/toolbar_annotations.jsp")}>
            <img src={alert} alt="alert" style={imageStyle} />
            <Typography align="center">{gridAlerts} Alerts</Typography>
          </Grid>
        </Grid>
      </div>
    )
  } else if (props.type === "Site") {
    return (
      <div className="main" style={mainStyle(props.menuOpened)}>
        <Grid container spacing={3}>
          <Grid item xs={4} md={4} lg={4} onClick={() => handleClick(props.type, "jobs", "")}>
            <GaugeChart id="gauge-chart2"
              nrOfLevels={20}
              colors={["#FF0000", "#33FF4C"]}
              textColor="#464A4F"
              percent={siteRunningJobsPerc}
              style={chartStyle}
            />
            <Typography align="center">Active Jobs :  {gridData.activeJobs}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={4} onClick={() => handleClick(props.type, "se", "http://alimonitor.cern.ch/stats?filter_0_0=GSI%2CCERN&page=SE%2Ftable")}>
            <GaugeChart id="gauge-chart2"
              nrOfLevels={20}
              colors={["#33FF4C", "#FF0000"]}
              textColor="#464A4F"
              percent={siteStorageUsedPerc}
              style={chartStyle}
            />
            <Typography align="center">Storage Used :  {(gridData.sesUsedSpace).toFixed(2)} PB </Typography>
            <Typography align="center">Total Storage :  {(gridData.sesTotalSize ).toFixed(2)} PB </Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={4} onClick={() => handleClick(props.type, "alerts", "")}>
            <img src={alert} alt="alert" style={imageStyle} />
            <Typography align="center">{gridAlerts} Alerts</Typography>
          </Grid>
        </Grid>
      </div>
    )
  } else {
    return (<></>)
  }

};

export default Guage;