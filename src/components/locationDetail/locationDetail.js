import { Box, Card, CardContent, CardHeader, Divider, IconButton, ListItem, ListItemText, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { AppConfig, UrlConfig } from "../../config";
import { CodeEnum } from "../../enum";
import { ApiTool } from "../../tool";
import PatientInfo from "../patientInfo/patientInfo";
import PlaceInfo from "../placeInfo/placeInfo";
import { RouterConfig } from './../../config/routerConfig';
import { AppData } from './../../data/appData';

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
  textDanger: {
    color: '#e3342f',
    fontWeight: 600,
    fontSize: "16px"
  },
  boxInfo: {
    marginLeft: '16px'
  }
});

const typeNestCovidEnum = {
  place: 'place',
  patient: 'patient'
}
function LocationDetail() {

  const classes = useStyles()

  const { id } = useParams()
  const history = useHistory()

  const [show, setShow] = useState(false)
  const [place, setPlace] = useState(null)
  const [nestCovidInfo, setNestCovidInfo] = useState(null)
  const sourceCovidInfoRef = useRef()

  useEffect(() => {
    const source = ApiTool.get(UrlConfig.place.detail.replace("{id}", id) + `?key=${AppConfig.mapKey}`, (res) => {
      if (res?.code == CodeEnum.ok) {
        if (res?.result.location) {
          findNestCovid(res?.result.location)
          let camera = AppData.map.getCamera()
          camera.setTarget(res?.result.location)
          AppData.map.moveCamera(camera, { animate: true })
        }
        setPlace(res?.result)
        setShow(true)
      }
    })
    return () => {
      source?.cancel()
    }
  }, [id])

  useEffect(() => {
    return () => {
      sourceCovidInfoRef.current?.cancel()
    };
  }, [])

  const getMeasure = (loc1, loc2) => {
    let measure = new map4d.Measure([
      loc1,
      loc2
    ])
    return measure.length
  }

  const getIndexOfNest = (loc, list) => {
    if (!list || list?.length <= 0) {
      return {
        indexOfMin: -1,
        measure: 0
      }
    }
    let min = 0
    let measure = getMeasure(loc, list[0].location)
    list.forEach((item, index) => {
      let checkMeasure = getMeasure(loc, item.location)
      if (checkMeasure < measure) {
        min = index
        measure = checkMeasure
      }
    })
    return {
      indexOfMin: min,
      measure: measure
    }
  }

  const findNestCovid = (location) => {
    let bounds = AppData.map.getBounds()
    let northeast = bounds?.getNortheast()
    let southwest = bounds?.getSouthwest()
    let viewbox = `${southwest.lat},${southwest.lng},${northeast.lat},${northeast.lng}`
    let query = {
      viewbox: viewbox
    }

    sourceCovidInfoRef.current = ApiTool.queryGetFromJson(UrlConfig.viewBox.getAllPlaceAndBN, query, (res) => {
      if (res?.code == CodeEnum.ok) {
        let result = res?.result
        let min1 = getIndexOfNest(location, res?.result?.patients)
        let min2 = getIndexOfNest(location, res?.result?.placeViews)
        let info = null
        setNestCovidInfo(null)
        if (min1.indexOfMin > -1 && min2.indexOfMin > -1) {
          info = {
            ...result?.patients[min1.indexOfMin],
            typeInfo: "patient",
            measure: min1.measure
          }
          if (min2.measure < min1.measure) {
            info = {
              ...result?.placeViews[min2.indexOfMin],
              typeInfo: "place",
              measure: min2.measure
            }
          }
        }
        if (min1.indexOfMin == -1 && min2.indexOfMin > -1) {
          info = {
            ...result?.placeViews[min2.indexOfMin],
            typeInfo: typeNestCovidEnum.place,
            measure: min2.measure
          }
        }
        if (min1.indexOfMin > -1 && min2.indexOfMin == -1) {
          info = {
            ...result?.patients[min1.indexOfMin],
            typeInfo: typeNestCovidEnum.patient,
            measure: min1.measure
          }
        }
        setNestCovidInfo(info)
      }
    })
  }


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
        maxWidth="calc(100% - 20px)"
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
            title="Thông tin chi tiết địa điểm"
          />
          <CardContent
            className={classes.content}
          >
            <Typography variant='subtitle2' className={classes.textDanger}>Tên:</Typography>
            <Typography>{place?.name}</Typography>
            <Typography variant='subtitle2' className={classes.textDanger}>Địa chỉ:</Typography>
            <Typography>{place?.address}</Typography>
            {
              nestCovidInfo &&
              (
                <Box pt={1}>
                  <Typography variant='subtitle2' className={classes.textDanger}>Thông tin địa điểm COVID gần nhất:</Typography>
                  {
                    nestCovidInfo?.typeInfo == typeNestCovidEnum.place ?
                      <Box className={classes.boxInfo}>
                        <PlaceInfo data={nestCovidInfo} />
                      </Box>
                      :
                      <Box className={classes.boxInfo}>
                        <PatientInfo data={nestCovidInfo} />
                      </Box>
                  }
                </Box>
              )
            }
          </CardContent>
        </Card>
      </Box>
      :
      null
  )
}

LocationDetail.propTypes = {
  //
};

export default LocationDetail;
