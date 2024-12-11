/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
      extend: {
          colors: {
              customBlue: '#2563eb',
              customDarkBlue: '#1d4ed8',
          },
      },
  },
  plugins: [],
};
