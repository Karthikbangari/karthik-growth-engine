/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette (from the brief)
        sand: "#F4F1E8", // page background
        sand2: "#E8E2D0", // secondary background
        ink: "#111827", // primary text
        slate: "#1F2937", // dark cards
        olive: {
          DEFAULT: "#6B7A3A", // accent
          50: "#F3F5EC",
          100: "#E6EAD6",
          200: "#CFD7AE",
          300: "#B2BE80",
          400: "#94A258",
          500: "#6B7A3A",
          600: "#566230",
          700: "#434C26",
          800: "#33391E",
          900: "#262B17",
        },
        // Champagne gold — premium accent paired with the olive + cream.
        gold: {
          DEFAULT: "#BF9D5E",
          light: "#E8D8B0",
          600: "#A6884B",
          700: "#8A6F3A",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        grotesk: ['"Space Grotesk"', "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(31, 41, 55, 0.18)",
        glass: "0 8px 32px rgba(31, 41, 55, 0.10)",
        olive: "0 12px 30px -10px rgba(107, 122, 58, 0.45)",
        gold: "0 12px 30px -10px rgba(191, 157, 94, 0.45)",
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
