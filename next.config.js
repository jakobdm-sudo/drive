/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    // Disable ESLint during build ENABLE LATER
    eslint: {
        ignoreDuringBuilds: true,
    },
    // Disable TypeScript during build ENABLE LATER
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default config;
