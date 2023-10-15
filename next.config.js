/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    staticPageGenerationTimeout: 190,
    reactStrictMode: true,
    experimental: {
        serverComponentsExternalPackages: ["mongoose"]
    }
}

module.exports = nextConfig
