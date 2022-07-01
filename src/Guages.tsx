
import GaugeChart from 'react-gauge-chart';
import { Grid, Typography, Box } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import Config from './Config'
import AlertGreen from './images/alert-green.png'
import AlertRed from './images/alert-red.png'
import { changeIcon }  from './Util';

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
      width: '50%',
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
        <Grid container spacing={3}>
          <Grid item xs={4} md={4} lg={4} classes={{root: classes.item}} onClick={() => handleClick(props.type, "jobs", "http://alimonitor.cern.ch/display?page=jobStatusSites_RUNNING")}>
            <GaugeChart id="gauge-chart2"
              nrOfLevels={20}
              colors={["#FF0000", "#33FF4C"]}
              textColor="#464A4F"
              percent={ props.gridRunningJobsPerc}
              className={classes.chartStyle}
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
            />
            <Typography align="center">Disk Storage </Typography>
            <Typography align="center">{(props.gridUsedSpace).toFixed(2)} PB Used</Typography>
            <Typography align="center">{(props.gridTotalSize).toFixed(2)} PB Total  </Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={4} classes={{root: classes.item}} onClick={() => handleClick(props.type, "alerts", "http://alimonitor.cern.ch/siteinfo/issues.jsp?name=")}>
            <img src={gridAlertImage} alt="alert" className={classes.imageStyle} />
            <Typography align="center">{props.gridAlertsCount} Alerts</Typography>
          </Grid>
        </Grid>
      </div>
    )
  }
   else if (props.type === "Site") {
    return (
      <div className="guages" style={mainStyle(props.menuOpened)}>
        <Grid container spacing={3}>
          <Grid item xs={4} md={4} lg={4} classes={{root: classes.item}} onClick={() => handleClick(props.type, "jobs", "http://alimonitor.cern.ch/display?page=jobStatusSites_RUNNING")}>
            <GaugeChart id="gauge-chart2"
              nrOfLevels={20}
              colors={["#FF0000", "#33FF4C"]}
              textColor="#464A4F"
              percent={props.siteRunningJobsPerc}
              className={classes.chartStyle}
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
            />
            <Typography align="center">Disk Storage </Typography>
            <Typography align="center">{(props.siteSesUsedSpace).toFixed(2)} PB Used</Typography>
            <Typography align="center">{(props.siteSesTotalSize ).toFixed(2)} PB Total</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={4} classes={{root: classes.item}} onClick={() => handleClick(props.type, "alerts", "http://alimonitor.cern.ch/siteinfo/issues.jsp?name=" + localStorage.getItem(Config.siteList))}>
            <img src={siteAlertImage} alt="alert" className={classes.imageStyle} />
            <Typography align="center">{props.siteAlertsCount} Alerts</Typography>
          </Grid>
        </Grid>
      </div>
    )
  } else {
    return (<></>)
  }

};

export default Guage;