import { Config } from 'tailwindcss'
import tailwindcss_animate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        brand: {
          DEFAULT: 'hsl(195, 100%, 45%)', // 500
          '50': 'hsl(199, 100%, 97%)',
          '100': 'hsl(200, 100%, 94%)',
          '200': 'hsl(196, 100%, 86%)',
          '300': 'hsl(194, 100%, 73%)',
          '400': 'hsl(194, 100%, 59%)',
          '500': 'hsl(195, 100%, 45%)',
          '600': 'hsl(198, 100%, 42%)',
          '700': 'hsl(198, 100%, 34%)',
          '800': 'hsl(197, 100%, 28%)',
          '900': 'hsl(198, 90%, 24%)',
          '950': 'hsl(200, 90%, 16%)',
          foreground: {
            DEFAULT: 'hsl(0, 0%, 100%)',
          },
          background: {
            DEFAULT: 'hsl(210, 10%, 35%)', // 600
            '50': 'hsl(220, 16%, 96%)',
            '100': 'hsl(204, 10%, 90%)',
            '200': 'hsl(207, 10%, 82%)',
            '300': 'hsl(206, 10%, 69%)',
            '400': 'hsl(207, 9%, 53%)',
            '500': 'hsl(207, 11%, 43%)',
            '600': 'hsl(210, 10%, 35%)',
            '700': 'hsl(210, 9%, 31%)',
            '800': 'hsl(210, 7%, 27%)',
            '900': 'hsl(220, 7%, 24%)',
            '950': 'hsl(220, 8%, 15%)',
          },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindcss_animate],
} satisfies Config
