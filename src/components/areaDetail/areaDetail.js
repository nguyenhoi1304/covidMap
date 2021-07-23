import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { AppConfig, RouterConfig, UrlConfig } from "../../config";
import { CodeEnum } from "../../enum";
import { ApiTool } from "../../tool";
import AreaInfo from './../areaInfo/areaInfo';
import DialogCard from './../common/dialogCard/dialogCard';
import { Box, Typography } from '@material-ui/core';
import { AppData } from "../../data";

const TypeGeometryEnum = {
  polygon: "Polygon",
  multiPolygon: "MultiPolygon"
}

function AreaDetail() {
  const { id } = useParams()
  const history = useHistory()
  const [area, setArea] = useState(null)

  useEffect(() => {
    if (id && id != 'message') {
      var source = ApiTool.get(UrlConfig.country.detail.replace("{countryId}", id) + `?key=${AppConfig.mapKey}`, (res) => {
        if (res?.code == CodeEnum.ok) {
          fitBoundArea(res?.result?.country?.geometry)
          setArea(res?.result)
        }
      })
    }
    return () => {
      source?.cancel()
    }
  }, [id])

  const fitBoundArea = (geometry) => {
    let bounds = new map4d.LatLngBounds()
    let camera = AppData.map.getCamera()

    let paddingOptions = {
      top: 80,
      bottom: 80,
      left: 10,
      right: 10
    }

    if (geometry?.type == TypeGeometryEnum.polygon) {
      geometry?.coordinates[0].forEach((point, index) => {
        bounds.extend(point)
      })
    }
    else {
      geometry?.coordinates.forEach((polygon, index) => {
        polygon[0].forEach((point, idx) => {
          bounds.extend(point)
        })
      })
    }

    camera = AppData.map.getCameraWithBounds(bounds, paddingOptions)
    AppData.map.moveCamera(camera, { animation: true })
  }

  const onClickClose = (e) => {
    history.push({
      pathname: RouterConfig.home
    })
  }

  return (
    <DialogCard
      onClose={onClickClose}
      title='Thông tin chi tiết khu vực'
    >
      {
        area ?
          <AreaInfo data={area} />
          :
          <Box textAlign='center'>
            <Typography variant='body2'>Tên khu vực không đúng !</Typography>
          </Box>
      }
    </DialogCard>
  )
}

export default AreaDetail;
