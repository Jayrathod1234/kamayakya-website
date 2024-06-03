// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    fontFamily:{
      "open_sans":["Open Sans",'sans-serif'],
    },
    fontSize: {
      "4xs": [
        "0.625rem",
        {
          lineHeight: "0.938rem",
        },
      ],
      "3xs": [
        "0.688rem",
        {
          lineHeight: "1.063rem",
        },
      ],
      "2xs": [
        "0.75rem",
        {
          lineHeight: "1.125rem",
        },
      ],
      xs: [
        "0.813rem",
        {
          lineHeight: "1.25rem",
        },
      ],
      sm: [
        "0.875rem",
        {
          lineHeight: "1.25rem",
        },
      ],
      md: [
        "1rem",
        {
          lineHeight: "1.5rem",
        },
      ],
      lg: [
        "1.125rem",
        {
          lineHeight: "1.75rem",
        },
      ],
      xl: [
        "1.25rem",
        {
          lineHeight: "1.875rem",
        },
      ],
      "display-xs": [
        "1.5rem",
        {
          lineHeight: "2rem",
        },
      ],
      "display-sm": [
        "1.875rem",
        {
          lineHeight: "2.375rem",
        },
      ],
      "display-md": [
        "2.25rem",
        {
          lineHeight: "2.75rem",
          letterSpacing: "-2%",
        },
      ],
      "display-lg": [
        "3rem",
        {
          lineHeight: "3.75rem",
          letterSpacing: "-2%",
        },
      ],
      "display-xl": [
        "3.75rem",
        {
          lineHeight: "4.5rem",
          letterSpacing: "-2%",
        },
      ],
      "display-2xl": [
        "4.5rem",
        {
          lineHeight: "5.625rem",
          letterSpacing: "-2%",
        },
      ],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "radial-gradient-xl":"radial-gradient(389.9% 150.6% at -13.33% 12.53%, rgba(100, 253, 171, 0.00) 0%, rgba(129, 184, 244, 0.40) 25.93%, rgba(196, 219, 254, 0.57) 43.63%, rgba(228, 238, 253, 0.57) 69.37%, rgba(253, 239, 255, 0.57) 79.3%, rgba(253, 239, 255, 0.00) 100%)",
        "radial-gradient":
          "radial-gradient(348.84% 134.74% at -1.18% 22.73%, rgba(255, 255, 255, 0.00) 0%, rgba(164, 233, 255, 0.40) 19%, rgba(155, 226, 249, 0.57) 43.63%, rgba(197, 255, 224, 0.57) 57.07%, rgba(203, 255, 224, 0.57) 69.37%, rgba(229, 255, 223, 0.57) 79.3%, rgba(255, 255, 255, 0.00) 100%)",
      },
      boxShadow: {
        "6xs": "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        "5xs": "0px 1px 5px 0px rgba(50, 0, 0, 0.09)",
        "4xs": "0px 2px 6px 0px rgba(2, 15, 35, 0.06)",
        "3xs": "0px 2px 6px 0px rgba(0, 0, 0, 0.05)",
        "2xs": "0px 3px 12px 0px rgba(0, 0, 0, 0.05)",
        xs: "0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
        sm: "0px 3px 50px 0px rgba(1, 24, 33, 0.08)",
        md: "0px 52px 90px -10px rgba(111, 124, 119, 0.05), 0px 12px 20px -10px rgba(119, 130, 128, 0.05), 0px 3.5px 6px -10px rgba(125, 131, 129, 0.06)",
        lg: "0px 12px 16px -4px rgba(16, 24, 40, 0.10), 0px 4px 6px -2px rgba(16, 24, 40, 0.05)",
        xl: "0px 20px 24px -4px rgba(16, 24, 40, 0.10), 0px 8px 8px -4px rgba(16, 24, 40, 0.04)",
        "2xl": "0px 24px 48px -12px rgba(16, 24, 40, 0.25)",
        "3xl": "0px 32px 64px -12px rgba(16, 24, 40, 0.20)",
      },
      colors: {
        gray: {
          25: "#fcfcfd",
          50: "#f9fafb",
          100: "#f2f4f7",
          150: "#EDF0F5",
          200: "#e4e7ec",
          300: "#d0d5dd",
          400: "#98a2b3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1d2939",
          900: "#101828",
          950: "#0c111d",
        },
        brand: {
          100: "#E7F8F8",
          200: "#f4fff",
          300: "#75cdc5",
          400: "#17756c",
          500: "#125b54",
          600: "#0e4943",
          700: "#0b3a36",
        },
        error: {
          100: "#fffbfa",
          200: "#fef3f2",
          300: "#fecdca",
          400: "#f04438",
          500: "#d92d20",
          600: "#b42318",
          700: "#912018",
        },
        warning: {
          100: "#fffcf5",
          200: "#fffaeb",
          300: "#fedf89",
          400: "#f79009",
          500: "#dc6803",
          600: "#b54708",
          700: "#93370d",
        },
        success: {
          100: "#F6FEF9",
          200: "#ECFDF3",
          300: "#A6F4C5",
          350: "#00FF02",
          400: "#12B76A",
          500: "#039855",
          600: "#027A48",
          700: "#05603A",
        },
        orange: {
          100: "#fcfcfd",
          200: "#f8f9fc",
          300: "#c8cce5",
          400: "#717bbc",
          500: "#4e5ba6",
          600: "#3e4784",
          700: "#363f72",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
