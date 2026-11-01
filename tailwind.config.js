/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        se: {
          green: '#3DCD58',
          darkgreen: '#2DA843',
          lightgreen: '#E7FFD9',
          spruce: '#005F6D',
          darkspruce: '#004550',
          lightspruce: '#E0F2F4',
          blue: '#42B4E6',
          darkblue: '#208AB8',
        }
      }
    },
  },
  plugins: [],
}
