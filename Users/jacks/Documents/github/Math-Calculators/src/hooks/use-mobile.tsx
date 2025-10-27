
"use client";

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * @deprecated This hook is deprecated. Use CSS media queries for responsive design.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    // This code now runs only on the client, after the initial render.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(mql.matches);
    };

    // Set the initial value after mounting
    onChange();
    
    mql.addEventListener("change", onChange);
    
    // Cleanup listener on unmount
    return () => mql.removeEventListener("change", onChange);
  }, []); // Empty dependency array ensures this runs once on mount

  // Return null on the server and during the initial client render
  // to prevent any hydration mismatch. The correct value is returned
  // after the effect runs.
  return isMobile;
}
