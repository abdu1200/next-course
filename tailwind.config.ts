import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {  //here we set fontFamily to an object
        poppins: 'var(--font-poppins)' //here we can register our custom fonts and we use var function of css to read custom css properties
      }, //and now we can use 'font-poppins' as a tailwind entity or class in any of the pages
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui")],  //these are plugins of tailwind and we are putting daisyui as one
  daisyui: {
    themes: ["light", "dark", "cupcake", "winter"],  //here we are activating the themes we want to use from daisy ui
  },
}
export default config
