import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AppData } from "../../data";
import { CodeEnum, MapEventEnum, MarkerTypeEnum } from "../../enum";
import { Box, Card, CardContent, CardHeader, Divider, IconButton, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import PlaceInfo from './../placeInfo/placeInfo';
import PatientInfo from "../patientInfo/patientInfo";
import { useParams, useHistory } from 'react-router-dom';
import { ApiTool } from "../../tool";
import { UrlConfig } from "../../config";
import { RouterConfig } from './../../config/routerConfig';
import { PlaceTypeIdEnum } from './../../enum/placeTypeIdEnum';
import { AppTool } from './../../tool/appTool';
import { AppConfig } from './../../config/appConfig';


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
  subtitle: {
    fontWeight: 'bold',
    marginLeft: '6px',
    color: 'red'
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

const statusEnum = {
  ok: 'ok',
  errorFormat: 'errorFormat',
  errorData: 'errorData',
  none: 'none'
}

function PatientDetail() {

  const classes = useStyles()

  const { code } = useParams()
  const history = useHistory()
  const [status, setStatus] = useState(statusEnum.none)
  const [show, setShow] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    var source
    setShow(true)
    if (code) {
      let body = {
        maBN: code
      }
      source = ApiTool.queryGetFromJson(UrlConfig.patient.detail, body, (res) => {
        if (res?.code == CodeEnum.ok) {
          setStatus(statusEnum.ok)
          let patient = res?.result

          let listBlockadeAreas = res?.result?.infoMoves?.filter((area) => {
            return area?.type == AppConfig.idKhuVucPhongToa
          })

          let listRelatedPlace = res?.result?.infoMoves?.filter((area) => {
            return area?.type != AppConfig.idKhuVucPhongToa
          })

          let newPatient = {
            ...patient,
            listBlockadeAreas: listBlockadeAreas,
            listRelatedPlace: listRelatedPlace
          }
          if (!(listBlockadeAreas?.length > 0 || listRelatedPlace?.length > 0)) {
            AppTool.resetInfoMoves()
          }
          else {
            AppTool.showPlaceRelatedPatientMarkers(listBlockadeAreas, listRelatedPlace)
          }
          setData(newPatient)
        }
        else {
          setStatus(statusEnum.errorData)
        }
      })
    }
    return () => {
      source?.cancel()
    }
  }, [code])

  const onClickClose = (e) => {
    setShow(false)
    history.push({
      pathname: RouterConfig.home
    })
  }

  return (
    show ?
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
              <IconButton style={{ padding: '6px' }} onClick={onClickClose}>
                <Close />
              </IconButton>
            }
            title="Thông tin chi tiết bệnh nhân"
          />
          <CardContent
            className={classes.content}
          >
            {
              status == statusEnum.ok &&
              <PatientInfo data={data} />
            }

            {
              status == statusEnum.errorData &&
              <Typography variant='subtitle2'>Thông tin bệnh nhân chưa cập nhật !</Typography>
            }
          </CardContent>
        </Card>
      </Box>
      :
      null
  )
}

PatientDetail.propTypes = {
  //
};

export default PatientDetail;
