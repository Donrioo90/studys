/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS and JSX files in src
      "./public/index.html", // Scan the HTML file
    ],
    theme: {
      extend: {
        colors: {
          primary: '#007bff', // Custom primary color
          secondary: '#6c757d', // Custom secondary color
        },
        spacing: {
          '72': '18rem', // Custom spacing for margin/padding
          '84': '21rem',
          '96': '24rem',
        },
        borderRadius: {
          '4xl': '2rem', // Custom border radius
        },
      },
    },
    plugins: [],
  }
  