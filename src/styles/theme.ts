import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    colors: {
        gray: {
            "900": "#181B23",
            "800": "#1F2029",
            "700": "#353646",
            "600": "#4B4D63",
            "500": "#616480",
            "400": "#797D9A",
            "300": "#9699B0",
            "200": "#B3B5C6",
            "100": "#D1D2DC",
            "50": "#EEEEF2",
        },
        'blueGradient': 'linear-gradient(195deg, rgb(73, 163, 241), rgb(15, 76, 129))',
        'text': '#1F2733',
        'blueOficial': '#0f4c81',
        'yellowOficial': '#ffc72c',
    },
    fonts: {
        body: "Helvetica, sans-serif",
        heading: "Helvetica, sans-serif",
    },
    styles: {
        global: {
            body: {
                bgGradient: 'linear(to-r, gray50, gray.100)',
                color: 'black.100'
            }
        }
    }
})