const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.vue",
        "./index.html"
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
            },

            colors: {
                'wisteria': {
                    '50': '#fbf8fc',
                    '100': '#f4f0f7',
                    '200': '#ede3f1',
                    '300': '#decde5',
                    '400': '#c8acd4',
                    '500': '#b28bc1',
                    '600': '#9f74af',
                    '700': '#855c94',
                    '800': '#704e7b',
                    '900': '#5b4063',
                    '950': '#3d2645',
                },

                'sky-blue': {
                    '50': '#f3f9fc',
                    '100': '#e6f3f8',
                    '200': '#c7e7f0',
                    '300': '#8fd2e2',
                    '400': '#5dbed3',
                    '500': '#38a7bf',
                    '600': '#2888a1',
                    '700': '#216d83',
                    '800': '#1f5c6d',
                    '900': '#1f4d5b',
                    '950': '#14323d',
                },

                'goldenrod': {
                    '50': '#fff9eb',
                    '100': '#ffefc6',
                    '200': '#ffda7c',
                    '300': '#ffc64a',
                    '400': '#ffaf20',
                    '500': '#f98b07',
                    '600': '#dd6502',
                    '700': '#b74406',
                    '800': '#94340c',
                    '900': '#7a2b0d',
                    '950': '#461402',
                },
                
                'chelsea-cucumber': {
                    '50': '#f2f6ef',
                    '100': '#e2ecdb',
                    '200': '#c8dbbb',
                    '300': '#a6c492',
                    '400': '#8aaf74',
                    '500': '#699052',
                    '600': '#4f723e',
                    '700': '#3f5833',
                    '800': '#35482c',
                    '900': '#2f3e29',
                    '950': '#162112',
                },                
            }
        },
    },

    plugins: [],
}

