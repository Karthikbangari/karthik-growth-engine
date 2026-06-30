/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Theme: "Luxury 3D Digital Showroom" — ivory + deep emerald + champagne gold + navy.
        sand: "#FAF7F0", // page background (ivory)
        sand2: "#FFFDF8", // luxury ivory surface
        ink: "#1F2937", // charcoal text
        slate: "#101828", // midnight navy (dark cards)
        // The `olive` key is kept for compatibility — it now holds the
        // deep-emerald accent scale, so every existing class re-themes at once.
        olive: {
          DEFAULT: "#15564A",
          50: "#EEF6F3",
          100: "#D4EAE2",
          200: "#A9D4C6",
          300: "#74B8A4",
          400: "#429883",
          500: "#1E6F5C",
          600: "#15564A",
          700: "#123C35",
          800: "#0D2C27",
          900: "#091F1B",
        },
        // Champagne gold — the luxury secondary accent.
        gold: {
          DEFAULT: "#D8B76A",
          light: "#EFE0BE",
          600: "#BC9A4E",
          700: "#9A7C3A",
        },
        // Extra showroom accents
        clay: "#C47A4A",
        blush: "#F4D8CE",
        mist: "#DCEAF7",
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        grotesk: ['"Space Grotesk"', "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(31, 41, 55, 0.18)",
        glass: "0 8px 32px rgba(31, 41, 55, 0.10)",
        olive: "0 12px 30px -10px rgba(18, 60, 53, 0.42)",
        gold: "0 12px 30px -10px rgba(216, 183, 106, 0.5)",
        // Layered shadows read as real depth, not a flat drop.
        card: "0 1px 2px rgba(31, 41, 55, 0.04), 0 12px 28px -14px rgba(31, 41, 55, 0.22)",
        lift: "0 2px 6px rgba(31, 41, 55, 0.06), 0 22px 48px -20px rgba(31, 41, 55, 0.32)",
        // Deeper float shadow for the interactive 3D mockup
        float3d: "0 30px 60px -24px rgba(31, 41, 55, 0.4), 0 8px 24px -12px rgba(107,122,58,0.25)",
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
