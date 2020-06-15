import React from 'react';
import { Card, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import getData from './Services/api'

const styles = theme => ({
  root: {
    backgroundColor: 'grey',
    position: 'fixed',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  mainCard: {
    backgroundColor: 'white',
    width: '300px',
    height: '300px'
  }
});


const App = (props) => {
  const { classes } = props

  getData()

  return (
    <Paper className={ classes.root } elevation={3}>
      <Card className={ classes.mainCard }>
        simple text
      </Card>
    </Paper>
  );
}

export default withStyles(styles)(App);
