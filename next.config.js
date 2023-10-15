/** @type {import('next').NextConfig} */
const nextConfig = {
    staticPageGenerationTimeout: 1000,
    reactStrictMode: true,
    experimental: {
        serverComponentsExternalPackages: ["mongoose"]
    }
}

module.exports = nextConfig
