module.exports = {
  purge: ["layouts/**/*.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
            visibility: "hidden"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            visibility: "visible"
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.35s ease-in",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
