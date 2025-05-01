import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({

  server:{
    host: '0.0.0.0',
    port:5175
  },
  plugins: [
    react(),
    tailwindcss({
      config: {
        content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Scans your files
        theme: {
          extend: {
            translate: {
              101: "101%",
            },
            keyframes: {
              marquee: {
                from: { transform: "translateX(0%)" },
                to: { transform: "translateX(-50%)" },
              },
            },
            animation: {
              marquee: "marquee 15s linear infinite",
            },
          },
        },
        plugins: [],
      },
    }),
  ],
});
