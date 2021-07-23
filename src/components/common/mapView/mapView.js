import { Box } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { AppConfig, CommonConfig } from "../../../config";
import { UriTool } from "../../../tool";
import "./mapView.css";
import { AppData } from './../../../data/appData';

function MapView({ onLoadedMap, height, width }) {
    const mapRef = useRef();
    const map = useRef();

    const initMap = () => {
        let mapParamsInit = { ...AppConfig.defaultMapOptions, ...UriTool.getCameraInfo() };
        map.current = new map4d.Map(mapRef.current, mapParamsInit);
        map.current.enable3dMode(mapParamsInit.mode === "3d");
    };

    const getBounds = () => {
        let bounds = map.current?.getBounds();
        if (bounds?.getNortheast() && bounds?.getSouthwest()) {
            let camera = map.current.getCameraWithBounds(AppConfig.defaultMapOptions.restrictionBounds)
            map.current.moveCamera(camera, { animation: true })
            onLoadedMap && onLoadedMap(map.current);
        } else {
            setTimeout(() => {
                getBounds();
            }, 100);
        }
    };

    useEffect(() => {
        initMap();
        getBounds();
    }, []);

    const handleContextMenu = (e) => {
        return false
    }
    return (
        <Box position={"relative"} height={height} width={width}>
            <div onContextMenu={handleContextMenu} ref={(r) => (mapRef.current = r)} className="mapViewCpn" style={{ height: "100%", width: "100%" }}></div>
        </Box>

    );
}

MapView.propTypes = {
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    onLoadedMap: PropTypes.func,
};

export default MapView;
