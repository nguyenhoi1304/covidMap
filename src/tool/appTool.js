import { AppData } from "../data"
import { CookieEnum, EnvironmentEnum, OperatingSystemEnum } from "../enum"

export class AppTool {
    static getEnvironment = () => {
        let env = EnvironmentEnum.prod
        if (/3001/.test(location.origin)) {
            env = EnvironmentEnum.local
        }
        if (/dev/.test(location.origin)) {
            env = EnvironmentEnum.dev
        }
        if (/test/.test(location.origin)) {
            env = EnvironmentEnum.test
        }
        return env
    }
    static isVimap = () => {
        if (/vimap/.test(location.origin)) {
            return true
        }
        return false
    }
    static getOperatingSystem = () => {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return OperatingSystemEnum.windowsPhone;
        }

        else if (/android/i.test(userAgent)) {
            return OperatingSystemEnum.android;
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return OperatingSystemEnum.ios;
        }

        return OperatingSystemEnum.unknown;
    }
    static isAppLink = () => {
        return /app/.test(location.origin)
    }
    static share = (url = null) => {
        AppData.shareControl.share(url)
    }
    static showListPatient = () => {
        AppData.listPatient?.show()
    }
    static showListBlockadeAreas = () => {
        AppData.listBlockadeAreas?.show()
    }

    static showPlaceRelatedPatientMarkers = (listBlockadeAreas, listRelatedPlace) => {
        AppData.placeType?.showPlaceRelatedPatientMarkers(listBlockadeAreas, listRelatedPlace)
    }
    static resetInfoMoves = () => {
        AppData.placeType?.resetInfoMoves()
    }
}