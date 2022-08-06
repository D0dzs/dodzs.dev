/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        boxShadow: {
            'navbar': '0px 8px 16px 4px rgba(0,0,0,0.75)',
        }
    },
  },
  plugins: [],
};
