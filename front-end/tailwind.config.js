import daisyui from "daisyui";

// /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Corrected this line
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
