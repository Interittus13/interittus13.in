import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.css',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Overpass', 'sans-serif'],
        serif: ['"Old Standard TT"', 'serif'],
        mono: ['"Overpass Mono"', 'monospace'],
      },
      screens: {
        xs: '350px',
        sm: '450px',
        md: '734px',
        lg: '1068px',
      },
      scale: {
        flip: '-1',
      },
      boxShadow: {
        '2xl-middle': '0 0 20px -5px rgba(24, 23, 23, 1)',
        'lg-middle': '0 0 20px -3px rgb(0 0 0 / 0.1)',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0)' },
          '25%': { transform: 'rotate(-12deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '75%': { transform: 'rotate(12deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scrollSm: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(calc(-44px * 10))' },
        },
        scrollMd: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(calc(-78px * 10))' },
        },
        scrollLg: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(calc(-110px * 10))' },
        },
      },
      animation: {
        wave: 'wave 1s ease-out 3',
        'scroll-sm': 'scrollSm 200s linear infinite',
        'scroll-md': 'scrollMd 200s linear infinite',
        'scroll-lg': 'scrollLg 200s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      backgroundImage: {
        'underline-pink': 'linear-gradient(#ff375f, #ff375f), linear-gradient(transparent, transparent)',
        'underline-blue': 'linear-gradient(rgb(59, 130, 246), rgb(59, 130, 246)), linear-gradient(transparent, transparent)',
        'underline': 'linear-gradient(CurrentColor, CurrentColor), linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))',
      },
      backgroundSize: {
        'no-underline-size': '0 1px, auto',
        'underline-size': '100% 1px, auto',
      },
    },
  },
  plugins: [],
}
export default config
