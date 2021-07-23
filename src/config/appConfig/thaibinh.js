import { AppConfig } from "../appConfig"

let restrictionBounds = new map4d.LatLngBounds()
restrictionBounds.extend({
    lat: 20.774394,
    lng: 105.860702
})
restrictionBounds.extend({
    lat: 20.239954,
    lng: 106.828872

})
export const ThaiBinh =
{
    mapKey: 'd1698b065d4c9bc5f4ab0a720a50aa41',
    covidApiDomain: "https://apicovid-thaibinh.map4d.vn",
    provinceName: "Tỉnh Thái Bình",
    hotline:'(0227) 3.831.722',
    logo:"/covidMapRoot/imageDefault/logo.png",
    apiMap4dMapDomain: "https://api.map4d.vn",
    defaultMapOptions: {
        search: "",
        center: [106.381866, 20.517375],
        zoom: 10,
        tilt: 0,
        bearing: 0,
        accessKey:'d1698b065d4c9bc5f4ab0a720a50aa41',
        geolocate: true,
        restrictionBounds: restrictionBounds
    },
    path: [[
        [106.746475, 20.768616],
        [106.668884, 20.257348],
        [106.118881, 20.237377],
        [106.043350, 20.765406],
        [106.746475, 20.768616]
    ]],
    viewBox: "20.274095,106.092102,20.736511,106.630432",
    idKhuVucPhongToa:'60c1d00e8dd67913e9145b0f'
}