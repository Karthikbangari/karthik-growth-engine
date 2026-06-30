/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Theme: "Clear Sky" — cloud white + bright sky blue + warm sunlight gold + deep sky-navy.
        sand: "#F3F9FF", // page background (cloud white with a hint of sky)
        sand2: "#FBFDFF", // soft cloud surface
        ink: "#13294B", // deep sky-navy text
        slate: "#0F2444", // deep navy (dark cards)
        // The `olive` key is kept for compatibility — it now holds the
        // sky-blue primary scale, so every existing class re-themes at once.
        olive: {
          DEFAULT: "#1E7FD8",
          50: "#EFF8FF",
          100: "#DBEEFE",
          200: "#BFE1FD",
          300: "#93CDFB",
          400: "#5FB2F6",
          500: "#3897EB",
          600: "#1E7FD8",
          700: "#1865B0",
          800: "#17518C",
          900: "#163F6B",
        },
        // Warm sunlight gold — the cheerful, welcoming secondary accent.
        gold: {
          DEFAULT: "#F6B958",
          light: "#FCE6B8",
          600: "#E2A23C",
          700: "#C2832A",
        },
        // Extra sky accents
        clay: "#F2994A",
        blush: "#FCE8CC",
        mist: "#DBEEFE",
      },
      fontFamily: {
        display: ['"Outfit"', "sans-serif"],
        grotesk: ['"Outfit"', "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(19, 41, 75, 0.18)",
        glass: "0 8px 32px rgba(19, 41, 75, 0.10)",
        olive: "0 12px 30px -10px rgba(24, 101, 176, 0.40)",
        gold: "0 12px 30px -10px rgba(246, 185, 88, 0.5)",
        // Layered shadows read as real depth, not a flat drop.
        card: "0 1px 2px rgba(19, 41, 75, 0.04), 0 12px 28px -14px rgba(19, 41, 75, 0.20)",
        lift: "0 2px 6px rgba(19, 41, 75, 0.06), 0 22px 48px -20px rgba(19, 41, 75, 0.30)",
        // Deeper float shadow for the interactive showcase mockup
        float3d: "0 30px 60px -24px rgba(19, 41, 75, 0.4), 0 8px 24px -12px rgba(246, 185, 88, 0.28)",
      },
      backgroundImage: {
        "grain":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        // Slow light-sweep used on primary CTAs for a premium sheen.
        shimmer: {
          "0%": { transform: "translateX(-130%)" },
          "60%,100%": { transform: "translateX(130%)" },
        },
        // Hand-drawn underline that draws itself in.
        "draw-underline": {
          "0%": { strokeDashoffset: "220" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease both",
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 2.6s ease-in-out 1s infinite",
        "draw-underline": "draw-underline 0.9s ease 0.5s both",
      },
    },
  },
  plugins: [],
};
