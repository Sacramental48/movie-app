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
            lg: "1280px",
            xl: "1440px",
        },

        extend: {
            filter: {
                'drop-shadow': 'drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.5))',
            },
            colors: {
                dim: {
                    50: "#5F99F7",
                    100: "#5F99F7",
                    200: "#38444d",
                    300: "#202e3a",
                    400: "#253341",
                    500: "#8788f9",
                    600: "#8134f5",
                    700: "#192734",
                    800: "#162d40",
                    900: "#15202b",
                },
            },

        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
  }

