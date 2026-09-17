/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yaduka: {
          umber: '#5F4E4A',
          'umber-dark': '#382C29',
          'umber-light': '#7E6B66',
          rose: '#D6ADAD',
          'rose-light': '#F8EFEB',
          'rose-border': '#E8CECE',
          cream: '#FAF7F2',
          bone: '#F2ECE4'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
