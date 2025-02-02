"use client";

import * as React from "react";

const MOBILE_BREAKPOINT = 768; // Width in pixels that defines mobile breakpoint

export function useIsMobile() {
  // Initialize with window check to avoid hydration mismatch
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Create a media query list for mobile screens
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Handler function to update state when screen size changes
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Initial check
    onChange();

    // Add event listener for screen size changes
    mql.addEventListener("change", onChange);

    // Cleanup function to remove event listener
    return () => mql.removeEventListener("change", onChange);
  }, []); // Empty dependency array means this effect runs once on mount

  return isMobile;
}
