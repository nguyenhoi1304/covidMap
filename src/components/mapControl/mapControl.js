import { Box, Button, ButtonGroup, createMuiTheme, makeStyles, ThemeProvider, Tooltip } from "@material-ui/core";
import React, { Component } from "react";
import { AppData } from './../../data/appData';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff"
    }
  }
})

const useStyles = makeStyles({
  root: {
    padding: "4px",
    height: "2.625rem",
    minWidth: "2.625rem",
    width:'2.625rem',
    // background:'#FFFFFF'
  },
})

function MapControl() {
  const classes = useStyles()

  const handleZoomOut = (e) => {
    let camera = AppData.map.getCamera();
    camera.setZoom(camera.getZoom() - 1);
    AppData.map.moveCamera(camera)
  }

  const handleZoomIn = (e) => {
    let camera = AppData.map.getCamera();
    camera.setZoom(camera.getZoom() + 1);
    AppData.map.moveCamera(camera)
  }


  return (
    <Box >
      {/* <ThemeProvider theme={theme}> */}
        <ButtonGroup
          orientation="vertical"
        >
          <Tooltip title='Phóng to' placement='left' arrow>
            <Button className={classes.root} variant="contained" onClick={handleZoomIn}>
              <AddIcon />
            </Button>
          </Tooltip>

          <Tooltip title='Thu nhỏ' placement='left' arrow>
            <Button className={classes.root} variant="contained" onClick={handleZoomOut}>
              <RemoveIcon />
            </Button>
          </Tooltip>

        </ButtonGroup>
      {/* </ThemeProvider> */}
    </Box>
  )
}

export default MapControl;
