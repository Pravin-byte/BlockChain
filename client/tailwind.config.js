/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blockchain-blue': '#3B82F6',
        'blockchain-green': '#10B981',
        'blockchain-purple': '#8B5CF6',
      }
    },
    animation: {
      float: "float 6s ease-in-out infinite",
      "float-delayed": "float 6s ease-in-out infinite 3s",
    },
    keyframes: {
      float: {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-5px)" },
      },
    },
  },
  plugins: [],
}
