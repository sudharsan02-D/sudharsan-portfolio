import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        neon: "#00e5ff",
        "neon-dark": "#00b8cc",
      },
      boxShadow: {
        "neon": "0 0 20px rgba(0, 229, 255, 0.5), 0 0 40px rgba(0, 229, 255, 0.3)",
        "neon-hover": "0 0 30px rgba(0, 229, 255, 0.7), 0 0 60px rgba(0, 229, 255, 0.5)",
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 229, 255, 0.5), 0 0 40px rgba(0, 229, 255, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(0, 229, 255, 0.7), 0 0 60px rgba(0, 229, 255, 0.5)" },
        },
      },
    },
  },
  plugins: [],
}
export default config
