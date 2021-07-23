import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { AppConfig, RouterConfig, UrlConfig } from "../../config";
import { AppData } from "../../data";
import { CodeEnum } from "../../enum";
import { ApiTool } from "../../tool";
import PlaceInfo from "../placeInfo/placeInfo";
import DialogCard from './../common/dialogCard/dialogCard';

function PlaceDetail() {
  const { id } = useParams()
  const history = useHistory()
  const [place, setPlace] = useState(null)
  const location = useLocation()

  useEffect(() => {
    if (id && id != 'message') {
      var source = ApiTool.get(UrlConfig.place.detailPlaceSearch.replace("{placeId}", id) + `?key=${AppConfig.mapKey}`, (res) => {
        if (res?.code == CodeEnum.ok) {
            moveCamera(res?.result?.location, 13)
          setPlace(res?.result)
        }
      })
      return () => {
        source?.cancel()
      }
    }
  }, [id])

  const moveCamera = (location, zoom) => {
    let camera = AppData.map.getCamera()
    camera.setZoom(zoom)
    camera.setTarget(location)
    AppData.map.moveCamera(camera, { animate: true })
  }

  const onClickClose = (e) => {
    history.push({
      pathname: RouterConfig.home
    })
  }

  return (
    <DialogCard
      onClose={onClickClose}
      title='Thông tin chi tiết địa điểm'
    >
      {
        place ?
          <PlaceInfo data={place} />
          :
          <Box textAlign='center'>
            <Typography variant='body2'>Tên địa điểm không đúng !</Typography>
          </Box>
      }
    </DialogCard>
  )
}

export default PlaceDetail;
