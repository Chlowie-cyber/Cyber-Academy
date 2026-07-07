/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00E5FF',
          green: '#00FF94',
          pink: '#FF00E5',
          yellow: '#FFE600',
          red: '#FF3B3B',
        },
        slate: {
          950: '#020617',
          900: '#0a0f1e',
          850: '#0d1424',
          800: '#111a2e',
          700: '#1e293b',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 4px #00E5FF, 0 0 8px #00E5FF' },
          '100%': { textShadow: '0 0 8px #00E5FF, 0 0 16px #00E5FF, 0 0 24px #00E5FF' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
