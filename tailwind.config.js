/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx,md,mdx}',
    './content/**/*.{md,mdx}',
    './node_modules/nextra-theme-docs/**/*.{js,jsx,ts,tsx,md,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      noHover: {
        '&:hover': {
          background: 'initial',
          color: 'inherit',
        },
      },
      fontFamily: {
        'thicccboisemibold': ['Thicccboi-semibold', 'sans-serif'],
        'thicccboibold': ['Thicccboi-bold', 'sans-serif'],
        'thicccboiregular': ['Thicccboi-regular', 'sans-serif'],
        'ppmori': ['PP Mori', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

