/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#646cff',
          hover: '#535bf2',
          tauri: '#24c8db',
        },
        background: {
          light: '#f6f6f6',
          dark: '#2f2f2f',
        },
        surface: {
          light: '#ffffff',
          dark: '#0f0f0f98',
        },
        foreground: {
          light: '#0f0f0f',
          dark: '#f6f6f6',
        }
      },
      boxShadow: {
        'button': '0 2px 2px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};
