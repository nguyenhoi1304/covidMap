export class LocationTool {
    static isValid = (loc) => {
        if ((loc?.lat || loc?.lat == 0) && (loc?.lng || loc?.lng == 0)) {
            let lat = parseFloat(loc?.lat)
            let lng = parseFloat(loc?.lng)
            if (!isNaN(lat) && !isNaN(lng) && -90 <= lat && lat <= 90 && -180 <= lng && lng <= 180) {
                return true
            }
        }
        return false
    }
    static checkTextIsLocation = (text) => {
        let locs = text?.trim()?.split(",")
        if (locs?.length == 2) {
            let lat = locs[0]
            let lng = locs[1]
            let loc = {
                lat: lat?.trim(),
                lng: lng?.trim()
            }
            if (LocationTool.isValid(loc)) {
                let numLat = parseFloat(lat?.trim())
                let numLng = parseFloat(lng?.trim())
                return {
                    lat: numLat,
                    lng: numLng
                }
            }
            return false
        }
    }
}