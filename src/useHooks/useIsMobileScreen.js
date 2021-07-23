import { useState, useEffect } from 'react';

// Hook
export function useIsMobileScreen() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
      // some code..
      // Set window width/height to state
      setIsMobileScreen(isMobile);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return isMobileScreen;
}