
import GaugeChart from 'react-gauge-chart';
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import Config from './Config'
import AlertGreen from './images/alert-green.png'
import AlertRed from './images/alert-red.png'
// import { changeIcon }  from './Util';
import LinearGaugeComponent from './LinearGauge';
import Alert from '@mui/material/Alert';
import { padding } from '@mui/system';

function Guage(props) {

  const useStyles = makeStyles(() => ({
    item:{
      cursor: "pointer",
      maxHeight: "200px"
    },
    chartStyle : {
      width: '80%'
    },
    imageStyle : {
      display: 'block',
      margin: 'auto',
      width: '60%',
      marginTop: "20px",
      resizeMode: 'contain'
    },
  }));

  const classes = useStyles();

  const handleClick = (tab, column, url) => {
    props.createTab(url)
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

  const changeIcon = (color) => {
    browser.browserAction.setIcon({
       path: "./images/alert-" + color + ".png"
    })
  }

  var siteAlertImage;
  var gridAlertImage;
  if (props.siteAlertsCount > 0) {
    siteAlertImage = AlertRed;
    changeIcon("red");
  } else {
    siteAlertImage = AlertGreen;
    changeIcon("green");
  }
  if (props.gridAlertsCount > 0) {
    gridAlertImage = AlertRed;
  } else {
    gridAlertImage = AlertGreen;
  }

  if (props.type === "Grid") {
    return (
      <div className="guages" style={mainStyle(props.menuOpened)}>
      { props.gridAlertsCount > 0? <Alert severity="error" style={{marginLeft: "390px", marginBottom: "5px"}} onClick={() => handleClick(props.type, "alerts", "http://alimonitor.cern.ch/siteinfo/issues.jsp?name=")}>There are {props.gridAlertsCount} alerts — check them out!</Alert>: false}
        <Grid container spacing={3}>
          <Grid item xs={4} md={4} lg={4} classes={{root: classes.item}} onClick={() => handleClick(props.type, "jobs", "http://alimonitor.cern.ch/display?page=jobStatusSites_RUNNING")}>
            <GaugeChart id="gauge-chart2"
              nrOfLevels={20}
              colors={["#FF0000", "#33FF4C"]}
              textColor="#464A4F"
              percent={ props.gridRunningJobsPerc}
              className={classes.chartStyle}
              animate={false}
            />
            <Typography align="center">Active Jobs : {props.gridActiveJobs}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={4} classes={{root: classes.item}} onClick={() => handleClick(props.type, "se", "http://alimonitor.cern.ch/stats?page=SE/table")}>
            <GaugeChart id="gauge-chart2"
              nrOfLevels={20}
              colors={["#33FF4C", "#FF0000"]}
              textColor="#464A4F"
              percent={props.gridStorageUsedPerc}
              className={classes.chartStyle}
              animate={false}
            />
            <Typography align="center">Disk Storage </Typography>
            <Typography align="center">{(props.gridUsedSpace).toFixed(2)} PB Used</Typography>
            <Typography align="center">{(props.gridTotalSize).toFixed(2)} PB Total  </Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={4} classes={{root: classes.item}} onClick={() => handleClick(props.type, "efficiency", "http://alimonitor.cern.ch/display?page=jobResUsageSum_time_cpu")}>
            <GaugeChart id="gauge-chart2"
              nrOfLevels={20}
              colors={["#FF0000", "#33FF4C"]}
              textColor="#464A4F"
              percent={props.gridCpuEfficiency}
              className={classes.chartStyle}
              animate={false}
            />
            <Typography align="center">Job Efficiency</Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <LinearGaugeComponent value={props.gridLanIn} maxValue={100} />
            <Typography align="center">LAN IN</Typography>
            <Typography align="center">{(props.gridLanIn).toFixed(2)} Gbps</Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <LinearGaugeComponent value={props.gridLanOut} maxValue={100} />
            <Typography align="center">LAN OUT</Typography>
            <Typography align="center">{(props.gridLanOut).toFixed(2)} Gbps</Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <LinearGaugeComponent value={props.gridWanIn} maxValue={100} />
            <Typography align="center">WAN IN</Typography>
            <Typography align="center">{(props.gridWanIn).toFixed(2)} Gbps</Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <LinearGaugeComponent value={props.gridWanOut} maxValue={100} />
            <Typography align="center">WAN OUT</Typography>
            <Typography align="center">{(props.gridWanOut).toFixed(2)} Gbps</Typography>
          </Grid>
        </Grid>
      </div>
    )
  }
   else if (props.type === "Site") {
    return (
      <div className="guages" style={mainStyle(props.menuOpened)}>
      { props.siteAlertsCount > 0? <Alert severity="error" style={{marginLeft: "390px", marginBottom: "5px"}} onClick={() => handleClick(props.type, "alerts", "http://alimonitor.cern.ch/siteinfo/issues.jsp?name=" + localStorage.getItem(Config.siteList))}>There are {props.siteAlertsCount} alerts — check them out!</Alert>: false}
        <Grid container spacing={3}>
          <Grid item xs={4} md={4} lg={4} classes={{root: classes.item}} onClick={() => handleClick(props.type, "jobs", "http://alimonitor.cern.ch/display?page=jobStatusSites_RUNNING")}>
            <GaugeChart id="gauge-chart2"
              nrOfLevels={20}
              colors={["#FF0000", "#33FF4C"]}
              textColor="#464A4F"
              percent={props.siteRunningJobsPerc}
              className={classes.chartStyle}
              animate={false}
            />
            <Typography align="center">Active Jobs :  {props.siteActiveJobs}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={4} classes={{root: classes.item}} onClick={() => handleClick(props.type, "se", props.siteSeUrl)}>
            <GaugeChart id="gauge-chart2"
              nrOfLevels={20}
              colors={["#33FF4C", "#FF0000"]}
              textColor="#464A4F"
              percent={props.siteStorageUsedPerc}
              className={classes.chartStyle}
              animate={false}
            />
            <Typography align="center">Disk Storage </Typography>
            <Typography align="center">{(props.siteSesUsedSpace).toFixed(2)} PB Used</Typography>
            <Typography align="center">{(props.siteSesTotalSize ).toFixed(2)} PB Total</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={4} classes={{root: classes.item}} onClick={() => handleClick(props.type, "efficiency", "http://alimonitor.cern.ch/display?page=jobResUsageSum_time_cpu")}>
            <GaugeChart id="gauge-chart2"
              nrOfLevels={20}
              colors={["#FF0000", "#33FF4C"]}
              textColor="#464A4F"
              percent={props.siteCpuEfficiency}
              className={classes.chartStyle}
              animate={false}
            />
            <Typography align="center">Job Efficiency</Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <LinearGaugeComponent value={props.siteLanIn} maxValue={100} />
            <Typography align="center">LAN IN</Typography>
            <Typography align="center">{(props.siteLanIn).toFixed(2)} Gbps</Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <LinearGaugeComponent value={props.siteLanOut} maxValue={100} />
            <Typography align="center">LAN OUT</Typography>
            <Typography align="center">{(props.siteLanOut).toFixed(2)} Gbps</Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <LinearGaugeComponent value={props.siteWanIn} maxValue={100} />
            <Typography align="center">WAN IN</Typography>
            <Typography align="center">{(props.siteWanIn).toFixed(2)} Gbps</Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <LinearGaugeComponent value={props.siteWanOut} maxValue={100} />
            <Typography align="center">WAN OUT</Typography>
            <Typography align="center">{(props.siteWanOut).toFixed(2)} Gbps</Typography>
          </Grid>
        </Grid>
      </div>
    )
  } else {
    return (<></>)
  }

};

export default Guage;