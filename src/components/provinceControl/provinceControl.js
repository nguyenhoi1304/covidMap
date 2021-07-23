import { Box, makeStyles, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useRef, useState } from "react";
import { IconConfig, UrlConfig } from "../../config";
import { CodeEnum, ColorDensityEnum, GeoJsonTypeEnum, MapEventEnum, PolygonTypeEnum, RiskEnum } from "../../enum";
import { ApiTool, AppTool } from "../../tool";
import { PolygonTool } from './../../tool/polygonTool';
import { AppData } from './../../data/appData';
import { StatusViewEnum } from './../../enum/statusViewEnum';
import { CommonConfig } from './../../config/commonConfig';
import moment from "moment";
import ListBlockadeAreas from "../listBlockadeAreas/listBlockadeAreas";

const useStyles = makeStyles({
  root: {
    background: '#0095E5',
    color: '#FFFFFF',
  },
  borderShadow: {
    border: '1px solid #F6F6F6',
    borderRadius: '4px',
    background: '#0F7DEB 0% 0% no-repeat padding-box',
    '& .MuiPaper-root': {
      boxShadow: 'none'
    }
  },
  table: {
    background: '#0F7DEB',
    '& .MuiTableBody-root .MuiTableRow-root': {
      borderTop: '1px solid rgb(212 209 209 / 23%)'
    },
    '& .MuiTableHead-root .MuiTableCell-root': {
      fontWeight: 600
    },
    '& .MuiTableCell-root': {
      borderLeft: '1px solid rgb(212 209 209 / 23%)',
      borderBottom: 'none',
      color: '#FFFFFF',
      padding: '6px',
      font: 'normal normal normal 0.875rem/1.1875rem Open Sans'
    },
    minHeight: "65px"
  },
  textNumber: {
    color: '#FFDD00',
    font: 'normal normal 600 0.875rem/1.1875rem Open Sans',

  },
  textNumberLarge: {
    color: '#FFDD00',
    font: 'normal normal 600 1.5rem/1.1875rem Open Sans'
  },
  textTypeAddress: {
    color: '#FFFFFF',
    font: 'normal normal 600 1.625rem/2.25rem Open Sans',
  },
  cellClick: {
    cursor: 'pointer',
    '&:hover': {
      // textDecoration: 'underline',
    }
  },
  textDensity: {
    font: 'normal normal 600 0.875rem/1.1875rem Open Sans'
  },
  imgMouse: {
    verticalAlign: 'middle'
  }
})

const colorLabelRisk = {
  [RiskEnum.hightest]: ColorDensityEnum.hightest,
  [RiskEnum.hight]: ColorDensityEnum.hight,
  [RiskEnum.medium]: ColorDensityEnum.medium,
  [RiskEnum.normal]: ColorDensityEnum.normal,
}

const labelRisk = {
  [RiskEnum.hightest]: 'Nguy cơ rất cao',
  [RiskEnum.hight]: 'Nguy cơ cao',
  [RiskEnum.medium]: 'Nguy cơ',
  [RiskEnum.normal]: 'Bình thường mới',
}

const getColor = (risk) => {
  let color = ''
  CommonConfig.density.forEach(t => {
    if (t.risk == risk) {
      color = t.color
    }
  })
  return color
}

