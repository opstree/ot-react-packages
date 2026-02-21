import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./src/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "hsl(var(--primary))",
                secondary: "hsl(var(--secondary))",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}

export default config
