import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import GaugeChart from 'react-gauge-chart';
import axios from 'axios';
import { Button, Grid, ThemeProvider, Paper, Box } from '@material-ui/core'

function Guage()  {
  const [currentPercent, setCurrentPercent] = useState();
  const [arcs, setArcs] = useState([0.5, 0.3, 0.2]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [runningJobs, setRunningJobs] = useState(0);
  const [maxActiveJobs, setMaxActiveJobs] = useState(0);
  const [runningJobsPerc, setRunningJobsPerc] = useState(0);
  const [error, setError] = useState(null);
  const [seDetails, setSEdetails] = useState([]);

    // const prefix = "http://alimonitor.cern.ch/";
    const prefix = "";

  const updateJobDetails = () => {
    axios
    .get(prefix + "numbers.jsp?series=runningjobs")
    .then(function (response) {
      setIsLoaded(true);
      const runningJobs = response.data;
      setRunningJobs(runningJobs);
      console.log('running', response.data);
    })
    .catch(function (error) {
        console.log(error);
    });

    axios
        .get(prefix + "numbers.jsp?series=maxactive")
        .then(function (response) {
        setIsLoaded(true);
        const maxActiveJobs = response.data;
        const runningJobsPerc = runningJobs/maxActiveJobs;
        setMaxActiveJobs(maxActiveJobs);
        setRunningJobsPerc(runningJobsPerc);
        console.log('max', response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const updateSEdetails = () => {
    axios
    .get(prefix + "rest/_TOTALS_/Site_SE_Status/*CERN*/used_gb%7cavail_gb?Accept=application/json")
    .then(function (response) {
      setIsLoaded(true);
      const seDetails = response.data.results;
      setSEdetails(seDetails);
      console.log('seDetals', seDetails);

      // const grouped = _.groupBy(seDetails, se => se.Node);
      const groupedSEs = groupBy(seDetails, "Node");
      console.log('resit',groupedSEs)
    })
    .catch(function (error) {
        console.log(error);
    });
}

  // Accepts the array and key
  const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };

useEffect(() => {

    updateJobDetails();
    updateSEdetails();
  }, []);

const chartStyle = {
    height: 250,
}

  return (
    <>
        <Grid container spacing={3}>
            {/* <Grid item xs={12}>
              <Paper className={"a"}>xs=12</Paper>
            </Grid> */}
            <Grid item xs={6}>
              <GaugeChart id="gauge-chart2"
                nrOfLevels={20} 
                colors={["#33FF4C", "#FF0000"]} 
                percent={runningJobsPerc} 
                style={chartStyle}
              />
            </Grid>
            <Grid item xs={6}>
              <GaugeChart id="gauge-chart2" 
                nrOfLevels={20} 
                colors={["#FF0000", "#33FF4C"]} 
                percent={runningJobsPerc} 
                style={chartStyle}
              />
            </Grid>
        </Grid>
    </>
  )
};

export default Guage;