/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    content: [
        "./src/**/*.{html, js, ts, vue}", 
        "./src/**/*"
    ],
    darkMode: 'class',
    theme: {
        screens: {
            xxs: "280px",
            xs: "400px",
            sm: "525px",
            md: "768px",
            lg: "1024px",
            xl: "1200px",
            xxl: "1440px",
        },
        fontFamily: {
            'sans': ['Inter', 'Arial', 'sans-serif', 'system-ui'],
        },
        extend: {
            animation: {
                'header-up': 'header-up-ani 1s forwards',
                'header-down': 'header-down-ani 1s forwards',
                'input-down': 'input-down-ani 0.4s forwards',
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
                'input-down-ani': {
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
                    'lazy-load': '#333333',
                    'hover-fuchsia': 'rgb(162, 28, 175);'
                },
            },

        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('tailwind-hamburgers')],
  }

