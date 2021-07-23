import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, createMuiTheme, Drawer, makeStyles, ThemeProvider } from '@material-ui/core';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import clsx from "clsx";
import { CommonConfig } from '../../config/commonConfig';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff",
    }

  }
})
const useStyles = makeStyles((theme) => ({
  toggleBtn: {
    position: "absolute",
    right: "100%",
    top: '10px',
    height: '48px',
    width: "20px",
    padding: 0,
    minWidth: 0,
    marginRight: `${CommonConfig.padding}px`,
    boxShadow: theme.shadows[1]
  },
  paperAnchorRight: {

    overflow: 'unset'
  },
  root: {
    width: "100%",
    maxWidth: `${CommonConfig.widthInfoBoard}px`,
    border: "none",
    overflowY: "unset",
    visibility: "unset !important",
    height: "100%",
    backgroundColor: "transparent",
    display: 'flex',
    overflow: 'unset',
    position: "relative",
    transform: 'translateX(0) !important',
    transition: "none !important"
  },
  drawer: {
    height: '100%',
    backgroundColor: "transparent",
    position: "absolute",
    width: "0",
    minWidth: "0px",
    right: "0",
    top: '0',
    transform: "translateX(100%)",
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawShift: {
    width: "25%",
    minWidth: "250px",
    width: `25%`,
    transform: "translateX(0)",
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerCtn: {
    position: "relative",
    width: "0px",
    // minWidth: "0px",
    width: "0px",
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    opacity: "0"
  },
  drawShiftCtn: {
    width: "25%",
    // minWidth: "250px",
    width: `25%`,
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

function SideBar(props) {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(true)

  const handleClickToggle = (e) => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <Box
        className={clsx(classes.drawerCtn, { [classes.drawShiftCtn]: isOpen })}
      >
      </Box>
      <Box
        className={clsx(classes.drawer, { [classes.drawShift]: isOpen })}
      >
        <Box width='100%' height='100%' overflow='auto' bgcolor='#0095e5'>
          {props.children}
        </Box>


        <ThemeProvider theme={theme}>
          <Box
            boxShadow={1}
            clone
          >
            <Button color="primary" variant="contained" onClick={handleClickToggle} className={classes.toggleBtn}>
              {
                isOpen ?
                  <ArrowRight />
                  :
                  <ArrowLeft />
              }
            </Button>
          </Box>
        </ThemeProvider>
      </Box>
    </>
  )
}

SideBar.propTypes = {
  children: PropTypes.any
};

export default SideBar;
