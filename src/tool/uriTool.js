import { MapModeEum, UriEnum } from "../enum";

export class UriTool {
    static getCameraInfo = () => {
        let mapParams = {};
        let parameters = [];
        let mapSearchParams = new URLSearchParams(location.search);
        let camera = mapSearchParams.get(UriEnum.camera);

        if (camera) {
            parameters = camera.split(",");
        }
        if (parameters.length == 6) {
            mapParams.center = [parseFloat(parameters[1]), parseFloat(parameters[0])];
            mapParams.zoom = parseFloat(parameters[2]);
            mapParams.tilt = parseFloat(parameters[3]);
            mapParams.bearing = parseFloat(parameters[4]);
            mapParams.mode = parseInt(parameters[5]) == 0 ? MapModeEum.mode2D : MapModeEum.mode3D;
        }
        return mapParams;
    };

} 