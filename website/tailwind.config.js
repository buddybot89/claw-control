/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // OpenClaw premium coral/red palette
        coral: {
          300: '#FFB4A2',
          400: '#FF9B85',
          500: '#FF8066',
          600: '#FF6B4A',
        },
        crimson: {
          400: '#E85A5A',
          500: '#DC3545',
          600: '#C82333',
          700: '#A71D2A',
          800: '#8B1538',
          900: '#6B0F2B',
        },
        space: {
          900: '#0A0A0F',
          950: '#050508',
        }
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to bottom, #0A0A0F 0%, #1A0A14 50%, #0A0A0F 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}
