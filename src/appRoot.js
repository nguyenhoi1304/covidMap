import React from "react";
import App from "./app";
import MobileApp from "./mobileComponents/mobileApp";
import { useIsMobileScreen } from './useHooks/useIsMobileScreen';

function AppRoot() {
    const isMobile = useIsMobileScreen()

    return (
        <>
            {
                isMobile ?
                    <MobileApp />
                    :
                    <App />
            }
        </>
    )
}
export default AppRoot