// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/contexts/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          primary: 'var(--primary)',
          'primary-hover': 'var(--primary-hover)',
          secondary: 'var(--secondary)',
          accent: 'var(--accent)',
          card: 'var(--card)',
          border: 'var(--border)',
        },
      },
    },
    plugins: [],
  }
  