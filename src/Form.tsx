import React, { useReducer, useState } from "react";
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { makeStyles } from "@material-ui/core/styles";
import Config from "./Config";

function Form(props) {
  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1)
    },
    leftIcon: {
      marginRight: theme.spacing(1)
    },
    rightIcon: {
      marginLeft: theme.spacing(1)
    },
    iconSmall: {
      fontSize: 20
    },
    root: {
      padding: theme.spacing(3, 2)
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 400
    }
  }));

  let siteList = ""
  let savedSites = localStorage.getItem(Config.siteList);
    if(savedSites != null){
      siteList = savedSites
  }

  const [formInput, setFormInput] = useState({
      sites : siteList
  }) 


  const handleSubmit = evt => {
    evt.preventDefault()
    localStorage.setItem(Config.siteList, formInput.sites)
    localStorage.setItem(Config.tabIndex, "1")
    // props.setTabIndex(1)
    props.forceUpdate(n => !n)
  };

  const handleInput = (event) => {
    const newValue = event.target.value;
    setFormInput({ sites: newValue });
    localStorage.setItem(Config.siteList, newValue)
  };

  const clear = () => {
      localStorage.removeItem(Config.siteList);
      localStorage.removeItem(Config.tabIndex);
      setFormInput({ sites: "" });
      props.setTabIndex(0)
    }

  const classes = useStyles();

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

  return (
    <div className="form" style={mainStyle(props.menuOpened)}>
      <Paper className={classes.root}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Site List"
            id="margin-normal"
            name="sites"
            value={formInput.sites}
            className={classes.textField}
            helperText="Enter site list"
            onChange={handleInput}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Save <SaveIcon></SaveIcon>
          </Button>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={clear}
          >
            Clear <ClearIcon></ClearIcon>
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default Form;