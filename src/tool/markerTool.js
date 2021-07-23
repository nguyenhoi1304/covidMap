export class MarkerTool {
    static getCoordinatesFromListMarker = (markers) => {
        let coors = []
        if (markers && markers.length > 0) {
            markers.forEach(element => {
                coors.push(element.getPosition())
            });
        }
        return coors
    }
    static removeMarkers = (markers) => {
        markers?.forEach(m => {
            m.setMap(null)
        })
    }
    static hideMarkers = (markers) => {
        markers?.forEach(m => {
            m.setVisible(false)
        })
    }
    static showMarkers = (markers) => {
        markers?.forEach(m => {
            m.setVisible(true)
        })
    }
}