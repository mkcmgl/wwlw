/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

// eslint-disable-next-line no-undef
module.exports = {
    content: [
        './index.html',
        './src/**/*.{ts,vue}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    'AlibabaPuhuiTi',
                    ...defaultTheme.fontFamily.sans,
                ],
            }
        },
    },
    plugins: [],
};

