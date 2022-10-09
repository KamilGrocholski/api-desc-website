/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {

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
