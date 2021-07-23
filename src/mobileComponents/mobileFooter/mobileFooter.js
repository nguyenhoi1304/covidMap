import { Box, makeStyles, Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { AppConfig, ColorConfig, CommonConfig } from "../../config";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color:'#FFFFFF',
    font: 'normal normal normal 16px/24px Open Sans'
  },
})

function MobileFooter() {
  const classes = useStyles()
  
  return (
    <Box bgcolor={ColorConfig.primary} height={CommonConfig.heightFooter} width='100%' className={classes.root}>
      <Box textAlign='center' className={classes.text}>
        {/* <Typography variant='body2'>Dữ liệu được cung cấp bởi CDC Thái Bình</Typography>
        <Typography variant='body2'>Phát triển bởi Công ty TNHH IOTLink</Typography> */}
        <Typography variant='body2'>Dữ liệu mô phỏng để tham khảo</Typography>
        <Typography variant='body2'>{`Phát triển bởi Công ty TNHH IOTLink và CDC ${AppConfig.provinceName}`}</Typography>
      </Box>
    </Box>
  )
}

export default MobileFooter;
