import { Grid, ThemeProvider, Paper, Box, Typography } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useMemo, useState, useEffect } from 'react';
import RecursiveTreeView from './RecursiveTreeView';
import Guage from './Guages';
import { makeStyles } from '@material-ui/core/styles';

function App() {

  
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');



  const theme = useMemo(
    () =>
    createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
        typography: {
          h1: {
            fontSize: 16,
            fontWeight: 400,
          },
          body1: {
            fontFamily: 'monospace',
            fontSize: 18,
          },
        },
      }),
    [prefersDarkMode]
  );

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  const classes = useStyles();

    return (
      <ThemeProvider theme={theme}>
        <RecursiveTreeView></RecursiveTreeView>
  
        <div className={classes.root}>
          <Grid container spacing={3}>
           <Grid item xs={12}>
              <Typography align="center" variant="h1">AliMonitor Plugin</Typography> 
            </Grid>
            <Grid item xs={12}>
              <Guage></Guage>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
          </Grid>
    </div>

      </ThemeProvider>
    );

  
}

export default App;
