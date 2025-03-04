// app/providers.tsx
"use client";

import { PostHogProvider as PHProvider } from "posthog-js/react";
import { PostHogInit } from "./posthog-init";
import { env } from "~/env";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider apiKey={env.NEXT_PUBLIC_POSTHOG_KEY}>
      <PostHogInit />
      {children}
    </PHProvider>
  );
}
