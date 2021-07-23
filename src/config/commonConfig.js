import { AppConfig } from "./appConfig";

export const CommonConfig = {
    padding: 6,
    widthInfoBoard: 475,
    heightHeader: 60,
    heightFooter: 60,
    sizeMarker: 28,
    density: [
        {
            min: 0,
            max: 0,
            risk: 1,
            color: "#66B5CE",
            polygonColor: '#66b5cecc'
        },
        {
            min: 1,
            max: 5,
            risk: 2,
            color: "#D6D69A",
            polygonColor: '#d6d69acc'
        },
        {
            min: 6,
            max: 20,
            risk: 3,
            color: "#FFA349",
            polygonColor: '#ffa349cc'
        },
        {
            min: 20,
            max: 100,
            risk: 4,
            color: "#FF4C49",
            polygonColor: '#ff4c49cc'
        },
    ],
}