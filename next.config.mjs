/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.pdf/,
            type: "asset/resource",
            generator: {
                filename: 'static/[hash][ext]',
            }
        })

        return config
    }
};

export default nextConfig;
