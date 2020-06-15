import React from 'react'
import {
    List,
    ListItem,
    ListItemText,
    Divider
  } from '@material-ui/core'

//shows the data on a list format
export const DataTable = ({currentTemp, maxTemp, minTemp, clouds, wind, humidity}) => {
   return ( 
        <>
            <List>
            <ListItem>
                <ListItemText primary="Current temperature" secondary={`${currentTemp}cº`} />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText primary="Max/Min temperature" secondary={`${maxTemp}cº / ${minTemp}cº`} />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText primary="Clouds" secondary={clouds} />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText primary="Wind" secondary={`${wind} m/s`} />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText primary="Humidity" secondary={`${humidity}%`} />
            </ListItem>
            </List>
        </>
    )
}