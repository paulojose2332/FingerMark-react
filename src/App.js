import React, { useState, useEffect} from 'react';
import {
  Grid,
  Card,
  Paper,
  Typography,
  CircularProgress,
  TextField,
  Button
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';
import { DataTable } from './Components/DataTable'
import getData from './Services/api'


//I used the css style of Material ui because i like to be able to have it in the same file, and it makes changes easy
const styles = theme => ({
  root: {
    backgroundColor: 'white',
    position: 'fixed',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0px'
  },

  loadingCard: {
    backgroundColor: 'white',
    minWidth: '300px',
    minHeight: '380px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  dataCard: {
    backgroundColor: 'white',
    minWidth: '450px',
    minHeight: '380px',
    maxWidth: '600px',
    maxHeight: '440px',
    boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)'
  },

  tableGrid:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)'

  },

  mainGrid:{
    display: 'flex',
    alignContent: 'center'
  },

  searchField: {
    height: '50px',
    width: '500px'
  },

  searchFieldGrid: {
    margin: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  cardGrid: {
    alignSelf: 'center'
  },

  locationLabel: {
    padding: '16px'
  },

  alert: {
    width: '450px'
  }
});


function App(props) {

  const { classes } = props

  //All state is controled using useState
  //v.2 would be implementing redux to better control and organization
  //Setting basic data so that something is shown on the start of the page.
  const [text, setText] = useState('')
  const [city, setCity] = useState('Itajai')
  const [country, setCountry] = useState('')
  const [currentTemp, setCurrentTemp] = useState(20)
  const [maxTemp, setMaxTemp] = useState(23)
  const [minTemp, setMinTemp] = useState(19)
  const [clouds, setClouds] = useState('Broken clouds')
  const [wind, setWind] = useState(2.1)
  const [humidity, setHumidity] = useState(72)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  //Funcion that calls the funcion that communicates with the api
  const searchData = () => {
    setLoading(true)
    try {
      //since i'm not using redux, i had two options
      //send all state functions to the api function or manage the response inside the page
      //chose the first one
      getData(text, country, setCity, setCountry, setCurrentTemp, setMaxTemp, setMinTemp, setClouds, setWind, setHumidity, setLoading, setError)
    } catch (error) {
      setLoading(false)
      setError(true)      
    }
  }

  useEffect(() => {
    //simple check to show error
    if(error){
      setTimeout(() => {
        setError(false)
      }, 10000);
    }
  });

  //I made the layout using basically material ui alone https://material-ui.com/
  return (
    <Paper className={ classes.root } elevation={3}>
      <Grid
        className={ classes.mainGrid }
        direction="column"
        spacing={10}
        justify="center"
        container
      >
        <Grid
          className={ classes.searchFieldGrid }
          justify="center"
          spacing={2}
          direction="column"
          container
          item
        >
          <Grid item>
            <TextField
                className={ classes.searchField }
                id="outlined-basic"
                label="Searching weather of"
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value) }
              />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => searchData()}>
              Search
            </Button>
          </Grid>
        </Grid>

        <Grid className={ classes.cardGrid } item>
          <Card className={ !loading? classes.dataCard : classes.loadingCard }>
            {loading
              ? (
                  <Grid className={ classes.tableGrid } direction="column" container>
                  <Grid item>
                    <CircularProgress />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">
                      Loading
                    </Typography>
                  </Grid>
                </Grid>
              )
              : (
                <Grid direction="column" container item>
                  <Grid className={ classes.locationLabel } justify="center" item>
                    <Typography variant="h5">
                      {country ? `${city}, ${country}` : `${city}`}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <DataTable currentTemp={currentTemp} maxTemp={maxTemp} minTemp={minTemp} clouds={clouds} wind={wind} humidity={humidity} />
                  </Grid>
                </Grid>
              )
            }
          </Card>
        </Grid>
      </Grid>
      {/* If erro stat is true, a snackbar with minimum info will apear just to explain the user */}
      {error &&
        <Alert className={ classes.alert } variant="outlined" severity="warning">
          City not found, please try again or change city
        </Alert>
      }
    </Paper>
  );
}

export default withStyles(styles)(App);
