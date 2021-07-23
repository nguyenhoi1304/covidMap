import { Box, makeStyles, Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { AppConfig, ColorConfig, CommonConfig, ImageConfig } from "../../config";

const useStyles = makeStyles({
  title: {
    color: '#FFFFFF',
    font: 'normal normal bold 24px/33px Open Sans',
    marginLeft:'22px',
    textTransform:'uppercase'
  },
  hotline: {
    color: '#FFFFFF',
    font: 'normal normal 600 22px/30px Open Sans',
    '& span': {
      color: '#ffdd00',
      fontSize: '22px',
    }
  }
})

function Header() {
  const classes = useStyles()
  return (
    <Box bgcolor={ColorConfig.primary} height={CommonConfig.heightHeader} width='100%'>
      <Box display='flex' alignItems='center' justifyContent='space-evenly' width='100%' height='100%'>
        <Box display='flex' alignItems='center'>
          <img src={AppConfig.logo} width={50} height={50} alt='logo' />
          <Typography variant='h6' className={classes.title}>{`TRUNG TÂM KIỂM SOÁT BỆNH TẬT ${AppConfig.provinceName}`}</Typography>
        </Box>
          <Typography variant='h6' className={classes.hotline}>Hotline: <Typography variant='h6' component='span'>{`${AppConfig.hotline}`}</Typography></Typography>
      </Box>
    </Box>
  )
}

export default Header;
