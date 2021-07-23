import { Box, makeStyles, Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { AppConfig, ColorConfig, CommonConfig, ImageConfig } from "../../config";
import "./mobileHeader.css"

const useStyles = makeStyles({
  title: {
    color: '#FFFFFF',
    font: 'normal normal bold 16px/33px Open Sans',
    textTransform: 'uppercase'
  },
  hotline: {
    color: '#FFFFFF',
    font: 'normal normal 600 16px/30px Open Sans',
    '& span': {
      color: '#ffdd00',
      fontSize: '16px',
    }
  }
})

function MobileHeader() {
  const classes = useStyles()

  return (
    <Box bgcolor={ColorConfig.primary} height={CommonConfig.heightHeader} width='100%'>
      <Box display='flex' alignItems='center' width='100%' height='100%' p={2} justifyContent='center'>
        <img src={AppConfig.logo} width={50} height={50} alt='logo' />
        <Box ml={2} className='textHeader'>
          <Typography component='span' className={classes.title}>{`TRUNG TÂM KIỂM SOÁT BỆNH TẬT ${AppConfig.provinceName}`}</Typography>
          <Typography className={classes.hotline}>Hotline: <Typography component='span'>{`${AppConfig.hotline}`}</Typography></Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default MobileHeader;
