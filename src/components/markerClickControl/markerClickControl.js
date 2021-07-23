import { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { AppData } from "../../data";
import { MapEventEnum } from "../../enum";
import { RouterConfig } from './../../config/routerConfig';

function MarkerClickControl() {
  const history = useHistory()

  useEffect(() => {
    const eventClickMarker = AppData.map.addListener(MapEventEnum.click, (args) => {
      let data = args?.marker?.getUserData()
      if (data) {
        history?.push({
          pathname: RouterConfig.place.detail.replace(':id', data?.placeId)
        })
      }
    }, { marker: true })

    return () => {
      eventClickMarker?.remove()
    }
  }, [])
  
  return (
    null
  )
}

MarkerClickControl.propTypes = {
  //
};

export default MarkerClickControl;
