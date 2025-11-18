const withMT = require("@material-tailwind/react/utils/withMT");
import type { Config } from 'tailwindcss';

const baseConfig: Config = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'black-s': "#252525",
        'black-flou': '#000000c9',
        'primary': '#ef4444',
        'primary-dark': '#dc2626',
        'primary-light': '#fee2e2',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
});
export default baseConfig

// export default baseConfig 
//  module.exports = withMT({
//    content: ["./pages/**/*.{js,ts,jsx,tsx}"],
//    theme: {
//      extend: {},
//    },
//    plugins: [],
//  });
