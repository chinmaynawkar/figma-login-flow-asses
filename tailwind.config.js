/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      neutral: {
        550: "#f5f5f5",
      },
      green: {
        700: "#047647",
      },
    },
    extend: {
      colors: {
        background: "#f9fafb",
        foreground: "#132C4A",
        card: "#ffffff",
        primary: {
          DEFAULT: "#0054fd",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#edeef2",
          foreground: "#132C4A",
        },
        muted: {
          DEFAULT: "#f3f4f6",
          foreground: "#6a7282",
        },
        border: "#e5e7eb",
        ring: "#0054fd",
        label: "#8292A1",
        destructive: {
          DEFAULT: "#dc2626",
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["Rubik", "ui-sans-serif", "system-ui"],
      },
      fontSize: {
        48: ["3rem", { lineHeight: "3.5rem" }],
      },
      spacing: {
        0.25: "1px",
        0.375: "1.5px",
        0.75: "3px",
        1.25: "5px",
        1.75: "7px",
        2.25: "9px",
        2.75: "11px",
        3.25: "13px",
        3.75: "15px",
        4.25: "17px",
        4.75: "19px",
        5.25: "21px",
        5.5: "22px",
        6.5: "26px",
        10.5: "42px",
        11.25: "45px",
      },
    },
  },
  plugins: [],
};
