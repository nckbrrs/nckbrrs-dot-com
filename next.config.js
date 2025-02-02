/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const coreConfig = {
	images: {
		remotePatterns: [{ hostname: "*.ufs.sh" }]
	},
	typescript: {
		ignoreBuildErrors: true
	},
	eslint: {
		ignoreDuringBuilds: true
	},
	webpack: (config, options) => {
		config.module.rules.push(
			...[
				{
					test: /\.pdf/,
					type: "asset/resource",
					generator: {
						filename: "static/[hash][ext]"
					}
				},
			]
		);
		return config;
	}
};

export default coreConfig;
