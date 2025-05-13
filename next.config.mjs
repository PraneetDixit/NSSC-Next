/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "retinaaiims.org",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
