/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {

      keyframes: {
        'slideOutToLeft': {
          from: {
            transform: 'translate(0%)'
          },
          to: {
            transform: 'translate(-100%)'
          }
        },
        'slideInFromLeft': {
          from: {
            transform: 'translate(0%)'
          },
          to: {
            transform: 'translate(100%)'
          }
        }
      },

      animation: {
        'slideOutToLeft': 'slideOutToLeft 1s easy-in-out',
        'slideInFromLeft': 'slideInFromLeft 1s easy-in-out',
      },

      transitionProperty: {
        height: 'height',
        width: 'width',
        'max-height': 'max-height'
      },

      colors: {
        methods: {
          GET: '#89ddff',
          POST: '#fffac2',
          PUT: '#5de4c7',
          DELETE: '#d0679d'
        },

        dark: {
          3: '#1b1d29',
          2: '#303440',
          1: '#4f6477'
        },

        green: {
          3: '#42665a',
          2: '#5fb4a1',
          1: '#4f6477'
        },

        
      },

    },
  },
  plugins: [],
};
