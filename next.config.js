/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://api.example.com/:path*",
            },
        ];
    },
    experimental: {
        esmExternals: true,
    },
};

module.exports = nextConfig;
