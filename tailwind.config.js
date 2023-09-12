/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html, js, ts, vue}", 
        "./src/**/*"
    ],
    darkMode: 'class',
    theme: {
        screens: {
            es: "280px",
            xs: "525px",
            sm: "768px",
            md: "1024px",
            lg: "1200px",
            xl: "1440px",
        },

        extend: {
            animation: {
                'header-up': 'header-up-ani 1s forwards',
                'header-down': 'header-down-ani 1s forwards',
            },
            keyframes: {
                'header-up-ani': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-150%)' }
                },
                'header-down-ani': {
                    '0%': { transform: 'translateY(-150%)' },
                    '100%': { transform: 'translateY(0)' }
                },
            },
            colors: {
                dim: {
                    'bright': '#ffffff',
                    'white': '#e6e6e6',
                    'black-blur': 'rgba(0,0,0,.25)',
                    'gray': '#a6a6a6',
                    'semi-dark-gray': '#4d4d4d',
                    'dark-gray': '#262626',
                    'color-for-rating': '#ffd24d',
                },
            },

        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('tailwind-hamburgers')],
  }

