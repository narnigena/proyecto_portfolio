/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "surface-bright": "#37393d",
        "surface-container-highest": "#323538",
        "surface-container": "#1d2023",
        "surface-container-high": "#272a2d",
        "surface-dim": "#111417",
        "background": "#191C1F",
        "surface": "#191C1F",
        "surface-variant": "#323538",

        "primary": "#ffb782",
        "primary-container": "#ea8a3a",

        "secondary": "#ffb59d",
        "secondary-container": "#832701",

        "tertiary": "#ea8a3a",

        "on-surface": "#e1e2e6",
        "on-surface-variant": "#dbc2b2",

        "on-primary": "#4f2500",

        "outline": "#a28c7e",
        "outline-variant": "#554338",
      },

      spacing: {
        "gutter": "24px",
        "max-width": "1440px",
        "margin-desktop": "64px",
        "margin-mobile": "20px",
        "unit": "8px",
      },

      fontFamily: {
        "headline-editorial": ["Libre Caslon Text"],
        "display-lg-mobile": ["Space Grotesk"],
        "body-lg": ["Inter"],
        "headline-md": ["Space Grotesk"],
        "display-lg": ["Space Grotesk"],
        "body-md": ["Inter"],
        "label-caps": ["Space Grotesk"],
      },

      fontSize: {
        "headline-editorial": [
          "42px",
          {
            lineHeight: "1.2",
            fontWeight: "400",
          },
        ],

        "display-lg-mobile": [
          "48px",
          {
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],

        "body-lg": [
          "18px",
          {
            lineHeight: "1.6",
            fontWeight: "400",
          },
        ],

        "headline-md": [
          "32px",
          {
            lineHeight: "1.3",
            fontWeight: "600",
          },
        ],

        "display-lg": [
          "80px",
          {
            lineHeight: "1.1",
            letterSpacing: "-0.04em",
            fontWeight: "700",
          },
        ],

        "body-md": [
          "16px",
          {
            lineHeight: "1.6",
            fontWeight: "400",
          },
        ],

        "label-caps": [
          "12px",
          {
            lineHeight: "1",
            letterSpacing: "0.1em",
            fontWeight: "700",
          },
        ],
      },

      maxWidth: {
        "max-width": "1440px",
      },
    },
  },
    
  
  plugins: [],
};

