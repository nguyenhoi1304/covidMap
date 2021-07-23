import { Box, Dialog, DialogContent, IconButton, Typography, useMediaQuery } from "@material-ui/core";
import React, { Component } from "react";
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import moment from "moment";

const useStyles = makeStyles({
  textDanger: {
    color: '#e3342f',
    fontWeight: 600,
  }
})

function PlaceInfo({ data }) {
  const classes = useStyles()

  return (
    <Box>
      {
        (data?.typeName || data?.type) &&
        <>
          <Typography variant='subtitle2' className={classes.textDanger}>Loại địa điểm:</Typography>
          <Typography variant='body2'>{data?.typeName || data?.type}</Typography>
        </>
      }

      {
        data?.name &&
        <>
          <Typography variant='subtitle2' className={classes.textDanger}>Tên:</Typography>
          <Typography variant='body2'>{data?.name}</Typography>
        </>
      }

      {
        data?.address &&
        <>
          <Typography variant='subtitle2' className={classes.textDanger}>Địa chỉ:</Typography>
          <Typography variant='body2'>{data?.address}</Typography>
        </>
      }

      {
        data?.description &&
        <>
          <Typography variant='subtitle2' className={classes.textDanger}>Mô tả:</Typography>
          <div dangerouslySetInnerHTML={{ __html: data?.description }} />
        </>
      }

      {
        data?.statusName &&
        <>
          <Typography variant='subtitle2' className={classes.textDanger}>Trạng thái:</Typography>
          <Typography variant='body2'>{data?.statusName}</Typography>
        </>
      }
      
      {
        data?.startDate &&
        <>
          <Typography variant='subtitle2' className={classes.textDanger}>Thời gian bắt đầu:</Typography>
          <Typography variant='body2'>{moment(data?.startDate).format("DD/M/YYYY")}</Typography>
        </>
      }
      {
        data?.endDate &&
        <>
          <Typography variant='subtitle2' className={classes.textDanger}>Thời gian kết thúc:</Typography>
          <Typography variant='body2'>{moment(data?.endDate).format("DD/M/YYYY")}</Typography>
        </>
      }
      {
        data?.codes?.length > 0 &&
        <>
          <Typography variant='subtitle2' className={classes.textDanger}>Những bệnh nhân từng đến:</Typography>
          <Typography variant='body2'>{data?.codes?.join(", ")}</Typography>
        </>
      }
      {
        (data?.measure || data?.measure == 0) &&
        <>
          <Typography variant='subtitle2' className={classes.textDanger}>Khoảng cách:</Typography>
          <Typography variant='body2'>{`${Math.round(data?.measure)} m`}</Typography>
        </>
      }
    </Box>
  )
}

export default PlaceInfo;
