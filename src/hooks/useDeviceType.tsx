import { useState, useEffect } from "react";

// A custom hook to detect if the user is on a mobile device
function useDeviceType(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    // Update state based on initial screen size
    setIsMobile(mediaQuery.matches);

    // Listener for changes in screen size
    const handleChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [breakpoint]);

  return isMobile;
}

export default useDeviceType;
