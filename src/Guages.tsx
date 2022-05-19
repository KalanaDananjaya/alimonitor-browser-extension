import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import GaugeChart from 'react-gauge-chart';
import axios from 'axios';
import { Button, Grid, ThemeProvider, Paper, Box, Typography } from '@material-ui/core'
import alert from './images/alert.png'
import Config from './Config'
import { makeStyles } from "@material-ui/core/styles";

function Guage(props) {

  const useStyles = makeStyles(() => ({
    item:{
      cursor: "pointer",
      '&:hover':{
        '&>a':{
          color:'green',
          
        }
      }
    }
  }));

  const classes = useStyles();

  const [isLoaded, setIsLoaded] = useState(false);
  const [gridData, setGridData] = useState({
    activeJobs: 0,
    maxActiveJobs: 0,
    gridActiveJobs: 0,
    gridMaxActiveJobs: 0,
    sesTotalSize: 0,
    sesUsedSpace: 0,
    gridTotalSize: 0,
    gridUsedSpace: 0,
    siteIssues: [],
    csIssues: []
  })
  const [gridRunningJobsPerc, setGridRunningJobsPerc] = useState(0);
  const [gridStorageUsedPerc, setGridStorageUsedPerc] = useState(0);
  const [gridAlerts, setGridAlerts] = useState(0)
  const [siteRunningJobsPerc, setSiteRunningJobsPerc] = useState(0);
  const [siteStorageUsedPerc, setSiteStorageUsedPerc] = useState(0);
  const [siteAlerts, setSiteAlerts] = useState(0);
  const [siteSeUrlLink, setSiteSeUrl] = useState("http://alimonitor.cern.ch/stats?page=SE/table");
  const [error, setError] = useState(null);
  let siteSeUrl = "http://alimonitor.cern.ch/stats?page=SE/table";

  const updateGridData = () => {
    const storedSiteList = localStorage.getItem(Config.siteList)
    let siteList =  "" 
    if (storedSiteList !== null) {
      siteList = storedSiteList
      siteSeUrl = "http://alimonitor.cern.ch/stats?filter_0_0="+ encodeURIComponent(siteList) + "&page=SE%2Ftable"
      setSiteSeUrl(siteSeUrl)
    }
    axios
      .get(Config.baseUrl + "pluginData.jsp?filter=" + siteList)
      .then( (response) => {
        let gridStatusData = response.data
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
        
        

        setIsLoaded(true);
      })
      .catch(function (error) {
        setError(error)
        console.log(error);
      });
  }

  const handleClick = (tab, column, url) => {
    window.open(url, "_blank")
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
          <Grid item xs={4} md={4} lg={4} classes={{root: classes.item}} onClick={() => handleClick(props.type, "jobs", "http://alimonitor.cern.ch/display?page=jobStatusSites_RUNNING")}>
            <GaugeChart id="gauge-chart2"
              nrOfLevels={20}
              colors={["#FF0000", "#33FF4C"]}
              textColor="#464A4F"
              percent={gridRunningJobsPerc === NaN ? 0 : gridRunningJobsPerc}
              style={chartStyle}
              
            />
            <Typography align="center">Active Jobs :  {gridData.gridActiveJobs}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={4} classes={{root: classes.item}} onClick={() => handleClick(props.type, "se", "http://alimonitor.cern.ch/stats?page=SE/table")}>
            <GaugeChart id="gauge-chart2"
              nrOfLevels={20}
              colors={["#33FF4C", "#FF0000"]}
              textColor="#464A4F"
              percent={gridStorageUsedPerc === NaN ? 0 : gridStorageUsedPerc}
              style={chartStyle}
            />
            <Typography align="center">Storage Used  :  {(gridData.gridUsedSpace).toFixed(2)} PB </Typography>
            <Typography align="center">Total Storage :  {(gridData.gridTotalSize).toFixed(2)} PB </Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={4} classes={{root: classes.item}} onClick={() => handleClick(props.type, "alerts", "http://alimonitor.cern.ch/toolbar_annotations.jsp")}>
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
          <Grid item xs={4} md={4} lg={4} classes={{root: classes.item}} onClick={() => handleClick(props.type, "jobs", "http://alimonitor.cern.ch/display?page=jobStatusSites_RUNNING")}>
            <GaugeChart id="gauge-chart2"
              nrOfLevels={20}
              colors={["#FF0000", "#33FF4C"]}
              textColor="#464A4F"
              percent={siteRunningJobsPerc === NaN ? 0 : siteRunningJobsPerc}
              style={chartStyle}
            />
            <Typography align="center">Active Jobs :  {gridData.activeJobs}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={4} classes={{root: classes.item}} onClick={() => handleClick(props.type, "se", siteSeUrlLink)}>
            <GaugeChart id="gauge-chart2"
              nrOfLevels={20}
              colors={["#33FF4C", "#FF0000"]}
              textColor="#464A4F"
              percent={siteStorageUsedPerc === NaN ? 0 : siteStorageUsedPerc}
              style={chartStyle}
            />
            <Typography align="center">Storage Used :  {(gridData.sesUsedSpace).toFixed(2)} PB </Typography>
            <Typography align="center">Total Storage :  {(gridData.sesTotalSize ).toFixed(2)} PB </Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={4} classes={{root: classes.item}} onClick={() => handleClick(props.type, "alerts", "")}>
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