"use client";

import posthog from "posthog-js";
import { useEffect } from "react";
import { env } from "~/env";

export function PostHogInit() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: "https://jakodrive.netlify.app/ingest",
        ui_host: "https://us.posthog.com",
        capture_pageview: false,
      });
    }
  }, []);

  return null;
}
