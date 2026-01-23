/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
      colors: {
        primitive: {
          white: 'rgb(var(--color-white) / <alpha-value>)',
          blackPrimary: 'rgb(var(--color-black-primary) / <alpha-value>)',
          blackSecond: 'rgb(var(--color-black-second) / <alpha-value>)',
          blackThird: 'rgb(var(--color-black-third) / <alpha-value>)',
          green: 'rgb(var(--color-green) / <alpha-value>)',
          red: 'rgb(var(--color-red) / <alpha-value>)',
          grayPrimary: 'rgb(var(--color-gray-primary) / <alpha-value>)',
          graySecond: 'rgb(var(--color-gray-second) / <alpha-value>)',
          grayThird: 'rgb(var(--color-gray-third) / <alpha-value>)',
          grayWeakest: 'rgb(var(--color-gray-weakest) / <alpha-value>)',
          grayText: 'rgb(var(--color-gray-text) / <alpha-value>)',
        },
        bg: {
          primary: 'rgb(var(--color-bg-primary) / <alpha-value>)',
        },
        text: {
          primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
          second: 'rgb(var(--color-text-second) / <alpha-value>)',
          third: 'rgb(var(--color-text-third) / <alpha-value>)',
        },
        button: {
          bg: {
            primary: 'rgb(var(--color-button-bg-primary) / <alpha-value>)',
            second: 'rgb(var(--color-button-bg-second) / <alpha-value>)',
          },
        },
      },

      maxWidth: {
        layout: '1050px',
      },
    },
  },
};
