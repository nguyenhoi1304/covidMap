import { AppConfig } from "../appConfig"

let restrictionBounds = new map4d.LatLngBounds()
restrictionBounds.extend({
    lat: 14.771938,
    lng: 106.771853,
})
restrictionBounds.extend({
    lat: 16.479494,
    lng: 109.150958

})
export const Local =
{
    mapKey: 'e011d2b304cd01d5d40dd0f614ccc195',
    covidApiDomain: "https://apicovid-quangnam.map4d.vn",
    provinceName: "Tỉnh Quảng Nam",
    hotline:'0235 3604 439',
    logo:"/covidMapRoot/logo/CDClogoQuangNam.png",
    apiMap4dMapDomain: "https://apicovid-quangnam.map4d.vn",
    defaultMapOptions: {
        search: "",
        center: [108.04229736328125, 15.48809203899709],
        zoom: 10,
        tilt: 0,
        bearing: 0,
        accessKey:'e011d2b304cd01d5d40dd0f614ccc195',
        geolocate: true,
        restrictionBounds: restrictionBounds
    },
    path: [[
        [107.138671875, 14.926208323277042],
        [107.138671875, 15.979813089726129],
        [108.97064208984375, 15.979813089726129],
        [108.97064208984375, 14.926208323277042],
        [107.138671875, 14.926208323277042]
    ]],
    viewBox: "14.926208323277042,107.138671875,15.979813089726129,108.97064208984375",
    idKhuVucPhongToa:'60c1d00e8dd67913e9145b0f'
}