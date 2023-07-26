/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  darkMode: 'class',
  theme: {
    screens: {
      "sm": "370px",
      // => @media (min-width: 370px) { ... }

      "md": "640px",
      // => @media (min-width: 640px) { ... }

      "lg": "820px",
      // => @media (min-width: 768px) { ... }

      "xl": "1024px",
      // => @media (min-width: 1024px) { ... }
      "2xl": "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      boxShadow: {
        custom: '1px 22px 52px rgba(1, 1, 1, 0.07)',
      }
    }
  },
};
