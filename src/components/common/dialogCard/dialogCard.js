import React, { Component } from "react";
import { Box, Card, CardHeader, IconButton, makeStyles, CardContent, ClickAwayListener } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  content: {
    position: 'relative',
    cursor: 'pointer',
    overflow: "auto",
    flexGrow: 1
  },
  textHeader: {
    '& .MuiCardHeader-content span': {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      color: 'rgb(17 97 182)'
    },
    textAlign: 'center',
    padding: '10px',
    borderBottom: '1px solid #e2dada',
  },
});

function DialogCard(props) {
  const { title, onClose, children } = props
  const classes = useStyles()

  return (
      <Box
        width="19.6875rem"
        maxWidth="calc(100% - 20px)"
        style={{
          transform: "translate(-50%,-50%)"
        }}
        position="absolute"
        left="50%"
        top="50%"
        maxHeight="calc(100% - 120px)"
        overflow="auto"
        display="flex"
        flexDirection="column"
        zIndex={10}
      >
        <Card
          className={classes.root}
        >
          <CardHeader
            className={classes.textHeader}
            action={
              <IconButton style={{ padding: '6px' }} onClick={onClose}>
                <Close />
              </IconButton>
            }
            title={title}
          />
          <CardContent
            className={classes.content}
          >
            {children}
          </CardContent>
        </Card>
      </Box>
  )
}

export default DialogCard;
