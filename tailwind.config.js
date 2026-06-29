/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Theme: "Ocean Depths" — calm maritime teal + navy on off-white.
        // NOTE: the `olive` key is kept for backwards-compat with existing
        // class names; it now holds the teal accent scale.
        sand: "#F1FAEE", // page background (off-white)
        sand2: "#DCEFEF", // secondary background (light aqua tint)
        ink: "#1A2332", // primary text (navy)
        slate: "#16222E", // dark cards (deep navy)
        olive: {
          DEFAULT: "#2D8B8B", // accent (teal)
          50: "#ECF7F7",
          100: "#D2ECEC",
          200: "#A8DADC",
          300: "#7BC6C7",
          400: "#4FAEAF",
          500: "#2D8B8B",
          600: "#246F70",
          700: "#1E5859",
          800: "#1A4445",
          900: "#163738",
        },
      },
      fontFamily: {
        // Ocean Depths uses a clean sans for headings
        display: ['"Space Grotesk"', "sans-serif"],
        grotesk: ['"Space Grotesk"', "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(31, 41, 55, 0.18)",
        glass: "0 8px 32px rgba(31, 41, 55, 0.10)",
        olive: "0 12px 30px -10px rgba(45, 139, 139, 0.42)",
        // Layered shadows read as real depth, not a flat drop.
        card: "0 1px 2px rgba(31, 41, 55, 0.04), 0 12px 28px -14px rgba(31, 41, 55, 0.22)",
        lift: "0 2px 6px rgba(31, 41, 55, 0.06), 0 22px 48px -20px rgba(31, 41, 55, 0.32)",
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