function ProvinceControl() {
  const classes = useStyles()

  const [generalInfo, setGeneralInfo] = useState(null)
  const [districtInfo, setDistrictInfo] = useState(null)
  const [subDistrictInfo, setSubDistrictInfo] = useState(null)
  const [statusView, setStatusView] = useState(StatusViewEnum.province)

  const generalApiRef = useRef()
  const districtApiRef = useRef()
  const districtPolygonsRef = useRef()
  const subDistrictPolygonsRef = useRef()
  const statusViewRef = useRef(StatusViewEnum.province)
  const isZoomToDistrictRef = useRef(false)

  let textDateTime = new Date()

  const getGeneralInfo = () => {
    let currentDateParam = moment(new Date()).format('YYYY/MM/DD HH:mm:ss')
    let body = {
      currentDate: currentDateParam
    }
    generalApiRef.current = ApiTool.queryGetFromJson(UrlConfig.collectInfo.getGeneralInfomation, body, (res) => {
      if (res?.code == CodeEnum.ok) {
        processDistrict(res?.result?.localInfos || [])
        res?.result?.localInfos?.sort((a, b) => {
          return (b?.tongBN - a?.tongBN)
        })
        setGeneralInfo(res?.result)
      }
    })
  }

  const getDistrictInfo = (id) => {
    districtApiRef.current = ApiTool.get(UrlConfig.collectInfo.getDistrictInfomation.replace("{id}", id), (res) => {
      if (res?.code == CodeEnum.ok) {
        processSubDistrict(res?.result || [])
      }
    })
  }

  const removePolygonsfromMap = (polygons) => {
    polygons?.forEach((polygon) => {
      polygon?.setMap(null)
    })
  }

  const processDistrict = (districts) => {
    removePolygonsfromMap(districtPolygonsRef.current)
    removePolygonsfromMap(subDistrictPolygonsRef.current)
    districtPolygonsRef.current = []
    districts?.forEach((district) => {
      if (district?.country?.geometry?.type == GeoJsonTypeEnum.multiPolygon) {
        district?.country?.geometry?.coordinates?.forEach((paths, index) => {
          setTimeout(() => {
            let polygon = PolygonTool.createPolygon({
              paths: paths || [],
              fillColor: getColor(district?.country.nguyCoHienTai || 1),
              fillOpacity: 0.8,
              strokeColor: "#343a40",
              strokeWidth: 1
            })
            polygon.setUserData({
              ...district,
              type: PolygonTypeEnum.district,
            })
            polygon.setMap(AppData.map)
            districtPolygonsRef.current?.push(polygon)
          }, 5)
        })
      }
      if (district?.country?.geometry?.type == GeoJsonTypeEnum.polygon) {
        setTimeout(() => {
          let polygon = PolygonTool.createPolygon({
            paths: district?.country?.geometry?.coordinates || [],
            fillColor: getColor(district?.country.nguyCoHienTai || 1),
            fillOpacity: 0.8,
            strokeColor: "#343a40",
            strokeWidth: 1
          })
          polygon.setUserData({
            ...district,
            type: PolygonTypeEnum.district,
          })
          polygon.setMap(AppData.map)
          districtPolygonsRef.current?.push(polygon)
        }, 5)
      }
    })
  }
  const processSubDistrict = (subDistricts) => {
    removePolygonsfromMap(districtPolygonsRef.current)
    removePolygonsfromMap(subDistrictPolygonsRef.current)
    subDistrictPolygonsRef.current = []
    subDistricts?.forEach((subDistrict) => {
      if (subDistrict?.country?.geometry?.type == GeoJsonTypeEnum.multiPolygon) {
        subDistrict?.country?.geometry?.coordinates?.forEach((paths, index) => {
          setTimeout(() => {
            let polygon = PolygonTool.createPolygon({
              paths: paths || [],
              fillColor: getColor(subDistrict?.country.nguyCoHienTai || 1),
              fillOpacity: 0.8,
              strokeColor: "#343a40",
              strokeWidth: 1
            })
            polygon.setUserData({
              ...subDistrict,
              type: PolygonTypeEnum.subDistrict,
            })
            polygon.setMap(AppData.map)
            subDistrictPolygonsRef.current?.push(polygon)
          }, 5)
        })
      }
      else {
        setTimeout(() => {
          let polygon = PolygonTool.createPolygon({
            paths: subDistrict?.country?.geometry?.coordinates || [],
            fillColor: getColor(subDistrict?.country.nguyCoHienTai || 1),
            fillOpacity: 0.8,
            strokeColor: "#343a40",
            strokeWidth: 1
          })
          polygon.setUserData({
            ...subDistrict,
            type: PolygonTypeEnum.subDistrict,
          })
          polygon.setMap(AppData.map)
          subDistrictPolygonsRef.current?.push(polygon)
        }, 5)
      }
    })
  }

  const zoomToDistrict = (district) => {
    let bounds = new map4d.LatLngBounds()
    if (district?.country.geometry?.type == GeoJsonTypeEnum.multiPolygon) {
      district?.country.geometry?.coordinates?.forEach((polygonPaths) => {
        polygonPaths[0]?.forEach((position) => {
          bounds.extend(position)
        })
      })
    }
    else {
      district?.country.geometry?.coordinates[0]?.forEach((position) => {
        bounds.extend(position)
      })
    }

    let paddingOptions = {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    }
    let camera = AppData.map.getCameraWithBounds(bounds, paddingOptions)
    isZoomToDistrictRef.current = true
    AppData.map.moveCamera(camera, { animate: true })
  }

  useEffect(() => {
    getGeneralInfo()
    const eventClickPolygon = AppData.map.addListener(MapEventEnum.click, (args) => {
      let polygon = args.polygon
      let data = polygon.getUserData()
      if (data.type == PolygonTypeEnum.district) {
        zoomToDistrict(data)
        setStatusView(StatusViewEnum.district)
        setDistrictInfo(data)
        getDistrictInfo(data?.country?.id)
      }
      else if (data.type == PolygonTypeEnum.subDistrict) {
        setStatusView(StatusViewEnum.subDistrict)
        setSubDistrictInfo(data)
      }
    }, { polygon: true })
    const eventBoundsChanged = AppData.map.addListener(MapEventEnum.boundsChanged, (args) => {
      if (!isZoomToDistrictRef.current) {
        if (PolygonTool.isThaiBinhWithinMap(AppData.map) && statusViewRef.current != StatusViewEnum.province) {
          removePolygonsfromMap(subDistrictPolygonsRef.current)
          districtPolygonsRef.current?.forEach((polygon) => {
            polygon.setMap(AppData.map)
          })
          setStatusView(StatusViewEnum.province)
        }
      }
    })
    const eventIdle = AppData.map.addListener(MapEventEnum.idle, (args) => {
      if (isZoomToDistrictRef.current) {
        isZoomToDistrictRef.current = false
      }
    })
    return () => {
      generalApiRef.current?.cancel()
      eventClickPolygon?.remove()
      eventBoundsChanged?.remove()
      eventIdle?.remove()
    }
  }, [])

  useEffect(() => {
    statusViewRef.current = statusView
  }, [statusView])

  const handleShowListPatient = (value) => (e) => {
    if (value > 0) {
      AppTool.showListPatient()
    }
  }

  const handleShowBlockadeAreas = (value) => (e) => {
    if (value > 0) {
      AppTool.showListBlockadeAreas()
    }
  }

  return (
    <Box width="100%" className={classes.root} overflow="auto">
      <Box style={{ padding: '0.75rem' }} textAlign='center'>
        <Typography className={classes.textTypeAddress}>{generalInfo?.tenTinh}</Typography>
        <Typography variant='body2' component='p'>{`(Đến ${moment(textDateTime).format('HH:mm')}, ngày ${moment(textDateTime).format('DD/MM/yyyy')})`}</Typography>
      </Box>

      <Box className={classes.borderShadow} m={2}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  Trạng thái:
                  <Typography component='span'
                    style={
                      {
                        color: colorLabelRisk[generalInfo?.nguyCoHienTai]
                      }
                    }
                    className={classes.textDensity}
                  >
                    {` ${labelRisk[generalInfo?.nguyCoHienTai] || ''}`}
                  </Typography>
                </TableCell>

                <TableCell align="left">
                  Trong ngày:
                  <Typography component='span' className={classes.textNumber}> {generalInfo?.tongBNTrongNgay || 0}</Typography>
                </TableCell>
              </TableRow>

              <TableRow >
                <TableCell align="left" onClick={handleShowListPatient(generalInfo?.tongBenhNhan)} className={classes.cellClick}>
                  Tổng số Bệnh nhân:
                  <Typography component='span' className={classes.textNumber}> {generalInfo?.tongBenhNhan || 0}</Typography>
                  {
                    generalInfo?.tongBenhNhan > 0 &&
                    <img className={classes.imgMouse} src={IconConfig.mouseClick} width={24} height={24} alt='mouse icon' />
                  }
                </TableCell>
                <TableCell align="left" onClick={handleShowBlockadeAreas(generalInfo?.tongKhuVucPhongToa)} className={classes.cellClick}>
                  Khu vực phong tỏa:
                  <Typography component='span' className={classes.textNumber}> {generalInfo?.tongKhuVucPhongToa || 0}</Typography>
                  {
                    generalInfo?.tongKhuVucPhongToa > 0 &&
                    <img className={classes.imgMouse} src={IconConfig.mouseClick} width={24} height={24} alt='mouse icon' />
                  }
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="left">
                  Số ca tử vong:
                  <Typography component='span' className={classes.textNumber}> {generalInfo?.tongBNTuVong || 0}</Typography>
                </TableCell>

                <TableCell align="left">
                  F1:
                  <Typography component='span' className={classes.textNumber}> {generalInfo?.tongCaF1 || 0}</Typography>
                </TableCell>

              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {
        statusView == StatusViewEnum.province &&
        <Box className={classes.borderShadow} m={2}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Địa phương</TableCell>
                  <TableCell align="center">Bệnh nhân</TableCell>
                  <TableCell align="center">KV Phong tỏa</TableCell>
                  <TableCell align="center">F1</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  generalInfo?.localInfos?.map((district, index) => {
                    return (
                      <TableRow key={district?.country?.id} >
                        <TableCell align="left">{district?.country?.description + " " + district?.country?.name}</TableCell>
                        <TableCell align="center">{district?.tongBN}</TableCell>
                        <TableCell align="center">{district?.tongKhuVucPhongToa}</TableCell>
                        <TableCell align="center">{district?.country?.totalF1 + district?.country?.totalF1Other}</TableCell>
                      </TableRow>
                    )
                  })

                }
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      }
      {
        (statusView == StatusViewEnum.district || statusView == StatusViewEnum.subDistrict) &&
        <>
          <Box p={2} textAlign='center'>
            <Typography className={classes.textTypeAddress} >{districtInfo?.country?.description + " " + districtInfo?.country?.name}</Typography>
          </Box>
          <Box className={classes.borderShadow} m={2}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Bệnh nhân</TableCell>
                    <TableCell align="center">KV Phong tỏa</TableCell>
                    <TableCell align="center">F1</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      <Typography component='span' className={classes.textNumberLarge}>{districtInfo?.tongBN || 0}</Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Typography component='span' className={classes.textNumberLarge}>{districtInfo?.tongKhuVucPhongToa || 0}</Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Typography component='span' className={classes.textNumberLarge}>{districtInfo?.country?.totalF1 + districtInfo?.country?.totalF1Other || 0}</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      }

      {
        (statusView == StatusViewEnum.subDistrict) &&
        <>
          <Box p={2} textAlign='center'>
            <Typography className={classes.textTypeAddress}>{subDistrictInfo?.country?.description + " " + subDistrictInfo?.country?.name}</Typography>
          </Box>
          <Box className={classes.borderShadow} m={2}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Bệnh nhân</TableCell>
                    <TableCell align="center">KV Phong tỏa</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      <Typography component='span' className={classes.textNumberLarge}>{subDistrictInfo?.tongBN || 0}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography component='span' className={classes.textNumberLarge}>{subDistrictInfo?.tongKhuVucPhongToa || 0}</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      }
    </Box>
  )
}

export default ProvinceControl;
