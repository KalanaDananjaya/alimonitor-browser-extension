import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import GaugeChart from 'react-gauge-chart';
import axios from 'axios';
import { Button, Grid, ThemeProvider, Paper, Box, Typography } from '@material-ui/core'
import alert from './images/alert.png'
import Config from './Config'

function Guage(props)  {
  const [isLoaded, setIsLoaded] = useState(false);
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
  const [gridStorageLeftPerc, setGridStorageLeftPerc] = useState(0);
  const [gridAlerts, setGridAlerts] = useState(0)
  const [siteRunningJobsPerc, setSiteRunningJobsPerc] = useState(0);
  const [siteStorageLeftPerc, setSiteStorageLeftPerc] = useState(0);
  const [siteAlerts, setSiteAlerts] = useState(0)
  const [error, setError] = useState(null);

  const updateGridData = () => {
    console.log('triggered')
    axios
      .get(Config.baseUrl + "plugin/pluginData.jsp?filter=" + localStorage.getItem(Config.siteList))
      .then(function (response) {
        console.log('plugin data', response.data)
        let gridStatusData = response.data
        let gridStatusDataObj = {
          activeJobs: gridStatusData.activeJobs,
          maxActiveJobs: gridStatusData.maxActiveJobs,
          gridActiveJobs: gridStatusData.gridActiveJobs,
          gridMaxActiveJobs: gridStatusData.gridMaxActiveJobs,
          sesTotalSize: gridStatusData.sesTotalSize,
          sesUsedSpace: gridStatusData.sesUsedSpace,
          gridTotalSize: gridStatusData.gridTotalSize,
          gridUsedSpace: gridStatusData.gridUsedSpace,
          siteIssues: gridStatusData.siteIssues,
          csIssues: gridStatusData.csIssues
        }
        setGridData(gridStatusDataObj)
        console.log(gridStatusDataObj, gridData)
        console.log(gridData.gridActiveJobs,gridData.gridMaxActiveJobs)
        console.log((gridData.gridUsedSpace,gridData.gridTotalSize))
        
        setGridRunningJobsPerc(gridStatusDataObj.gridActiveJobs/gridStatusDataObj.gridMaxActiveJobs);
        setGridStorageLeftPerc(gridStatusDataObj.gridUsedSpace/gridStatusDataObj.gridTotalSize);
        setGridAlerts(gridStatusDataObj.csIssues.length + gridStatusDataObj.siteIssues.length);
        setSiteRunningJobsPerc(gridStatusDataObj.activeJobs/gridStatusDataObj.maxActiveJobs);
        setSiteStorageLeftPerc(gridStatusDataObj.sesUsedSpace/gridStatusDataObj.sesTotalSize);
        setSiteAlerts(gridStatusDataObj.csIssues.length + gridStatusDataObj.siteIssues.length);
        setIsLoaded(true);
      })
      .catch(function (error) {
        setError(error)
        console.log(error);
      });
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

  if (props.type ==="Grid") {
    return (
      <>
          <Grid container spacing={3}>
              <Grid item xs={4} md={4} lg={4}>
                <GaugeChart id="gauge-chart2"
                  nrOfLevels={20} 
                  colors={["#FF0000", "#33FF4C"]} 
                  textColor="#464A4F"
                  percent={gridRunningJobsPerc} 
                  style={chartStyle}
                />
                <Typography align="center">Successful Jobs</Typography>
                <Typography align="center">Active Jobs :  {gridData.gridActiveJobs}</Typography>
              </Grid>
              <Grid item xs={4} md={4} lg={4}>
                <GaugeChart id="gauge-chart2" 
                  nrOfLevels={20} 
                  colors={["#33FF4C", "#FF0000"]} 
                  textColor="#464A4F"
                  percent={gridStorageLeftPerc} 
                  style={chartStyle}
                />
                <Typography align="center">Storage left</Typography>
                <Typography align="center">Storage left :  {(gridData.gridUsedSpace/10000000000000).toFixed(2)}? </Typography>
              </Grid>
              <Grid item xs={4} md={4} lg={4}>
                  <img src={alert} alt="alert" style={imageStyle} />
                  <Typography align="center">{gridAlerts} Alerts</Typography>
              </Grid>
          </Grid>
      </>
    )
  } else if(props.type === "Site") {
    return (
      <>
          <Grid container spacing={3}>
              <Grid item xs={4} md={4} lg={4}>
                <GaugeChart id="gauge-chart2"
                  nrOfLevels={20} 
                  colors={["#FF0000", "#33FF4C"]} 
                  textColor="#464A4F"
                  percent={siteRunningJobsPerc} 
                  style={chartStyle}
                />
                <Typography align="center">Successful Jobs</Typography>
                <Typography align="center">Active Jobs :  {gridData.activeJobs}</Typography>
              </Grid>
              <Grid item xs={4} md={4} lg={4}>
                <GaugeChart id="gauge-chart2" 
                  nrOfLevels={20} 
                  colors={["#33FF4C", "#FF0000"]} 
                  textColor="#464A4F"
                  percent={siteStorageLeftPerc} 
                  style={chartStyle}
                />
                <Typography align="center">Storage Used</Typography>
                <Typography align="center">Storage Used :  {(gridData.sesUsedSpace/10000000000000).toFixed(2)}? </Typography>
              </Grid>
              <Grid item xs={4} md={4} lg={4}>
                  <img src={alert} alt="alert" style={imageStyle} />
                  <Typography align="center">{gridAlerts} Alerts</Typography>
              </Grid>
          </Grid>
      </>
    )
  } else {
    return (<></>)
  }
  
};

export default Guage;