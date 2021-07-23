import * as turf from '@turf/turf'
import { AppConfig, CommonConfig } from '../config'

export class PolygonTool {
    static getCoordinatesFromPolygon = (polygon) => {
        let path = [...polygon.getPaths()[0]]
        path.pop()
        return path
    }
    static createPolygon = ({
        paths,
        strokeColor,
        strokeWidth,
        fillColor,
        fillOpacity
    }) => {
        let polygon = new map4d.Polygon({
            fillOpacity: fillOpacity,
            strokeColor: strokeColor,
            strokeWidth: strokeWidth,
            fillColor: fillColor,
            paths: paths
        })
        return polygon
    }

    static isThaiBinhWithinMap = (map) => {
        let SW = map.getBounds().getSouthwest()
        let NE = map.getBounds().getNortheast()
        let NW = { lat: NE.lat, lng: SW.lng }
        let SE = { lat: SW.lat, lng: NE.lng }
        let locs = [SW, NW, NE, SE, SW]

        let mapRectangle = []
        locs.forEach(loc => {
            mapRectangle.push([loc.lng, loc.lat])
        })
        let mapCordinate = [mapRectangle]
        let poly1 = turf.polygon(mapCordinate)
        let poly2 = turf.polygon(AppConfig.path)
        return turf.booleanWithin(poly2, poly1);
    }

    static isPointInArea = (location) => {
        let pointLocation = turf.point([location?.lng, location?.lat]);
        let polygon = turf.polygon(AppConfig.path)
        return turf.booleanPointInPolygon(pointLocation, polygon);
    }
}