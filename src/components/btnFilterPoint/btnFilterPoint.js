import React, { Component, useState } from "react";
import { Box, Button, createMuiTheme, ThemeProvider } from '@material-ui/core';
import DnsIcon from '@material-ui/icons/Dns';
import PlaceTypeControl from './../placeTypeControl/placeTypeControl';
import { AppData } from "../../data";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
  },
});

function BtnFilterPoint() {

  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(!show)
  }

  const handlePlaceTypeRef = (r)=>{
    AppData.placeType = r
}

  return (
    <>
      <Box
        bgcolor='background.paper'
        borderRadius='4px'
      >
        <Button variant='outlined' color='primary'
          startIcon={
            <DnsIcon color='primary' />
          }
          onClick={handleShow}
          style={{ whiteSpace: 'nowrap' }}
        >
          Lọc điểm
        </Button>
      </Box>

      <Box
        display={show ? 'block' : 'none'}
        bgcolor='background.paper'
        p="12px"
        borderRadius="6px"
        flexGrow={1}
        overflow="auto"
      >
        <PlaceTypeControl ref={handlePlaceTypeRef}/>
      </Box>


    </>
  )
}

export default BtnFilterPoint;
