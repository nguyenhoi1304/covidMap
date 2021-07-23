import { Box, Dialog, DialogContent, IconButton, Typography, useMediaQuery } from "@material-ui/core";
import React, { Component } from "react";
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  textDanger: {
    color: '#e3342f',
    fontWeight: 600,
  }
})

function AreaInfo({ data }) {
  const classes = useStyles()

  return (
    <Box>
      {
        data?.country?.name &&
        <>
          <Typography variant='subtitle2' className={classes.textDanger}>Tên:</Typography>
          <Typography variant='body2'>{`${(data?.country?.description + ' ' + data?.country?.name) || ''}`}</Typography>
        </>
      }

      {
        data?.country.addressCountry &&
        <>
          <Typography variant='subtitle2' className={classes.textDanger}>Địa chỉ:</Typography>
          <Typography variant='body2'>{data?.country.addressCountry}</Typography>
        </>
      }

      {
        data?.country.phoneNumber &&
        <>
          <Typography variant='subtitle2' className={classes.textDanger}>Số điện thoại:</Typography>
          <Typography variant='body2'>{data?.country.phoneNumber}</Typography>
        </>
      }

      {
        (data?.tongBN || data?.tongBN == 0) &&
        <>
          <Typography variant='subtitle2' className={classes.textDanger}>Số bệnh nhân thuộc khu vực:</Typography>
          <Typography variant='body2'>{data?.tongBN || 0}</Typography>
        </>
      }

      {
        (data?.tongKhuVucPhongToa || data?.tongKhuVucPhongToa == 0) &&
        <>
          <Typography variant='subtitle2' className={classes.textDanger}>Số địa điểm đang phong tỏa:</Typography>
          <Typography variant='body2'>{data?.tongKhuVucPhongToa}</Typography>
        </>
      }

    </Box>
  )
}

export default AreaInfo;
