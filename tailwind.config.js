module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#18181b',
        surface: '#232329',
        accent: '#3b82f6',
        primary: '#3b82f6',
        text: '#f3f4f6',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  safelist: [
    'bg-background', 'bg-surface', 'bg-accent', 'bg-primary', 'text-text',
    'border-background', 'border-surface', 'border-accent', 'border-primary', 'border-text',
  ],
};