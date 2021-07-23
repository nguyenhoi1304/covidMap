import React, { Component, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, Checkbox, Typography } from "@material-ui/core";
import { PlaceTypeEnum } from './../../enum/placeTypeEnum';
import { IconConfig } from './../../config/iconConfig';
import { makeStyles } from "@material-ui/styles";
import { CommonConfig } from './../../config/commonConfig';
import { ApiTool, PolygonTool } from "../../tool";
import { AppConfig, UrlConfig } from "../../config";
import { CodeEnum, MapEventEnum, MarkerTypeEnum } from "../../enum";
import { AppData } from "../../data";
import { set } from "date-fns";
import { v4 } from "uuid";
import { useIsMobileScreen } from './../../useHooks/useIsMobileScreen';
import moment from "moment";

const useStyle = makeStyles({
  icon: {
    width: "24px",
    height: "24px",
    minWidth: "24px"
  },
  checkBox: {
    alignSelf: "flex-end",
    marginLeft: "auto"
  },
  label: {
    marginLeft: "12px",
    fontSize: '0.8125rem'
  }
})

function PlaceTypeControl(props, ref) {

  const classed = useStyle()

  const apiListActiveRef = useRef()
  const apiGetBenhNhanRef = useRef()
  const isMobile = useIsMobileScreen()
  const listMarkerRef = useRef([])
  const listRelatedPatientMarkersRef = useRef([])
  const markerClustererRef = useRef(null)
  const isBenNhanRef = useRef(false)
  const isZoomFitBoundRef = useRef(false)

  const [placeTypeDict, setPlaceTypeDict] = useState({})
  const placeTypeDictRef = useRef({})

  const getPlaceType = (callBack) => {
    apiListActiveRef.current = ApiTool.get(UrlConfig.placeType.listActive, (res) => {
      if (res?.code == CodeEnum.ok) {
        let list = res?.result || []
        let dict = {}
        list?.forEach((item) => {
          let t = {
            icon: item.icon + "?v=" + v4(),
            checked: true,
            name: item.name,
            markers: []
          }
          dict[item.id] = t
        })

        // dict[PlaceTypeEnum.khuVucNhaBenhNhan] = {
        //   icon: IconConfig.placeType.khuVucNhaBenhNhan,
        //   checked: true,
        //   name: "Khu vực nhà BN",
        //   markers: []
        // }
        callBack(dict)
      }
    })
    // callBack(defaultPlaceTypeDict)
  }

  const getAllPlaceAndBN = (placeTypeDict, callBack) => {
    let currentDateParam = moment(new Date()).format('YYYY/MM/DD HH:mm:ss')
    let query = {
      viewBox: AppConfig.viewBox,
      currentDate: currentDateParam
    }
    apiGetBenhNhanRef.current = ApiTool.queryGetFromJson(UrlConfig.viewBox.getAllPlaceAndBN, query, (res) => {
      if (res?.code == CodeEnum.ok) {
        let listPatient = res?.result?.patients || []
        let listPlaces = res?.result?.placeViews || []
        listPlaces?.forEach(place => {
          if (Object.keys(placeTypeDict)?.includes(place.type)) {
            let marker = new map4d.Marker({
              position: place?.location,
              icon: new map4d.Icon(CommonConfig.sizeMarker, CommonConfig.sizeMarker, placeTypeDict[place.type]?.icon + "?v=" + v4()),
              anchor: [0.5, 0.5],
              zIndex: 1
            })
            marker.setUserData({
              ...place,
              typeName: place?.typeName || placeTypeDict[place.type]?.name,
              markerType: MarkerTypeEnum.place
            })
            marker.setMap(AppData.map)
            placeTypeDict[place.type]?.markers?.push(marker)
          }
        });
        callBack(placeTypeDict)
      }
    })
  }

  const handleChangeCheck = (placeType) => (e) => {
    listMarkerRef.current?.forEach(m => {
      m.setZIndex(900)
    })
    let checked = e.target.checked
    setPlaceTypeDict(prev => {
      let newDict = {
        ...prev,
      }
      newDict[placeType].checked = checked
      if (checked) {
        newDict[placeType].markers?.forEach(marker => {
          marker.setZIndex(1000)
          marker.setMap(AppData.map)
        })
      }
      else {
        newDict[placeType].markers?.forEach(marker => {
          marker.setMap(null)
        })
      }
      return newDict
    })
  }

  useEffect(() => {
    placeTypeDictRef.current = placeTypeDict
    listMarkerRef.current = []
    Object.values(placeTypeDict)?.forEach(item => {
      if (item.checked) {
        listMarkerRef.current = listMarkerRef.current.concat(item?.markers || [])
      }
    })
    // Tạo đối tượng MarkerClusterer
    if (listMarkerRef.current?.length > 0) {
      markerClustererRef.current = new map4d.MarkerClusterer(listMarkerRef.current, {
        minZoom: 0,
        maxZoom: 19,
        radius: 100,
        zoomOnClick: true
      })
      markerClustererRef.current.setMap(AppData.map)
    }
    return () => {
      listRelatedPatientMarkersRef.current?.forEach((marker) => {
        marker.setMap(null)
      })
      markerClustererRef.current?.setMap(null)
    }
  }, [placeTypeDict])

  useEffect(() => {
    getPlaceType((dict) => {
      getAllPlaceAndBN(dict, (newDict) => {
        // Object.keys(newDict).forEach(key => {
        //   if (!(newDict[key]?.markers?.length > 0)) {
        //     delete newDict[key]
        //   }
        // })

        setPlaceTypeDict(newDict)
        placeTypeDictRef.current = newDict
      })

    })
    const eventBoundsChanged = AppData.map.addListener(MapEventEnum.boundsChanged, (args) => {
      if (!isZoomFitBoundRef.current) {
        if (PolygonTool.isThaiBinhWithinMap(AppData.map) && isBenNhanRef.current) {
          resetInfoMoves()
        }
      }
    })

    const eventClick = AppData.map.addListener(MapEventEnum.click, (args) => {
      if (!isZoomFitBoundRef.current && isBenNhanRef.current) {
        resetInfoMoves()
      }
    })

    const eventIdle = AppData.map.addListener(MapEventEnum.idle, (args) => {
      if (isZoomFitBoundRef.current) {
        isZoomFitBoundRef.current = false
      }
    })
    return () => {
      apiGetBenhNhanRef.current?.cancel()
      apiListActiveRef.current?.cancel()
      eventBoundsChanged?.remove()
      eventIdle?.remove()
      eventClick?.remove()
    };
  }, [])

  useImperativeHandle(ref, () => ({
    showPlaceRelatedPatientMarkers: (listBlockadeAreas, listRelatedPlace) => {
      listRelatedPatientMarkersRef.current?.forEach((marker) => {
        marker.setMap(null)
      })
      hideAllMarker()
      showPlaceRelatedPatientMarkers(listBlockadeAreas, listRelatedPlace)
    },
    resetInfoMoves: () => {
      resetInfoMoves()
    }
  }))

  const resetInfoMoves = () => {
    isBenNhanRef.current = false
    setPlaceTypeDict({
      ...placeTypeDictRef.current
    })
    // listRelatedPatientMarkersRef.current?.forEach((marker) => {
    //   marker.setMap(null)
    // })
    // Object.values(placeTypeDictRef.current)?.forEach(t => {
    //   if (t.checked) {
    //     t?.markers?.forEach(marker => {
    //       marker.setMap(AppData.map)
    //     })
    //   }
    // })
    // markerClustererRef.current.setMap(AppData.map)
  }

  const hideAllMarker = () => {
    listMarkerRef.current?.forEach((marker) => {
      marker.setMap(null)
    })
    markerClustererRef.current?.setMap(null)
  }

  const fitBound = (listMarker) => {
    isZoomFitBoundRef.current = true
    isBenNhanRef.current = true
    let bounds = new map4d.LatLngBounds()
    listMarker?.forEach((marker, index) => {
      bounds.extend([marker.location?.lng, marker.location?.lat])
    })
    let paddingOptions = {
      top: 120,
      bottom: 120,
      left: 10,
      right: 10
    }
    let camera = AppData.map.getCamera()
    if (listMarker?.length > 1) {
      camera = AppData.map.getCameraWithBounds(bounds, paddingOptions)
    }
    if (camera.getZoom() < 14) {
      camera.setZoom(11)
    }
    AppData.map.moveCamera(camera, { animation: true })
  }

  const showPlaceRelatedPatientMarkers = (listBlockadeAreas, listRelatedPlace) => {
    listRelatedPatientMarkersRef.current = []
    listBlockadeAreas?.forEach((markerBlk) => {
      let markerBlockade = new map4d.Marker({
        position: markerBlk?.location,
        icon: new map4d.Icon(CommonConfig.sizeMarker, CommonConfig.sizeMarker, markerBlk?.iconUrl + "?v=" + v4()),
        anchor: [0.5, 0.5],
        zIndex: 1000
      })
      markerBlockade.setMap(AppData.map)
      markerBlockade.setUserData({
        ...markerBlk,
        typeName: markerBlk?.typeName || placeTypeDict[markerBlk.type]?.name,
        markerType: MarkerTypeEnum.place
      })
      listRelatedPatientMarkersRef.current.push(markerBlockade)
    })

    listRelatedPlace?.forEach((markerRlt) => {
      let markerRelated = new map4d.Marker({
        position: markerRlt?.location,
        icon: new map4d.Icon(CommonConfig.sizeMarker, CommonConfig.sizeMarker, markerRlt?.iconUrl + "?v=" + v4()),
        anchor: [0.5, 0.5],
        zIndex: 1000
      })
      markerRelated.setMap(AppData.map)
      markerRelated.setUserData({
        ...markerRlt,
        typeName: markerRlt?.typeName || placeTypeDict[markerRlt.type]?.name,
        markerType: MarkerTypeEnum.place
      })
      listRelatedPatientMarkersRef.current.push(markerRelated)
    })

    let arrBoundary = listBlockadeAreas.concat(listRelatedPlace)
    fitBound(arrBoundary)
  }

  return (
    <Box
      bgcolor="background.paper"
      flexGrow={1}
      minWidth='200px'
    >
      {
        Object.keys(placeTypeDict)?.map((placeType, index) => {
          return (
            <Box
              key={placeType}
              display="flex"
              alignItems="center"
            >
              <img src={placeTypeDict[placeType].icon} className={classed.icon} crossOrigin="anonymous" />
              <Typography
                classes={{
                  root: classed.label
                }}
              >
                {placeTypeDict[placeType].name + ` (${placeTypeDict[placeType].markers.length})`}
              </Typography>
              <Checkbox
                checked={placeTypeDict[placeType].checked}
                color="primary"
                classes={{
                  root: classed.checkBox
                }}
                onChange={handleChangeCheck(placeType)}
              // inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Box>
          )
        })
      }
    </Box>
  )
}

PlaceTypeControl = forwardRef(PlaceTypeControl)
export default PlaceTypeControl;

