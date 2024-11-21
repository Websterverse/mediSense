/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Ensure this points to your actual entry file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all your component files
    "node_modules/preline/dist/*.js", // Preline plugin support
  ],
  darkMode: "class", // Enable class-based dark mode (important)
  theme: {
    extend: {
      fontFamily: {
        epilogue: ["Epilogue", "sans-serif"],
        poppins: ["Poppins", "sans-serif"], // Added to match your intent
      },
      boxShadow: {
        secondary: "10px 10px 20px rgba(2, 2, 2, 0.25)",
      },
      colors: {
        mainBackgroundColor: "#0D1117", // Dark mode primary background
        columnBackgroundColor: "#161C22", // Dark mode secondary background
      },
    },
  },
  plugins: [require("preline/plugin")], // Keep preline plugin as needed
    theme: {
      extend: {
        fontFamily: {
          sans: ['Roboto', 'Poppins', 'sans-serif'],
        },
      },
    },
  
};
