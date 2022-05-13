import Guage from './Guages';
import { Grid, ThemeProvider, Paper, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function Base (props) {
    console.log('base props', props)
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

    const mainStyle = (menuOpened) => {
        if (menuOpened) {
            return ({
                opacity: 0
            })
        } else {
            return ({opacity: 100})
        }
    }
    
    const classes = useStyles();


    return (
            <div className="main" style={mainStyle(props.menuOpened)}>
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
    )
}

export default Base;