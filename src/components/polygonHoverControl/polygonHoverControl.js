import { Box, Card, CardActionArea, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { AppData } from '../../data';
import { MapEventEnum } from '../../enum';
const widthCard = 270
const useStyles = makeStyles({
  root: {
    width: `${widthCard}px`,
    height: 130,
    position: "absolute",
    zIndex: 99,
  },
  content: {
    position: 'relative',
    cursor: 'pointer',
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
    textTransform: "uppercase"
  },
});

function PolygonHoverControl(props) {
  const classes = useStyles()
  const location = useLocation()

  const [polygon, setPolygon] = useState(null)
  const [show, setShow] = useState(false)
  const [point, setPoint] = useState({
    left: -1,
    top: -1
  })

  const cardRef = useRef()
  const polygonRef = useRef()

  useEffect(() => {
    setShow(false)
  }, [location.pathname])

  useEffect(() => {
    const eventHover = AppData.map.addListener(MapEventEnum.hover, (args) => {
      let mapView = document.getElementById("mapView")
      document.getElementsByTagName("body")[0].style.cursor = "pointer"
      let location = args?.location
      let projection = new map4d.Projection(AppData.map)
      let screenCoordinate = projection.fromLatLngToScreen(location, 0)
      let distance = 15
      let pointTemp = {
        left: screenCoordinate.x + distance,
        top: screenCoordinate.y + distance
      }
      if (pointTemp.left + widthCard + distance >= mapView?.clientWidth) {
        pointTemp.left -= (widthCard + 2 * distance)
      }
      if (pointTemp.top + 130 + distance >= mapView?.clientHeight) {
        pointTemp.top -= (130 + 2 * distance)
      }
      setPoint(pointTemp)
      setShow(true)
      setPolygon(args?.polygon?.getUserData())

      polygonRef.current?.setFillOpacity(0.8)
      polygonRef.current = args?.polygon
      polygonRef.current?.setFillOpacity(0.9)

    }, { polygon: true })

    const eventClick = AppData.map.addListener(MapEventEnum.click, (args) => {
      setShow(false)
    }, { polygon: true })

    const eventHoverMarker = AppData.map.addListener(MapEventEnum.hover, (args) => {
      setShow(false)
    }, { marker: true })

    return () => {
      eventHover?.remove()
      eventClick?.remove()
      eventHoverMarker?.remove()
    }
  }, [])

  useEffect(() => {
    const eventHoverOut = AppData.map.addListener(MapEventEnum.hover, (args) => {
      if (!args?.polygon) {
        document.getElementsByTagName("body")[0].style.cursor = null
        setShow(false)
      }
    })

    const eventDrag = AppData.map.addListener(MapEventEnum.drag, (args) => {
      setShow(false)
    })

    return () => {
      eventHoverOut?.remove()
      eventDrag?.remove()
    }
  }, [])

  useEffect(() => {
    const eventMouseOut = AppData.map.addListener(MapEventEnum.mouseOut, (args) => {
      document.getElementsByTagName("body")[0].style.cursor = null
      let elements = document.querySelectorAll(":hover")
      if (!Object.values(elements)?.includes(cardRef.current)) {
        setShow(false)
      }
    })
    return () => {
      eventMouseOut?.remove()
    }
  }, [])

  return (
    show && (
      <Card ref={cardRef} style={{ left: point.left + "px", top: point.top + "px" }} className={classes.root}>
        <CardHeader className={classes.textHeader} title={`${polygon?.country?.description + ' ' + polygon?.country?.name}`} />
        <CardContent className={classes.content}>
          <Box display='flex'>
            <Typography>Tổng số ca dương tính: </Typography>
            <Typography className={classes.subtitle} >{polygon?.tongBN}</Typography>
          </Box>
          <Box display='flex'>
            <Typography>Cập nhật đến ngày: </Typography>
            <Typography className={classes.subtitle} >{moment(polygon?.updateDate).format("DD/MM/YYYY")}</Typography>
          </Box>
        </CardContent>
      </Card>
    )
  )
}

PolygonHoverControl.propTypes = {
  //
};

export default PolygonHoverControl;
