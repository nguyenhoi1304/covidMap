import React, { Component } from "react";
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    // padding: theme.spacing(2),
    display:'flex',
    justifyContent:'space-around',
    alignItems:'center'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    padding: 0
  },
}))

function DialogTitleCustom(props) {
  const classes = useStyles()
  const { children, onClose, alignCenter } = props;

  return (
    <MuiDialogTitle className={classes.root} style={{ textAlign: alignCenter ? 'center' : 'inherit' }} >
      {children}
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
}

export default DialogTitleCustom;
