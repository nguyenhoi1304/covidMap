import { Box, Button, createMuiTheme } from "@material-ui/core";
import React, { Component } from "react";
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { CommonConfig } from './../../config/commonConfig';
import { useIsMobileScreen } from './../../useHooks/useIsMobileScreen';
import { RiskEnum } from "../../enum";

const useStyles = makeStyles({
  buttonMedium: {
    textTransform: 'inherit',
    color: '#000000',
    fontWeight: '600',
    fontSize: '16px',
    whiteSpace: 'nowrap',
    '&:hover': {
      cursor: 'default'
    }
  },
  buttonSmall: {
    textTransform: 'inherit',
    color: '#000000',
    fontWeight: '600',
    // fontSize: '14px',
    whiteSpace: 'nowrap',
    padding: '4px 6px',
    '&:hover': {
      cursor: 'default'
    }
  },
  marginMobile: {
    marginTop: '6px',
    marginRight: '4px'
  },
  marginDesktop: {
    marginTop: '0px',
    marginRight: '6px'
  }
})
const labelRisk = {
  [RiskEnum.hightest]: 'Nguy cơ rất cao',
  [RiskEnum.hight]: 'Nguy cơ cao',
  [RiskEnum.medium]: 'Nguy cơ',
  [RiskEnum.normal]: 'Bình thường mới',
}
function DensityNote() {
  const classes = useStyles()
  const isMobile = useIsMobileScreen()

  return (
    <Box display='flex'>
      {
        CommonConfig.density.map((item, index) => {
          let text = labelRisk[item?.risk]
          return (
            <Box key={index} className={isMobile ? classes.marginMobile : classes.marginDesktop}>
              <Button
                size={isMobile ? 'small' : 'medium'}
                style={{
                  background: item?.polygonColor,
                  color: index == 0 ? '#FFFFFF' : '#000000'
                }}
                variant="contained" color="primary"
                className={isMobile ? classes.buttonSmall : classes.buttonMedium}
              >
                {text}
              </Button>
            </Box>
          )
        })
      }
    </Box >
  )

}

export default DensityNote;
