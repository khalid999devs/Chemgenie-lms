/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        root_bluish: '#041139',
        trans_bluish: '#101c44',
        Text: '#efefef',
        darkText: '#041139',
        primary: {
          // main: '#FEFDFC',
          main: '#FFFFFE',
          dark: '#d1d1ba',
        },
        onPrimary: {
          main: '#1F2937',
          light: '#d9e7f7',
        },
        secondary: {
          main: '#FDE047',
          dark: '#BF8600',
        },
      },
      screens: {
        '6xl': '1150px',
      },
      backgroundImage: {
        'gradient-radial':
          'linear-gradient(0deg, rgba(238,246,200,0.5823121484922094) 0%, rgba(237,233,213,0.7167659300048144) 50%, rgba(253,187,45,0.3) 100%)',
      },
    },
  },
  plugins: [],
};
