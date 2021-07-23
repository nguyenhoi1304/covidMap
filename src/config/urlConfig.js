import { AppConfig } from "./appConfig";

export const UrlConfig = {
    collectInfo: {
        getGeneralInfomation: AppConfig.covidApiDomain + "/map/collect-info",
        getDistrictInfomation: AppConfig.covidApiDomain + "/map/collect-info/district/{id}"
    },
    patient: {
        list: AppConfig.covidApiDomain + '/map/benh-nhan/get-list',
        detail: AppConfig.covidApiDomain + "/map/benh-nhan/find"
    },
    viewBox: {
        getAllPlaceAndBN: AppConfig.covidApiDomain + "/map/benh-nhan/benh-nhan-and-info"
    },
    placeType: {
        listActive: AppConfig.covidApiDomain + "​/map/placetype/list-active"
    },
    autosuggest: AppConfig.apiMap4dMapDomain + "/map/autosuggest",
    place: {
        detailPlaceSearch: AppConfig.covidApiDomain + '/map/place/{placeId}',
        detail: AppConfig.apiMap4dMapDomain + "/map/place/detail/{id}",
        list: AppConfig.covidApiDomain + "/map/place/get-list",
        search: AppConfig.covidApiDomain + '/map/place/search'
    },
    country: {
        search: AppConfig.covidApiDomain + '/map/country/search',
        detail: AppConfig.covidApiDomain + '/map/country/{countryId}'
    },

}