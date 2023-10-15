/** @type {import('next').NextConfig} */
const nextConfig = {
    staticPageGenerationTimeout: 180,
    reactStrictMode: true,
    experimental: {
        serverComponentsExternalPackages: ["mongoose"]
    }
}

module.exports = nextConfig
