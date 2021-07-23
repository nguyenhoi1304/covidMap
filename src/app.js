import { Box } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider, useTheme } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Route } from "react-router-dom";
import "./app.css";
import BtnListPatients from './components/btnListPatients/btnListPatients';
import MapView from './components/common/mapView/mapView';
import DensityNote from './components/densityNote/densityNote';
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import ListBlockadeAreas from "./components/listBlockadeAreas/listBlockadeAreas";
import LocationDetail from "./components/locationDetail/locationDetail";
import MapControl from "./components/mapControl/mapControl";
import MarkerClickControl from "./components/markerClickControl/markerClickControl";
import PatientDetail from "./components/patientDetail/patientDetail";
import PlaceTypeControl from "./components/placeTypeControl/placeTypeControl";
import PolygonHoverControl from "./components/polygonHoverControl/polygonHoverControl";
import ProvinceControl from "./components/provinceControl/provinceControl";
import Search from "./components/search/search";
import SelectOptionSearch from "./components/selectOptionSearch/selectOptionSearch";
import SideBar from "./components/sidebar/sidebar";
import { ColorConfig } from "./config";
import { CommonConfig } from './config/commonConfig';
import { RouterConfig } from './config/routerConfig';
import { AppData } from './data/appData';
import PlaceDetail from './components/placeDetail/placeDetail';
import AreaDetail from './components/areaDetail/areaDetail';

function App() {
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
    const handlePlaceTypeRef = (r) => {
        AppData.placeType = r
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                width="100%"
                height="100%"
                className="appCpn"
                display="flex"
                flexDirection="column"
                position="relative"
            >
                <Box>
                    <Header />
                </Box>
                <Box
                    flexGrow={1}
                    display="flex"
                    overflow="hidden"
                    position="relative"
                >
                    <Box flexGrow={1} display="flex" flexDirection="column">
                        <Box
                            flexGrow={1}
                            minWidth="10px"
                            minHeight="10px"
                            position="relative"
                            id='mapView'
                        >
                            <MapView
                                onLoadedMap={onLoadMap}
                                width="100%"
                                height="100%"
                            />
                            {
                                isLoadedMap &&
                                <>
                                    <Box
                                        position="absolute"
                                        right={10}
                                        bottom={10}
                                    >
                                        <MapControl />
                                    </Box>

                                    <Box
                                        position="absolute"
                                        left={10}
                                        top={10}
                                        display="flex"
                                        height="0"
                                        justifyContent="space-between"
                                        overflow="visible"
                                        width="calc(100% - 40px)"
                                    >
                                        <BtnListPatients ref={handleListPatientRef} />
                                        <Box
                                            width="540px"
                                            id='selectOptionSearch'
                                        >
                                            <SelectOptionSearch />
                                        </Box>

                                    </Box>

                                    {/* dành cho absolute so với map */}
                                    <PolygonHoverControl />
                                    <Box
                                        position="absolute"
                                        left="12px"
                                        bottom="60px"
                                        borderRadius="6px"
                                        overflow="auto"
                                        p="14px"
                                        bgcolor="background.paper"
                                        display="flex"
                                        flexDirection="column"
                                        maxHeight="calc(100% - 136px)"
                                        maxWidth="255px"
                                    >
                                        <PlaceTypeControl ref={handlePlaceTypeRef} />
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
                                </>
                            }
                        </Box>
                    </Box>

                    <SideBar>
                        <ProvinceControl />
                    </SideBar>
                </Box>
                {/* <PlaceInfo /> */}
                <ListBlockadeAreas ref={handleListBlockadeAreasRef} />
                <Box>
                    <Footer />
                </Box>
            </Box>
        </ThemeProvider >
    )
}
export default App;