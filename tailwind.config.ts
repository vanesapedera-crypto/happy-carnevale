import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF4F9A",
          soft: "#FFE1EF",
        },
        secondary: {
          DEFAULT: "#7C4DFF",
          soft: "#EDE7FF",
        },
        accent: {
          DEFAULT: "#35D6AE",
          soft: "#DFFAF3",
        },
        sunshine: {
          DEFAULT: "#FFD54A",
          soft: "#FFF6DC",
        },
        ink: "#1F2937",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      maxWidth: {
        "8xl": "90rem",
      },
      boxShadow: {
        primary: "0 24px 48px -16px rgba(255, 79, 154, 0.35)",
        secondary: "0 24px 48px -16px rgba(124, 77, 255, 0.35)",
        accent: "0 24px 48px -16px rgba(53, 214, 174, 0.35)",
        sunshine: "0 24px 48px -16px rgba(255, 213, 74, 0.45)",
        soft: "0 20px 45px -20px rgba(31, 41, 55, 0.18)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(3deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
