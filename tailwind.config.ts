import type { Config } from "tailwindcss";

const config: Config = {
	content: [
    	"./pages/**/*.{js,ts,jsx,tsx,mdx}",
    	"./components/**/*.{js,ts,jsx,tsx,mdx}",
    	"./app/**/*.{js,ts,jsx,tsx,mdx}",
  	],
  	theme: {
  		extend: {
  			colors: {
				black: 'var(--black)',
  				bone: 'var(--bone)',
  			},
			fontFamily: {
				'sans': ["Helvetica Neue", "ui-sans-serif", "system-ui", "-apple-system", "Arial", "sans-serif"]
			},
			letterSpacing: {
				tightest: '-.075em',
				tighter: '-.05em',
				tight: '-.025em',
				tightish: '-0.01em',
				normal: '0',
				wide: '.025em',
				wider: '.05em',
				widest: '.1em',
			},
			height: {
				screen:'calc(var(--vh) * 100)',
			},
			minHeight: {
				screen:'calc(var(--vh) * 100)',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0'},
					'33%': {opacity: '0'},
					'100%': {opacity: '1'}
				}
			},
			animation: {
				fadeIn: 'fadeIn 1s ease-in'
			}
  		}
  	},
  	plugins: [require("tailwindcss-animate")],
};
export default config;
