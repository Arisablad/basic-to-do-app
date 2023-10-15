/** @type {import('next').NextConfig} */
const nextConfig = {
    staticPageGenerationTimeout: 190,
    reactStrictMode: true,
    experimental: {
        serverComponentsExternalPackages: ["mongoose"]
    }
}

module.exports = nextConfig
