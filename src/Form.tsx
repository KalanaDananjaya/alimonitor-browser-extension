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

  const [formInput, setFormInput] = useState({
      sites : ""
  }) 


  const handleSubmit = evt => {
    evt.preventDefault()

    let data = { formInput }
    console.log('submitted', data)
    localStorage.setItem(Config.siteList, formInput.sites)
    console.log('getting from lcal' , localStorage.getItem(Config.siteList))
    props.setTabIndex(1)
    props.forceUpdate(n => !n)
  };

  const handleInput = (event) => {
    const newValue = event.target.value;
    setFormInput({ sites: newValue });
  };

  const clear = () => {
      localStorage.removeItem(Config.siteList);
      setFormInput({ sites: "" });
      props.setTabIndex(0)
    }

  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          {props.formName}
        </Typography>
        <Typography component="p">{props.formDescription}</Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Site List"
            id="margin-normal"
            name="sites"
            defaultValue=""
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