import { Box } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider, useTheme } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Route } from "react-router-dom";
import "../app.css";
import BtnFilterPoint from "../components/btnFilterPoint/btnFilterPoint";
import MapView from "../components/common/mapView/mapView";
import ListBlockadeAreas from "../components/listBlockadeAreas/listBlockadeAreas";
import LocationDetail from "../components/locationDetail/locationDetail";
import MapControl from "../components/mapControl/mapControl";
import PatientDetail from "../components/patientDetail/patientDetail";
import ProvinceControl from "../components/provinceControl/provinceControl";
import Search from "../components/search/search";
import { ColorConfig, RouterConfig } from "../config";
import { AppData } from "../data";
import BtnListPatients from './../components/btnListPatients/btnListPatients';
import DensityNote from './../components/densityNote/densityNote';
import MarkerClickControl from './../components/markerClickControl/markerClickControl';
import MobileFooter from './mobileFooter/mobileFooter';
import MobileHeader from './mobileHeader/mobileHeader';
import SelectOptionSearch from './../components/selectOptionSearch/selectOptionSearch';
import PlaceDetail from "../components/placeDetail/placeDetail";
import AreaDetail from "../components/areaDetail/areaDetail";


function MobileApp() {
    const [isLoadedMap, setIsLoadedMap] = useState(false)

    const defaultTheme = useTheme()
    const shadows = defaultTheme.shadows

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: ColorConfig.primary,
            },
            default: {
                main: ColorConfig.default,
            },
        },
        shadows: shadows,
        typography: {
            h6: {
                fontSize: "1rem"
            },
            fontFamily: [
                'Open Sans',
                'sans-serif',
            ].join(','),
        },
        spacing: 6
    });

    const onLoadMap = (map) => {
        AppData.map = map;
        setIsLoadedMap(true);
    };

    const handleListPatientRef = (r) => {
        AppData.listPatient = r
    }
    const handleListBlockadeAreasRef = (r) => {
        AppData.listBlockadeAreas = r
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                width="100%"
                height="100%"
                className="mobileAppCpn"
                position="relative"
                overflow='auto'
            >
                <Box>
                    <MobileHeader />
                </Box>
                <Box flexGrow={1} display="flex" flexDirection="column">
                    <Box
                        flexGrow={1}
                        minWidth="10px"
                        minHeight="10px"
                        position="relative"
                        height='400px'
                        id='mapView'
                    >
                        <MapView
                            onLoadedMap={onLoadMap}
                            width="100%"
                            height="100%"
                        />
                        {/* dành cho absolute so với map */}
                        <Box
                            position="absolute"
                            right={10}
                            bottom={45}
                        >
                            <MapControl />
                        </Box>

                        <Box
                            position="absolute"
                            bgcolor="transparent"
                            p='0'
                            display="flex"
                            alignItems='center'
                            justifyContent='center'
                            bottom='5px'
                            left='50%'
                            style={{ transform: 'translateX(-50%)' }}
                            maxWidth='100%'
                        >
                            <DensityNote />
                        </Box>
                        <Box
                            position="absolute"
                            left={10}
                            top={10}
                            zIndex={3}
                            maxWidth="calc(100% - 10px)"
                            height="0"
                            overflow="visible"
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-start"
                        >
                            <Box
                                mb="10px"
                                width="400px"
                                maxWidth="calc(100% - 10px)"
                            >
                                <SelectOptionSearch />
                            </Box>
                            <BtnListPatients ref={handleListPatientRef} />
                        </Box>
                        <Box
                            position="absolute"
                            left="10px"
                            top="101px"
                            display="flex"
                            overflow="visible"
                            flexDirection="column"
                            maxHeight="calc(100% - 174px)"
                            alignItems="flex-start"
                            width="0"
                            className='btnFilterPoint'
                        >
                            <BtnFilterPoint />
                        </Box>
                        <MarkerClickControl />
                        <Route
                            exact
                            path={RouterConfig.patient.detail}
                        >
                            <PatientDetail />
                        </Route>
                        <Route
                            exact
                            path={RouterConfig.location.detail}
                        >
                            <LocationDetail />
                        </Route>
                        <Route
                            exact
                            path={RouterConfig.place.detail}
                        >
                            <PlaceDetail />
                        </Route>

                        <Route
                            exact
                            path={RouterConfig.area.detail}
                        >
                            <AreaDetail />
                        </Route>
                    </Box>
                </Box>
                <ProvinceControl />
                <ListBlockadeAreas ref={handleListBlockadeAreasRef} />
                <Box>
                    <MobileFooter />
                </Box>
            </Box>
        </ThemeProvider >
    )
}
export default MobileApp;